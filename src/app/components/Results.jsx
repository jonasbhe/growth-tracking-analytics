import React from 'react';
import Result from './Result.jsx';

class Results extends React.Component {
  state = {
    showSkipped: false
  };

  toggleShowSkipped = () =>
    this.setState(state => ({ showSkipped: !state.showSkipped }));

  render() {
    const {
      averages,
      events,
      distribution,
      totals,
      timeline,
      skipped
    } = this.props;
    const { showSkipped } = this.state;

    if (Object.values(averages).length === 0) return null;

    console.log(skipped);

    return (
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            margin: 10,
            color: '#777777'
          }}
        >
          Showing results for {Object.values(events).length} events
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#777777'
            }}
          >
            Skipped {Object.values(skipped).length} events.
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              flex: '0',
              height: 22,
              background: 'unset',
              cursor: 'pointer',
              backgroundColor: '#296596',
              color: 'white',
              fontSize: '0.7rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              border: 'none'
            }}
            onClick={this.toggleShowSkipped}
          >
            {showSkipped ? 'Hide skipped' : 'Show skipped'}
          </button>
        </div>

        {showSkipped && (
          <div
            style={{
              maxHeight: 286,
              overflow: 'auto',
              borderStyle: 'solid',
              borderLeft: 'none',
              borderRight: 'none',
              borderWidth: 1
            }}
          >
            <table
              style={{
                width: '100%'
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      fontSize: '1.5rem',
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                  >
                    Event ID
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      fontSize: '1.5rem',
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                  >
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(skipped)
                  .sort((a, b) => a.sortOrder < b.sortOrder)
                  .map(event => (
                    <tr>
                      <td
                        style={{
                          width: '1%',
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                      >
                        {event.id}
                      </td>
                      <td
                        style={{
                          width: 'auto',
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                      >
                        {event.reason}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column'
          }}
        >
          <Result
            label="Weight-for-age"
            zscore={
              Math.round(averages.wfa / Object.values(events).length * 100) /
              100
            }
            distribution={distribution.wfa}
            averages={averages.wfa}
            totals={totals.wfa}
            max={Object.values(events).length}
            timeline={timeline.weekly.wfa}
          />

          <Result
            label="Weight-for-length"
            zscore={
              Math.round(averages.wfl / Object.values(events).length * 100) /
              100
            }
            distribution={distribution.wfl}
            averages={averages.wfl}
            totals={totals.wfl}
            max={Object.values(events).length}
            timeline={timeline.weekly.wfl}
          />
          <Result
            label="Length-for-age"
            zscore={
              Math.round(averages.lhfa / Object.values(events).length * 100) /
              100
            }
            distribution={distribution.lhfa}
            averages={averages.lhfa}
            totals={totals.lhfa}
            max={Object.values(events).length}
            timeline={timeline.weekly.lhfa}
          />
          <Result
            label="BMI-for-age"
            zscore={
              Math.round(averages.bfa / Object.values(events).length * 100) /
              100
            }
            distribution={distribution.bfa}
            averages={averages.bfa}
            totals={totals.bfa}
            max={Object.values(events).length}
            timeline={timeline.weekly.bfa}
          />
          <Result
            label="MUAC-for-age"
            zscore={
              Math.round(averages.acfa / Object.values(events).length * 100) /
              100
            }
            distribution={distribution.acfa}
            averages={averages.acfa}
            totals={totals.acfa}
            max={Object.values(events).length}
            timeline={timeline.weekly.acfa}
          />
        </div>
      </div>
    );
  }
}

export default Results;
