import React from 'react';

import getColor from '../../formulas/getColor';
import TimelineChart from './TimelineChart.jsx';
import DistributionChart from './DistributionChart.jsx';
import TotalRow from './TotalRow.jsx';

class Result extends React.Component {
  state = {
    showDistribution: false,
    showTimeline: false,
    showVisits: null,
    showVisitsLabel: null
  };

  toggleDistribution = () =>
    this.setState(state => ({ showDistribution: !state.showDistribution }));

  toggleTimeline = () =>
    this.setState(state => ({ showTimeline: !state.showTimeline }));

  toggleVisits = (events, label) => {
    if (
      !this.state.showVisits ||
      JSON.stringify(events) !== JSON.stringify(this.state.showVisits)
    ) {
      this.setState({ showVisits: events, showVisitsLabel: label });
    } else {
      this.setState({ showVisits: null, showVisitsLabel: null });
    }
  };

  render() {
    const {
      zscore,
      label,
      distribution,
      averages,
      totals,
      max,
      timeline,
      ouName,
      startDate,
      endDate,
      gender,
      minAge,
      maxAge
    } = this.props;
    const {
      showDistribution,
      showTimeline,
      showVisits,
      showVisitsLabel
    } = this.state;

    return (
      <div>
        <div
          style={{
            fontSize: '2.5rem',
            margin: 10,
            color: '#777777',
            textAlign: 'center'
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            marginBottom: 10,
            marginLeft: 30,
            marginRight: 30,
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              flex: 'auto',
              fontSize: '1.8rem',
              color: '#777777',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            Average z-score
            <div>
              <div
                // Circle style
                style={{
                  borderRadius: '100%',
                  width: 80,
                  height: 80,
                  border: `6px solid ${getColor(zscore)}`,
                  margin: 'auto'
                }}
              >
                <div
                  // Z-score text style
                  style={{
                    color: getColor(zscore),
                    paddingTop: 15,
                    fontWeight: 'bold',
                    fontSize: '2.7rem',
                    marginTop: 2
                  }}
                >
                  {zscore}
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 'auto',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{
                    height: 42,
                    background: 'unset',
                    cursor: 'pointer',
                    backgroundColor: '#296596',
                    color: 'white',
                    fontSize: '1.1rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    border: 'none',
                    width: 110,
                    margin: 5
                  }}
                  onClick={this.toggleDistribution}
                >
                  {showDistribution ? 'Hide distribution' : 'Show distribution'}
                </button>
              </div>
              <div>
                <button
                  style={{
                    height: 42,
                    background: 'unset',
                    cursor: 'pointer',
                    backgroundColor: '#296596',
                    color: 'white',
                    fontSize: '1.1rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    border: 'none',
                    width: 110,
                    margin: 5
                  }}
                  onClick={this.toggleTimeline}
                >
                  {showTimeline ? 'Hide timeline' : 'Show timeline'}
                </button>
              </div>
            </div>
          </div>
          <div style={{ flex: 'auto' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  flex: '1',
                  fontSize: '1.5rem',
                  color: '#777777',
                  textAlign: 'left',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                SD-range
              </div>
              <div
                style={{
                  flex: '1',
                  fontSize: '1.5rem',
                  color: '#777777',
                  textAlign: 'right',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                Total
              </div>
              <div
                style={{
                  flex: '1',
                  fontSize: '1.5rem',
                  color: '#777777',
                  textAlign: 'right',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                Percentage
              </div>

              <i
                style={{ flex: '0', visibility: 'hidden' }}
                className="fa fa-list"
                aria-hidden="true"
              />
            </div>
            <TotalRow
              index={1}
              label="- to -3"
              total={totals.SD3neg}
              max={max}
              toggleVisits={this.toggleVisits}
            />
            <TotalRow
              index={2}
              label="-3 to -2"
              total={totals.SD2neg}
              max={max}
              toggleVisits={this.toggleVisits}
            />
            <TotalRow
              index={3}
              label="-2 to -1"
              total={totals.SD1neg}
              max={max}
              toggleVisits={this.toggleVisits}
            />
            <TotalRow
              index={4}
              label="-1 to 1"
              total={totals.SD0}
              max={max}
              toggleVisits={this.toggleVisits}
            />
            <TotalRow
              index={5}
              label="1 to 2"
              total={totals.SD1}
              max={max}
              toggleVisits={this.toggleVisits}
            />
            <TotalRow
              index={6}
              label="2 to 3"
              total={totals.SD2}
              max={max}
              toggleVisits={this.toggleVisits}
            />
            <TotalRow
              index={7}
              label="3 to -"
              total={totals.SD3}
              max={max}
              toggleVisits={this.toggleVisits}
            />
          </div>
        </div>
        {showVisits && (
          <div>
            <div
              style={{
                fontSize: '1.8rem',
                margin: 10,
                color: '#777777',
                textAlign: 'center'
              }}
            >
              Showing event IDs in SD range {showVisitsLabel} ({
                Object.values(showVisits).length
              }){' '}
              <button
                style={{
                  height: 42,
                  background: 'unset',
                  cursor: 'pointer',
                  backgroundColor: '#296596',
                  color: 'white',
                  fontSize: '1.1rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  border: 'none'
                }}
                onClick={() => this.toggleVisits(null, null)}
              >
                Hide
              </button>
            </div>
            <div
              style={{
                maxHeight: 286,
                overflow: 'auto',
                borderTop: '1px solid #f3f3f3',
                borderBottom: '1px solid #f3f3f3',
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              {Object.keys(showVisits).map(id => (
                <div key={id}>{id}&nbsp;</div>
              ))}
            </div>
          </div>
        )}
        {showDistribution && (
          <DistributionChart
            label={label}
            distribution={distribution}
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
          />
        )}
        {showTimeline && (
          <TimelineChart
            label={label}
            timeline={timeline}
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
          />
        )}

        <hr style={{ border: '1px solid #f3f3f3' }} />
      </div>
    );
  }
}

export default Result;
