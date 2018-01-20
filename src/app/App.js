import React from "react";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import HeaderBarComponent from "d2-ui/lib/app-header/HeaderBar";
import headerBarStore$ from "d2-ui/lib/app-header/headerBar.store";
import withStateFrom from "d2-ui/lib/component-helpers/withStateFrom";

import OrgUnitTree from "d2-ui/lib/org-unit-tree/OrgUnitTree.component";

import injectTapEventPlugin from "react-tap-event-plugin";
const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {
  getWeightForLength,
  getWeightForAge,
  getLengthForAge,
  getBMIForAge,
  getMUACForAge
} from "../formulas/zFormulas";

class App extends React.Component {
  state = {
    rootUnit: null,
    trackedEntityInstances: null,
    events: null
  };

  componentWillMount() {
    this.props.d2.models.organisationUnits
      .list({
        paging: false,
        level: 1,
        fields: "id,path,displayName,children::isNotEmpty"
      })
      .then(rootLevel => rootLevel.toArray()[0])
      .then(rootUnit => {
        this.setState({ rootUnit });
      });
  }

  onSelectClick = (event, ou) => {
    const orgUnitId = ou.id;

    const events =
      orgUnitId &&
      this.props.d2.Api.getApi()
        .get(
          `events.json?orgUnit=tO9CpvxsTx1&program=U1xZvvCVWIM&skipPaging=true` //replace hard-coded OU with ${orgUnitId}
        )
        .then(result => result.events.filter(event => event.completedDate));

    const trackedEntityInstances =
      orgUnitId &&
      this.props.d2.Api.getApi()
        .get(
          `trackedEntityInstances.json?ou=tO9CpvxsTx1&program=U1xZvvCVWIM&skipPaging=true` //replace hard-coded OU with ${orgUnitId}
        )
        .then(result => {
          return result.trackedEntityInstances.reduce((acc, value) => {
            const firstname = value.attributes.find(
              attr => attr.attribute === "kim8r9m1oGE"
            );
            const lastname = value.attributes.find(
              attr => attr.attribute === "blDEf5Ld0fA"
            );
            const gender = value.attributes.find(
              attr => attr.attribute === "uMSSNRDVcXS"
            );
            const birthdate = value.attributes.find(
              attr => attr.attribute === "yj8BaYdkTA6"
            );

            acc[value.trackedEntityInstance] = {
              firstname: firstname ? firstname.value : null,
              lastname: lastname ? lastname.value : null,
              gender: gender ? gender.value : null,
              birthdate: birthdate ? birthdate.value : null
            };
            return acc;
          }, {});
        });

    // Show loading indicator here

    Promise.all([events, trackedEntityInstances]).then(result => {
      const events = result[0];
      const trackedEntityInstances = result[1];

      // Value to track the number of skipped events
      let skippedEvents = 0;

      const mappedEvents = events
        .sort((a, b) => a.eventDate > b.eventDate)
        .reduce((acc, event, index) => {
          const patient = trackedEntityInstances[event.trackedEntityInstance];

          if (!patient) {
            skippedEvents += 1;
            return acc;
          }

          const eventDate = new Date(event.eventDate);

          // Get a more accurate age by calculating age based on birth date and event date
          const ageInDays = Math.floor(
            (Date.parse(eventDate) - Date.parse(patient.birthdate)) / 86400000
          );

          const muacRaw = event.dataValues.find(
            val => val.dataElement === "ySphlmZ7fKG"
          );
          const weightRaw = event.dataValues.find(
            val => val.dataElement === "KHyKhpRfVRS"
          );
          const heightRaw = event.dataValues.find(
            val => val.dataElement === "VCYJkaP96KZ"
          );

          const muac = muacRaw && Number(muacRaw.value);
          const weight = weightRaw && Number(weightRaw.value);
          const height = heightRaw && Number(heightRaw.value);

          // If the event is missing muac, weight, or height, filter it.
          if (!muac || !height || !weight) {
            skippedEvents += 1;
            return acc;
          }

          const bmi = weight / (height / 100) ** 2;

          const rawWfl = getWeightForLength(patient.gender, weight, height);
          const rawWfa = getWeightForAge(patient.gender, weight, ageInDays);
          const rawLhfa = getLengthForAge(patient.gender, height, ageInDays);
          const rawBfa = getBMIForAge(patient.gender, bmi, ageInDays);
          const rawAcfa = getMUACForAge(patient.gender, muac, ageInDays);

          // If the event does not have valid WFL, WFA or LHFA data, filter it.
          if (!rawWfl || !rawWfa || !rawLhfa) {
            skippedEvents += 1;
            return acc;
          }

          return [
            ...acc,
            {
              index,
              eventDate,
              ageInDays,
              muac,
              weight,
              height,
              bmi,
              wfl: Math.round(rawWfl * 100) / 100,
              wfa: Math.round(rawWfa * 100) / 100,
              lhfa: Math.round(rawLhfa * 100) / 100,
              bfa: rawBfa === null ? null : Math.round(rawBfa * 100) / 100,
              acfa: rawAcfa === null ? null : Math.round(rawAcfa * 100) / 100,
              completedBy: event.completedBy
            }
          ];
        });

      console.log(
        "Skipped events (missing data values or unable to calculate z-scores):",
        skippedEvents
      );

      this.setState({
        events: mappedEvents,
        trackedEntityInstances: result[1]
      });
    });
  };

  getChildContext() {
    return {
      d2: this.props.d2
    };
  }

  render() {
    const { d2 } = this.props;
    const { rootUnit, ou, events, trackedEntityInstances } = this.state;

    if (!rootUnit) return null;

    console.log(events);
    console.log(trackedEntityInstances);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={{ marginTop: "4rem" }}>
          <HeaderBar />
          <OrgUnitTree
            root={rootUnit}
            hideCheckboxes={true}
            onSelectClick={this.onSelectClick}
          />
          Events: {events && Object.values(events).length}
          Tracked entity instances:{" "}
          {trackedEntityInstances &&
            Object.values(trackedEntityInstances).length}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  d2: React.PropTypes.object
};

export default App;
