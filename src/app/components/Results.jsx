import React from 'react';
import Result from './Result.jsx';

import getColor from '../../formulas/getColor.js';

class Results extends React.Component {
  render() {
    const { averages, events, distribution, totals, timeline } = this.props;

    if (Object.values(averages).length === 0) return null;

    return (
      <div>
        <div
          style={{
            fontSize: '1.8rem',
            margin: 10,
            color: '#777777'
          }}
        >
          Results for {Object.values(events).length} events:
        </div>

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
