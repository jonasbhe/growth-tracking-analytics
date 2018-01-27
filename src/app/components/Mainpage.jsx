import React from 'react';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';

import Datepicker from './Datepicker.jsx';
import Results from './Results.jsx';
import Filter from './Filter.jsx';

import {
  getWeightForLength,
  getWeightForAge,
  getLengthForAge,
  getBMIForAge,
  getMUACForAge
} from '../../formulas/zFormulas';

class Mainpage extends React.Component {
  state = {
    gender: 'both',
    filterSd: 5,
    minAge: 0,
    maxAge: 24
  };

  updateFilter = filter => this.setState({ ...filter });

  addVisitToTotals = (value, totals, event) => ({
    SD3neg:
      value <= -3
        ? {
            sum: totals.SD3neg.sum + 1,
            events: { ...totals.SD3neg.events, [event.id]: event }
          }
        : totals.SD3neg,
    SD2neg:
      value > -3 && value <= -2
        ? {
            sum: totals.SD2neg.sum + 1,
            events: { ...totals.SD2neg.events, [event.id]: event }
          }
        : totals.SD2neg,
    SD1neg:
      value > -2 && value <= -1
        ? {
            sum: totals.SD1neg.sum + 1,
            events: { ...totals.SD1neg.events, [event.id]: event }
          }
        : totals.SD1neg,
    SD0:
      value > -1 && value < 1
        ? {
            sum: totals.SD0.sum + 1,
            events: { ...totals.SD0.events, [event.id]: event }
          }
        : totals.SD0,
    SD1:
      value >= 1 && value < 2
        ? {
            sum: totals.SD1.sum + 1,
            events: { ...totals.SD1.events, [event.id]: event }
          }
        : totals.SD1,
    SD2:
      value >= 2 && value < 3
        ? {
            sum: totals.SD2.sum + 1,
            events: { ...totals.SD2.events, [event.id]: event }
          }
        : totals.SD2,
    SD3:
      value >= 3
        ? {
            sum: totals.SD3.sum + 1,
            events: { ...totals.SD3.events, [event.id]: event }
          }
        : totals.SD3
  });

  skipEvent = (event, sortOrder, msg) => ({
    id: event.event,
    event,
    sortOrder,
    reason: msg
  });

  mapEvents = trackedEntityInstances => {
    const { events, startDate, endDate } = this.props;
    const { gender, filterSd, minAge, maxAge } = this.state;

    if (
      !trackedEntityInstances ||
      !events ||
      Object.values(events).length === 0
    )
      return {};

    return events.sort((a, b) => a.eventDate > b.eventDate).reduce(
      (acc, event, index) => {
        const patient = trackedEntityInstances[event.trackedEntityInstance];

        // If patient does not exist, filter it.
        if (!patient) {
          acc.skipped[event.event] = this.skipEvent(
            event,
            0,
            'Patient data is missing'
          );
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

        // If patient is older than the given filter ages, filter it.
        if (ageInDays / 30.25 < minAge || ageInDays / 30.25 > maxAge) {
          acc.skipped[event.event] = this.skipEvent(
            event,
            1,
            `Patient data is outside of specified age range. (${Math.round(
              ageInDays / 30.25 * 100
            ) / 100} months)`
          );
          return acc;
        }

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
          acc.skipped[event.event] = this.skipEvent(
            event,
            2,
            'The event is missing muac, height, or weight.'
          );
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
          acc.skipped[event.event] = this.skipEvent(
            event,
            3,
            'The event does not have valid data to calculate WFL, WFA, or LHFA with.'
          );
          return acc;
        }

        // If the event has values that exceed X SD, it might be bad data, filter it.
        if (filterSd && filterSd !== '') {
          if (
            Math.abs(rawWfl) > filterSd ||
            Math.abs(rawWfa) > filterSd ||
            Math.abs(rawLhfa) > filterSd ||
            Math.abs(rawBfa) > filterSd ||
            Math.abs(rawAcfa) > filterSd
          ) {
            acc.skipped[event.event] = this.skipEvent(
              event,
              4,
              `The event has an indicator outside of the given SD max range (${filterSd})`
            );
            return acc;
          }
        }

        const mappedEvent = {
          index,
          id: event.event,
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

        acc.events[event.event] = mappedEvent;

        const visitWfl = mappedEvent.wfl;
        const visitWfa = mappedEvent.wfa;
        const visitLhfa = mappedEvent.lhfa;
        const visitBfa = mappedEvent.bfa;
        const visitAcfa = mappedEvent.acfa;

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
          wfl: this.addVisitToTotals(visitWfl, acc.totals.wfl, mappedEvent),
          wfa: this.addVisitToTotals(visitWfa, acc.totals.wfa, mappedEvent),
          lhfa: this.addVisitToTotals(visitLhfa, acc.totals.lhfa, mappedEvent),
          bfa: this.addVisitToTotals(visitBfa, acc.totals.bfa, mappedEvent),
          acfa: this.addVisitToTotals(visitAcfa, acc.totals.acfa, mappedEvent)
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
          wfl: {
            SD3neg: {
              sum: 0,
              events: {}
            },
            SD2neg: {
              sum: 0,
              events: {}
            },
            SD1neg: {
              sum: 0,
              events: {}
            },
            SD0: {
              sum: 0,
              events: {}
            },
            SD1: {
              sum: 0,
              events: {}
            },
            SD2: {
              sum: 0,
              events: {}
            },
            SD3: {
              sum: 0,
              events: {}
            }
          },
          wfa: {
            SD3neg: {
              sum: 0,
              events: {}
            },
            SD2neg: {
              sum: 0,
              events: {}
            },
            SD1neg: {
              sum: 0,
              events: {}
            },
            SD0: {
              sum: 0,
              events: {}
            },
            SD1: {
              sum: 0,
              events: {}
            },
            SD2: {
              sum: 0,
              events: {}
            },
            SD3: {
              sum: 0,
              events: {}
            }
          },
          lhfa: {
            SD3neg: {
              sum: 0,
              events: {}
            },
            SD2neg: {
              sum: 0,
              events: {}
            },
            SD1neg: {
              sum: 0,
              events: {}
            },
            SD0: {
              sum: 0,
              events: {}
            },
            SD1: {
              sum: 0,
              events: {}
            },
            SD2: {
              sum: 0,
              events: {}
            },
            SD3: {
              sum: 0,
              events: {}
            }
          },
          bfa: {
            SD3neg: {
              sum: 0,
              events: {}
            },
            SD2neg: {
              sum: 0,
              events: {}
            },
            SD1neg: {
              sum: 0,
              events: {}
            },
            SD0: {
              sum: 0,
              events: {}
            },
            SD1: {
              sum: 0,
              events: {}
            },
            SD2: {
              sum: 0,
              events: {}
            },
            SD3: {
              sum: 0,
              events: {}
            }
          },
          acfa: {
            SD3neg: {
              sum: 0,
              events: {}
            },
            SD2neg: {
              sum: 0,
              events: {}
            },
            SD1neg: {
              sum: 0,
              events: {}
            },
            SD0: {
              sum: 0,
              events: {}
            },
            SD1: {
              sum: 0,
              events: {}
            },
            SD2: {
              sum: 0,
              events: {}
            },
            SD3: {
              sum: 0,
              events: {}
            }
          }
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
      getEvents,
      loading
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
          width: '100%',
          overflow: 'auto'
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
              backgroundColor:
                !ouName || ouLevel < 4 || loading ? '#9c9c9c' : '#296596',
              color: 'white',
              fontSize: '1.1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              border: 'none'
            }}
            disabled={!ouName || ouLevel < 4 || loading}
            onClick={getEvents}
          >
            Get events
          </button>
        </div>

        <hr style={{ border: '1px solid #f3f3f3' }} />

        {loading && (
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
        )}

        {!loading &&
          Object.values(eventData).length > 0 && (
            <div>
              <Filter updateFilter={this.updateFilter} />

              <hr style={{ border: '1px solid #f3f3f3' }} />

              <Results
                events={events}
                averages={averages}
                distribution={distribution}
                totals={totals}
                timeline={timeline}
                skipped={skipped}
                ouName={ouName}
              />
            </div>
          )}

        {!loading &&
          Object.values(eventData).length === 0 && <div>No events found.</div>}
      </div>
    );
  }
}

export default Mainpage;
