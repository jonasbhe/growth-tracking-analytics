import React from 'react';

import getColor from '../../formulas/getColor';
import TimelineChart from './TimelineChart.jsx';
import DistributionChart from './DistributionChart.jsx';

const TotalRow = ({ label, total, max }) => (
  <div
    style={{
      display: 'flex',
      borderTop: '1px solid #f3f3f3'
    }}
  >
    <div style={{ flex: '1', paddingLeft: 10, paddingRight: 10 }}>{label}</div>
    <div style={{ flex: '1', paddingLeft: 10, paddingRight: 10 }}>{total}</div>
    <div style={{ flex: '1', paddingLeft: 10, paddingRight: 10 }}>
      {Math.round(total / max * 1000) / 10}%
    </div>
  </div>
);

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
          </div>
          <div style={{ flex: 'auto' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  flex: '1',
                  fontSize: '1.5rem',
                  color: '#777777'
                }}
              >
                SD-range
              </div>
              <div
                style={{
                  flex: '1',
                  fontSize: '1.5rem',
                  color: '#777777'
                }}
              >
                Total
              </div>
              <div
                style={{
                  flex: '1',
                  fontSize: '1.5rem',
                  color: '#777777'
                }}
              >
                Percentage
              </div>
            </div>
            <TotalRow label="- to -3" total={totals.SD3neg} max={max} />
            <TotalRow label="-3 to -2" total={totals.SD2neg} max={max} />
            <TotalRow label="-2 to -1" total={totals.SD1neg} max={max} />
            <TotalRow label="-1 to 1" total={totals.SD0} max={max} />
            <TotalRow label="1 to 2" total={totals.SD1} max={max} />
            <TotalRow label="2 to 3" total={totals.SD2} max={max} />
            <TotalRow label="3 to -" total={totals.SD3} max={max} />
          </div>
          <div
            style={{
              flex: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
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
                  width: 125,
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
                  width: 125,
                  margin: 5
                }}
                onClick={this.toggleTimeline}
              >
                {showTimeline ? 'Hide timeline' : 'Show timeline'}
              </button>
            </div>
          </div>
        </div>
        {showDistribution && (
          <DistributionChart label={label} distribution={distribution} />
        )}
        {showTimeline && <TimelineChart label={label} timeline={timeline} />}

        <hr style={{ border: '1px solid #f3f3f3' }} />
      </div>
    );
  }
}

export default Result;
