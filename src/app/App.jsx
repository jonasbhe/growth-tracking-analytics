import React from 'react';
import PropTypes from 'prop-types';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';

import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

import Sidebar from './components/Sidebar.jsx';
import ResultSection from './components/ResultSection.jsx';
import SearchSection from './components/SearchSection.jsx';
import Filter from './components/Filter.jsx';

import { program } from './../constants.js';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
  state = {
    ou: [],
    ouPath: [],
    ouName: null,
    ouLevel: null,
    root: null,
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endDate: new Date(),
    loading: false,
    result: null,
    compareResult: null
  };

  getChildContext() {
    return {
      d2: this.props.d2
    };
  }

  componentWillMount() {
    this.props.d2.currentUser.getDataViewOrganisationUnits().then(root => {
      this.setState({
        root: root.valuesContainerMap.entries().next().value[1]
      });
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
          `events.json?orgUnit=${ou}&program=${program}&ouMode=DESCENDANTS&startDate=${start}&endDate=${end}&skipPaging=true&skipMeta=true`
        )
        .then(result => result.events.filter(event => event.completedDate));

    const trackedEntityInstances =
      ou &&
      this.props.d2.Api.getApi()
        .get(
          `trackedEntityInstances.json?ou=${ou}&ouMode=DESCENDANTS&program=${program}&skipPaging=true&skipMeta=true`
        )
        .then(result => result.trackedEntityInstances);

    Promise.all([events, trackedEntityInstances]).then(result => {
      // Disable loading indicator here
      this.setState({
        result: {
          events: result[0],
          trackedEntityInstances: result[1],
          ouName: this.state.ouName,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          filter: {
            gender: 'both',
            filterSd: 5,
            minAge: 0,
            maxAge: 24
          }
        },
        loading: false
      });
    });
  };

  setStartDate = startDate => this.setState({ startDate: startDate[0] });

  setEndDate = endDate => this.setState({ endDate: endDate[0] });

  updateFilter = filter =>
    this.setState(state => ({ result: { ...state.result, filter } }));

  updateCompareFilter = filter =>
    this.setState(state => ({
      compareResult: { ...state.compareResult, filter }
    }));

  toggleCompare = () =>
    this.setState({ result: null, compareResult: this.state.result });

  clearCompare = () => this.setState({ compareResult: null });

  render() {
    const {
      root,
      ouPath,
      ouName,
      ouLevel,
      startDate,
      endDate,
      result,
      loading,
      compareResult
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
            <div style={{ flex: '1', display: 'block', overflow: 'auto' }}>
              <SearchSection
                ouName={ouName}
                ouLevel={ouLevel}
                startDate={startDate}
                endDate={endDate}
                setStartDate={this.setStartDate}
                setEndDate={this.setEndDate}
                getEvents={this.getEvents}
                loading={loading}
              />

              <div style={{ display: 'flex' }}>
                <div style={{ flex: '1', width: '100%' }}>
                  {loading ? (
                    <div>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '2rem',
                          color: '#777777'
                        }}
                      >
                        Loading...
                      </div>
                      <LoadingMask
                        style={{
                          left: 'unset',
                          position: 'unset',
                          justifyContent: 'center',
                          textAlign: 'center'
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {result &&
                        result.events.length > 0 && (
                          <div>
                            <Filter updateFilter={this.updateFilter} />

                            <hr style={{ border: '1px solid #f3f3f3' }} />

                            <ResultSection
                              result={result}
                              toggleCompare={this.toggleCompare}
                            />
                          </div>
                        )}

                      {result &&
                        result.events.length === 0 && (
                          <div
                            style={{
                              textAlign: 'center',
                              fontSize: '2rem',
                              margin: 10,
                              padding: 30,
                              color: '#777777'
                            }}
                          >
                            No results found for {result.ouName}
                          </div>
                        )}

                      {!result &&
                        compareResult && (
                          <div
                            style={{
                              textAlign: 'center',
                              fontSize: '2.5rem',
                              margin: 10,
                              color: '#777777'
                            }}
                          >
                            Select an organisation unit to compare with
                          </div>
                        )}
                    </div>
                  )}
                </div>
                {compareResult &&
                  compareResult.events.length > 0 && (
                    <div style={{ flex: '1', width: '100%' }}>
                      <Filter updateFilter={this.updateCompareFilter} />

                      <hr style={{ border: '1px solid #f3f3f3' }} />

                      <ResultSection
                        result={compareResult}
                        clearCompare={this.clearCompare}
                      />
                    </div>
                  )}

                {compareResult &&
                  compareResult.events.length === 0 && (
                    <div
                      style={{
                        flex: '1',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        margin: 10,
                        color: '#777777'
                      }}
                    >
                      No results found for {compareResult.ouName}
                    </div>
                  )}
              </div>
            </div>
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
