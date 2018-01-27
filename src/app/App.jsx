import React from 'react';
import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

import Sidebar from './components/Sidebar.jsx';
import Mainpage from './components/Mainpage.jsx';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
  state = {
    ou: ['hV87OCHgO4v'],
    ouPath: [
      '/Hjw70Lodtf2/psfB4ksRKp2/DG8h5ijGxgO/sFGfRP4wPqe/oiAbfOiho08/hV87OCHgO4v'
    ],
    ouName: null,
    ouLevel: null,
    root: null,
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endDate: new Date(),
    loading: false
  };

  getChildContext() {
    return {
      d2: this.props.d2
    };
  }

  componentWillMount() {
    this.props.d2.models.organisationUnits
      .list({
        paging: false,
        level: 1,
        fields: 'id,path,displayName,children::isNotEmpty'
      })
      .then(rootLevel => rootLevel.toArray()[0])
      .then(root => {
        this.setState({ root });
      });
  }

  onSelectClick = (event, ou) => {
    this.setState(state => ({
      ouPath: state.ou[0] === ou.path ? [] : [ou.path],
      ou: ou.id,
      ouName: ou.displayName,
      ouLevel: ou.path.split('/').length
    }));
  };

  getEvents = () => {
    const { ou, startDate, endDate } = this.state;

    this.setState({ loading: true });

    const start = startDate.toISOString().substring(0, 10);
    const end = endDate.toISOString().substring(0, 10);

    const events =
      ou &&
      this.props.d2.Api.getApi()
        .get(
          `events.json?orgUnit=${ou}&program=U1xZvvCVWIM&ouMode=DESCENDANTS&startDate=${start}&endDate=${end}&skipPaging=true&skipMeta=true`
        )
        .then(result => result.events.filter(event => event.completedDate));

    const trackedEntityInstances =
      ou &&
      this.props.d2.Api.getApi()
        .get(
          `trackedEntityInstances.json?ou=${ou}&ouMode=DESCENDANTS&program=U1xZvvCVWIM&skipPaging=true&skipMeta=true`
        )
        .then(result => result.trackedEntityInstances);

    Promise.all([events, trackedEntityInstances]).then(result => {
      // Disable loading indicator here
      this.setState({
        events: result[0],
        trackedEntityInstances: result[1],
        loading: false
      });
    });
  };

  setStartDate = startDate => this.setState({ startDate: startDate[0] });

  setEndDate = endDate => this.setState({ endDate: endDate[0] });

  render() {
    const {
      root,
      ouPath,
      ouName,
      ouLevel,
      events,
      trackedEntityInstances,
      startDate,
      endDate,
      loading
    } = this.state;

    if (!root) return null;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div
          style={{
            marginTop: '4rem',
            height: '100%'
          }}
        >
          <HeaderBar />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              alignContent: 'stretch',
              height: '100%'
            }}
          >
            <Sidebar
              root={root}
              onSelectClick={this.onSelectClick}
              ouPath={ouPath}
            />
            <Mainpage
              ouName={ouName}
              ouLevel={ouLevel}
              events={events}
              trackedEntityInstances={trackedEntityInstances}
              startDate={startDate}
              endDate={endDate}
              setStartDate={this.setStartDate}
              setEndDate={this.setEndDate}
              getEvents={this.getEvents}
              loading={loading}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  d2: PropTypes.object
};

export default App;
