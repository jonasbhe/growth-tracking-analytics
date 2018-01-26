import React from 'react';

import getColor from '../../formulas/getColor';
import TimelineChart from './TimelineChart.jsx';
import DistributionChart from './DistributionChart.jsx';


class Result extends React.Component {
  state = {
    showDistribution: false,
    showTimeline: false
  };

  toggleDistribution = () =>
    this.setState(state => ({ showDistribution: !state.showDistribution }));

  toggleTimeline = () =>
    this.setState(state => ({ showTimeline: !state.showTimeline }));

  render() {
    const {
      zscore,
      label,
      distribution,
      averages,
      totals,
      max,
      timeline
    } = this.props;
    const { showDistribution, showTimeline } = this.state;

    return (
      <div>
        <div
          style={{
            fontSize: '1.8rem',
            margin: 10,
            color: '#777777'
          }}
        >
          {label}
        </div>
        <div style={{ display: 'flex', textAlign: 'center' }}>
          <div style={{ flex: 'auto' }}>
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
          </div>
          <div style={{ flex: 'auto' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  flex: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                <div>SD-range</div>
                <div>-3 SD</div>
                <div>-2 SD</div>
                <div>-1 SD</div>
                <div>0 SD</div>
                <div>+1 SD</div>
                <div>+2 SD</div>
                <div>+3 SD</div>
              </div>
              <div
                style={{
                  flex: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'right'
                }}
              >
                <div>Total</div>
                <div>{totals.SD3neg}</div>
                <div>{totals.SD2neg}</div>
                <div>{totals.SD1neg}</div>
                <div>{totals.SD0}</div>
                <div>{totals.SD1}</div>
                <div>{totals.SD2}</div>
                <div>{totals.SD3}</div>
              </div>
              <div
                style={{
                  flex: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'right'
                }}
              >
                <div>Percentage</div>
                <div>{Math.round(totals.SD3neg / max * 1000) / 10}%</div>
                <div>{Math.round(totals.SD2neg / max * 1000) / 10}%</div>
                <div>{Math.round(totals.SD1neg / max * 1000) / 10}%</div>
                <div>{Math.round(totals.SD0 / max * 1000) / 10}%</div>
                <div>{Math.round(totals.SD1 / max * 1000) / 10}%</div>
                <div>{Math.round(totals.SD2 / max * 1000) / 10}%</div>
                <div>{Math.round(totals.SD3 / max * 1000) / 10}%</div>
              </div>
            </div>
          </div>
          <button
            style={{
              flex: 'auto',
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
            onClick={this.toggleDistribution}
          >
            Show distribution
          </button>
          <button
            style={{
              flex: 'auto',
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
            onClick={this.toggleTimeline}
          >
            Show timeline
          </button>
        </div>

        <div
          style={{
            borderBottom: '1px solid #777777'
          }}
        >
          {showDistribution && (
            <DistributionChart label={label} distribution={distribution} />
          )}
          {showTimeline && <TimelineChart label={label} timeline={timeline} />}
        </div>
      </div>
    );
  }
}

export default Result;
