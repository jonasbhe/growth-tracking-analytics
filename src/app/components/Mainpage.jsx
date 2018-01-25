import React from 'react';

import Datepicker from './Datepicker.jsx';
import Results from './Results.jsx';

import {
  getWeightForLength,
  getWeightForAge,
  getLengthForAge,
  getBMIForAge,
  getMUACForAge
} from '../../formulas/zFormulas';

class Mainpage extends React.Component {
  state = {
    gender: 'both'
  };

  setGenderFilter = gender => this.setState({ gender });

  addVisitToTotals = (value, totals) => ({
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
  });

  mapEvents = trackedEntityInstances => {
    const { events, startDate, endDate } = this.props;
    const { gender } = this.state;

    if (!trackedEntityInstances || !events) return {};

    return events.sort((a, b) => a.eventDate > b.eventDate).reduce(
      (acc, event, index) => {
        const patient = trackedEntityInstances[event.trackedEntityInstance];

        // If patient does not exist, filter it.
        if (!patient) {
          acc.skipped[event.event] = event;
          return acc;
        }

        // Filter results based on selected gender
        if (patient.gender === 'Male' && gender === 'female') return acc;
        if (patient.gender === 'Female' && gender === 'male') return acc;

        const eventDate = new Date(event.eventDate);

        // Get a more accurate age by calculating age based on birth date and event date
        const ageInDays = Math.floor(
          (Date.parse(eventDate) - Date.parse(patient.birthdate)) / 86400000
        );

        const muacRaw = event.dataValues.find(
          val => val.dataElement === 'ySphlmZ7fKG'
        );
        const weightRaw = event.dataValues.find(
          val => val.dataElement === 'KHyKhpRfVRS'
        );
        const heightRaw = event.dataValues.find(
          val => val.dataElement === 'VCYJkaP96KZ'
        );

        const muac = muacRaw && Number(muacRaw.value);
        const weight = weightRaw && Number(weightRaw.value);
        const height = heightRaw && Number(heightRaw.value);

        // If the event is missing muac, weight, or height, filter it.
        if (!muac || !height || !weight) {
          acc.skipped[event.event] = event;
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

        // TODO: Change time based on time between selected dates.
        // 12 months = 1 month accumulation
        // 6 months = 1 month accumulation
        // 3 months = 2 week accumulation
        // 1 month = 1 week accumulation
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
  };

  mapTrackedEntityInstances = () => {
    const { trackedEntityInstances } = this.props;

    if (!trackedEntityInstances) return null;

    return trackedEntityInstances.reduce((acc, value) => {
      const firstname = value.attributes.find(
        attr => attr.attribute === 'kim8r9m1oGE'
      );
      const lastname = value.attributes.find(
        attr => attr.attribute === 'blDEf5Ld0fA'
      );
      const gender = value.attributes.find(
        attr => attr.attribute === 'uMSSNRDVcXS'
      );
      const birthdate = value.attributes.find(
        attr => attr.attribute === 'yj8BaYdkTA6'
      );

      acc[value.trackedEntityInstance] = {
        firstname: firstname ? firstname.value : null,
        lastname: lastname ? lastname.value : null,
        gender: gender ? gender.value : null,
        birthdate: birthdate ? birthdate.value : null
      };
      return acc;
    }, {});
  };

  render() {
    const {
      ouName,
      ouLevel,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      getEvents
    } = this.props;

    const trackedEntityInstances = this.mapTrackedEntityInstances();
    const eventData = this.mapEvents(trackedEntityInstances);

    const {
      events,
      averages,
      totals,
      distribution,
      skipped,
      timeline
    } = eventData;

    return (
      <div
        style={{
          width: '100%'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            margin: 10,
            color: '#777777'
          }}
        >
          Growth Tracking Analytics App
        </div>

        <hr style={{ border: '1px solid #f3f3f3' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Datepicker
            label="Start date:"
            date={startDate}
            setDate={setStartDate}
          />

          <Datepicker label="End date:" date={endDate} setDate={setEndDate} />
        </div>

        <div
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            margin: 10,
            color: '#777777'
          }}
        >
          {!ouName
            ? 'Choose an organization unit.'
            : ouLevel < 4 ? 'Choose a lower level organisation unit.' : ouName}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginBottom: 10
          }}
        >
          <button
            style={{
              height: 42,
              background: 'unset',
              cursor: 'pointer',
              backgroundColor: !ouName || ouLevel < 4 ? '#9c9c9c' : '#296596',
              color: 'white',
              fontSize: '1.1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              outline: 'none'
            }}
            disabled={!ouName || ouLevel < 4}
            onClick={getEvents}
          >
            Get events
          </button>
        </div>

        <hr style={{ border: '1px solid #f3f3f3' }} />

        {Object.values(eventData).length > 0 && (
          <div>
            <h3>Filter options:</h3>
            <p>
              <button onClick={() => this.setGenderFilter('female')}>
                Girls
              </button>
              <button onClick={() => this.setGenderFilter('male')}>Boys</button>
              <button onClick={() => this.setGenderFilter('both')}>Both</button>
            </p>
            <p>By age</p>
            <p>Skipped events: {Object.values(skipped).length}</p>
            <hr />
            Tab to switch between results, filterable visit list, etc
            <Results
              events={events}
              averages={averages}
              distribution={distribution}
              totals={totals}
              timeline={timeline}
            />
            List of trackedEntityInstances sortable by different indicator
            severity
          </div>
        )}
      </div>
    );
  }
}

export default Mainpage;
