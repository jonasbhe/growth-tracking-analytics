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

// Application

class App extends React.Component {
  state = {
    rootUnit: null
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
          `events.json?orgUnit=${orgUnitId}&program=U1xZvvCVWIM&skipPaging=true`
        )
        .then(events => {
          const mappedEvents = events.events.map(
            (event, index) =>
              `${index}: ${event.eventDate} - ${event.trackedEntityInstance}\n`
          );
          this.setState({ orgUnitId, events: mappedEvents });
        });
  };

  getChildContext() {
    return {
      d2: this.props.d2
    };
  }

  render() {
    const { d2 } = this.props;
    const { rootUnit, ou, events } = this.state;

    if (!rootUnit) return null;

    console.log(events);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={{ marginTop: "4rem" }}>
          <HeaderBar />
          <OrgUnitTree
            root={rootUnit}
            hideCheckboxes={true}
            onSelectClick={this.onSelectClick}
          />
          {events}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  d2: React.PropTypes.object
};

App.childContextTypes = {
  d2: React.PropTypes.object
};

export default App;
