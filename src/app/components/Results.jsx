import React from 'react';
import Result from './Result.jsx';
import SkippedList from './SkippedList.jsx';

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
      skipped,
      ouName,
      startDate,
      endDate,
      gender,
      minAge,
      maxAge
    } = this.props;
    const { showSkipped } = this.state;

    if (Object.values(averages).length === 0) return null;

    return (
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            color: '#777777'
          }}
        >
          Results for {Object.values(events).length} events from {ouName}
        </div>

        <div
          style={{
            fontSize: '1rem',
            color: '#777777',
            textAlign: 'center',
            marginBottom: 10
          }}
        >
          {`${startDate
            .toISOString()
            .substring(0, 10)} to ${endDate
            .toISOString()
            .substring(0, 10)}, gender: ${gender}, age: ${minAge} to ${maxAge}`}
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

        {showSkipped && <SkippedList skipped={skipped} />}

        <div
          style={{
            display: 'flex',
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
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
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
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
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
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
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
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
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
            ouName={ouName}
            startDate={startDate}
            endDate={endDate}
            gender={gender}
            minAge={minAge}
            maxAge={maxAge}
          />
        </div>
      </div>
    );
  }
}

export default Results;
