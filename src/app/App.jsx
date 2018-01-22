import React from "react";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import HeaderBarComponent from "d2-ui/lib/app-header/HeaderBar";
import headerBarStore$ from "d2-ui/lib/app-header/headerBar.store";
import withStateFrom from "d2-ui/lib/component-helpers/withStateFrom";

import Sidebar from "./components/Sidebar.jsx";
import Mainpage from "./components/Mainpage.jsx";

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
    ou: ["hV87OCHgO4v"],
    ouPath: [
      "/Hjw70Lodtf2/psfB4ksRKp2/DG8h5ijGxgO/sFGfRP4wPqe/oiAbfOiho08/hV87OCHgO4v"
    ],
    ouName: null,
    root: null,
    eventData: {
      events: {},
      averages: {},
      totals: { wfa: 0, wfl: 0, lhfa: 0, bfa: 0, acfa: 0 },
      skipped: {},
      timeline: { weekly: { wfa: 0, wfl: 0, lhfa: 0, bfa: 0, acfa: 0 } }
    },
    trackedEntityInstances: {},
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endDate: new Date()
  };

  componentWillMount() {
    this.props.d2.models.organisationUnits
      .list({
        paging: false,
        level: 1,
        fields: "id,path,displayName,children::isNotEmpty"
      })
      .then(rootLevel => rootLevel.toArray()[0])
      .then(root => {
        this.setState({ root });
      });
  }

  onSelectClick = (event, ou) => {
    console.log(ou.path);
    this.setState(state => ({
      ouPath: state.ou[0] === ou.path ? [] : [ou.path],
      ou: ou.id,
      ouName: ou.displayName
    }));
  };

  addVisitToTotals = (value, totals) => {
    return {
      SD0_1:
        Math.abs(value) >= 0 && Math.abs(value) < 1
          ? totals.SD0_1 + 1
          : totals.SD0_1,
      SD1_2:
        Math.abs(value) >= 1 && Math.abs(value) < 2
          ? totals.SD1_2 + 1
          : totals.SD1_2,
      SD2_3:
        Math.abs(value) >= 2 && Math.abs(value) < 3
          ? totals.SD2_3 + 1
          : totals.SD2_3,
      SD3: Math.abs(value) >= 3 ? totals.SD3 + 1 : totals.SD3
    };
  };

  getEvents = () => {
    const { ou, startDate, endDate } = this.state;

    const start = startDate.toISOString().substring(0, 10);
    const end = endDate.toISOString().substring(0, 10);

    const events =
      ou &&
      this.props.d2.Api.getApi()
        .get(
          `events.json?orgUnit=${ou}&program=U1xZvvCVWIM&startDate=${start}&endDate=${end}&skipPaging=true`
        )
        .then(result => result.events.filter(event => event.completedDate));

    const trackedEntityInstances =
      ou &&
      this.props.d2.Api.getApi()
        .get(
          `trackedEntityInstances.json?ou=${ou}&program=U1xZvvCVWIM&skipPaging=true`
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

      const eventData = events.sort((a, b) => a.eventDate > b.eventDate).reduce(
        (acc, event, index) => {
          const patient = trackedEntityInstances[event.trackedEntityInstance];

          // If patient does not exist, filter it.
          if (!patient) {
            acc.skipped[event.event] = event;
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
            acc.skipped[event.event] = event;
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
            acc.skipped[event.event] = event;
            return acc;
          }

          // If the event has values that exceed 5 SD, it might be bad data, filter it.
          // TODO: Allow the user to filter this themselves. For example a text box that filters anyone above x number
          if (
            Math.abs(rawWfl) > 5 ||
            Math.abs(rawWfa) > 5 ||
            Math.abs(rawLhfa) > 5 ||
            Math.abs(rawBfa) > 5 ||
            Math.abs(rawAcfa) > 5
          ) {
            acc.skipped[event.event] = event;
            return acc;
          }

          acc.events[event.event] = {
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
          };

          const visitWfl = acc.events[event.event].wfl;
          const visitWfa = acc.events[event.event].wfa;
          const visitLhfa = acc.events[event.event].lhfa;
          const visitBfa = acc.events[event.event].bfa;
          const visitAcfa = acc.events[event.event].acfa;

          const day = Math.floor(
            (Date.parse(event.eventDate) - Date.parse(startDate)) / 2592000000
          );

          acc.timeline = {
            weekly: {
              wfl: {
                ...acc.timeline.weekly.wfl,
                [day]: acc.timeline.weekly.wfl[day]
                  ? [...acc.timeline.weekly.wfl[day], visitWfl]
                  : [visitWfl]
              },
              wfa: {
                ...acc.timeline.weekly.wfa,
                [day]: acc.timeline.weekly.wfa[day]
                  ? [...acc.timeline.weekly.wfa[day], visitWfa]
                  : [visitWfa]
              },
              lhfa: {
                ...acc.timeline.weekly.lhfa,
                [day]: acc.timeline.weekly.lhfa[day]
                  ? [...acc.timeline.weekly.lhfa[day], visitLhfa]
                  : [visitLhfa]
              },
              bfa: {
                ...acc.timeline.weekly.bfa,
                [day]: acc.timeline.weekly.bfa[day]
                  ? [...acc.timeline.weekly.bfa[day], visitBfa]
                  : [visitBfa]
              },
              acfa: {
                ...acc.timeline.weekly.acfa,
                [day]: acc.timeline.weekly.acfa[day]
                  ? [...acc.timeline.weekly.acfa[day], visitAcfa]
                  : [visitAcfa]
              }
            }
          };

          acc.averages = {
            wfl: acc.averages.wfl + visitWfl,
            wfa: acc.averages.wfa + visitWfa,
            lhfa: acc.averages.lhfa + visitLhfa,
            bfa: acc.averages.bfa + visitBfa,
            acfa: acc.averages.acfa + visitAcfa
          };

          acc.totals = {
            wfl: this.addVisitToTotals(visitWfl, acc.totals.wfl),
            wfa: this.addVisitToTotals(visitWfa, acc.totals.wfa),
            lhfa: this.addVisitToTotals(visitLhfa, acc.totals.lhfa),
            bfa: this.addVisitToTotals(visitBfa, acc.totals.bfa),
            acfa: this.addVisitToTotals(visitAcfa, acc.totals.acfa)
          };

          const roundedWfl = Math.round(visitWfl * 10) / 10;
          if (acc.distribution.wfl[roundedWfl]) {
            acc.distribution.wfl[roundedWfl] += 1;
          } else {
            acc.distribution.wfl[roundedWfl] = 1;
          }

          const roundedWfa = Math.round(visitWfa * 10) / 10;
          if (acc.distribution.wfa[roundedWfa]) {
            acc.distribution.wfa[roundedWfa] += 1;
          } else {
            acc.distribution.wfa[roundedWfa] = 1;
          }

          const roundedLhfa = Math.round(visitLhfa * 10) / 10;
          if (acc.distribution.lhfa[roundedLhfa]) {
            acc.distribution.lhfa[roundedLhfa] += 1;
          } else {
            acc.distribution.lhfa[roundedLhfa] = 1;
          }

          const roundedBfa = Math.round(visitBfa * 10) / 10;
          if (acc.distribution.bfa[roundedBfa]) {
            acc.distribution.bfa[roundedBfa] += 1;
          } else {
            acc.distribution.bfa[roundedBfa] = 1;
          }

          const roundedAcfa = Math.round(visitAcfa * 10) / 10;
          if (acc.distribution.acfa[roundedAcfa]) {
            acc.distribution.acfa[roundedAcfa] += 1;
          } else {
            acc.distribution.acfa[roundedAcfa] = 1;
          }

          return acc;
        },
        {
          events: {},
          averages: {
            wfl: 0,
            wfa: 0,
            lhfa: 0,
            bfa: 0,
            acfa: 0
          },
          totals: {
            wfl: { SD0_1: 0, SD1_2: 0, SD2_3: 0, SD3: 0 },
            wfa: { SD0_1: 0, SD1_2: 0, SD2_3: 0, SD3: 0 },
            lhfa: { SD0_1: 0, SD1_2: 0, SD2_3: 0, SD3: 0 },
            bfa: { SD0_1: 0, SD1_2: 0, SD2_3: 0, SD3: 0 },
            acfa: { SD0_1: 0, SD1_2: 0, SD2_3: 0, SD3: 0 }
          },
          distribution: {
            wfl: {},
            wfa: {},
            lhfa: {},
            bfa: {},
            acfa: {}
          },
          skipped: {},
          timeline: {
            weekly: { wfa: 0, wfl: 0, lhfa: 0, bfa: 0, acfa: 0 }
          }
        }
      );

      this.setState({
        eventData: eventData,
        trackedEntityInstances: result[1]
      });
    });
  };

  getChildContext() {
    return {
      d2: this.props.d2
    };
  }

  setStartDate = startDate => this.setState({ startDate: startDate[0] });

  setEndDate = endDate => this.setState({ endDate: endDate[0] });

  render() {
    const { d2 } = this.props;
    const {
      root,
      ouPath,
      ou,
      ouName,
      eventData,
      trackedEntityInstances,
      startDate,
      endDate
    } = this.state;

    if (!root) return null;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div
          style={{
            marginTop: "4rem",
            height: "100%"
          }}
        >
          <HeaderBar />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "flex-start",
              alignItems: "stretch",
              alignContent: "stretch",
              height: "100%"
            }}
          >
            <Sidebar
              root={root}
              onSelectClick={this.onSelectClick}
              ouPath={ouPath}
            />
            <Mainpage
              ouName={ouName}
              eventData={eventData}
              trackedEntityInstances={trackedEntityInstances}
              startDate={startDate}
              endDate={endDate}
              setStartDate={this.setStartDate}
              setEndDate={this.setEndDate}
              getEvents={this.getEvents}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  d2: React.PropTypes.object
};

export default App;
