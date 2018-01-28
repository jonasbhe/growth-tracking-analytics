import React from 'react';

import Results from './Results.jsx';

import {
  getWeightForLength,
  getWeightForAge,
  getLengthForAge,
  getBMIForAge,
  getMUACForAge
} from '../../formulas/zFormulas';

class ResultSection extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.result.ouName !== nextProps.result.ouName ||
      this.props.result.filter !== nextProps.result.filter ||
      this.props.result.startDate !== nextProps.result.startDate ||
      this.props.result.endDate !== nextProps.result.endDate
    );
  }

  addVisitToTotals = (value, totals, event) => {
    if (value >= 3) {
      return {
        ...totals,
        SD3: {
          sum: totals.SD3.sum + 1,
          events: totals.SD3.events.add(event.id)
        }
      };
    }

    if (value > 2) {
      return {
        ...totals,
        SD2: {
          sum: totals.SD2.sum + 1,
          events: totals.SD2.events.add(event.id)
        }
      };
    }

    if (value > 1) {
      return {
        ...totals,
        SD1: {
          sum: totals.SD1.sum + 1,
          events: totals.SD1.events.add(event.id)
        }
      };
    }

    if (value > -1) {
      return {
        ...totals,
        SD0: {
          sum: totals.SD0.sum + 1,
          events: totals.SD0.events.add(event.id)
        }
      };
    }

    if (value > -2) {
      return {
        ...totals,
        SD1neg: {
          sum: totals.SD1neg.sum + 1,
          events: totals.SD1neg.events.add(event.id)
        }
      };
    }

    if (value > -3) {
      return {
        ...totals,
        SD2neg: {
          sum: totals.SD2neg.sum + 1,
          events: totals.SD2neg.events.add(event.id)
        }
      };
    }

    return {
      ...totals,
      SD3neg: {
        sum: totals.SD3neg.sum + 1,
        events: totals.SD3neg.events.add(event.id)
      }
    };
  };

  skipEvent = (event, sortOrder, msg) => ({
    id: event.event,
    event,
    sortOrder,
    reason: msg
  });

  mapEvents = (trackedEntityInstances, events, startDate, endDate, filter) => {
    const { gender, filterSd, minAge, maxAge } = filter;

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

        const period = Math.floor(
          Math.abs(
            (Date.parse(event.eventDate) -
              Date.parse(
                new Date(startDate.getFullYear(), startDate.getMonth(), 1)
              )) /
              2592000000
          )
        );

        acc.timeline = {
          wfl: {
            ...acc.timeline.wfl,
            [period]: acc.timeline.wfl[period]
              ? [...acc.timeline.wfl[period], visitWfl]
              : [visitWfl]
          },
          wfa: {
            ...acc.timeline.wfa,
            [period]: acc.timeline.wfa[period]
              ? [...acc.timeline.wfa[period], visitWfa]
              : [visitWfa]
          },
          lhfa: {
            ...acc.timeline.lhfa,
            [period]: acc.timeline.lhfa[period]
              ? [...acc.timeline.lhfa[period], visitLhfa]
              : [visitLhfa]
          },
          bfa: {
            ...acc.timeline.bfa,
            [period]: acc.timeline.bfa[period]
              ? [...acc.timeline.bfa[period], visitBfa]
              : [visitBfa]
          },
          acfa: {
            ...acc.timeline.acfa,
            [period]: acc.timeline.acfa[period]
              ? [...acc.timeline.acfa[period], visitAcfa]
              : [visitAcfa]
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
              events: new Set()
            },
            SD2neg: {
              sum: 0,
              events: new Set()
            },
            SD1neg: {
              sum: 0,
              events: new Set()
            },
            SD0: {
              sum: 0,
              events: new Set()
            },
            SD1: {
              sum: 0,
              events: new Set()
            },
            SD2: {
              sum: 0,
              events: new Set()
            },
            SD3: {
              sum: 0,
              events: new Set()
            }
          },
          wfa: {
            SD3neg: {
              sum: 0,
              events: new Set()
            },
            SD2neg: {
              sum: 0,
              events: new Set()
            },
            SD1neg: {
              sum: 0,
              events: new Set()
            },
            SD0: {
              sum: 0,
              events: new Set()
            },
            SD1: {
              sum: 0,
              events: new Set()
            },
            SD2: {
              sum: 0,
              events: new Set()
            },
            SD3: {
              sum: 0,
              events: new Set()
            }
          },
          lhfa: {
            SD3neg: {
              sum: 0,
              events: new Set()
            },
            SD2neg: {
              sum: 0,
              events: new Set()
            },
            SD1neg: {
              sum: 0,
              events: new Set()
            },
            SD0: {
              sum: 0,
              events: new Set()
            },
            SD1: {
              sum: 0,
              events: new Set()
            },
            SD2: {
              sum: 0,
              events: new Set()
            },
            SD3: {
              sum: 0,
              events: new Set()
            }
          },
          bfa: {
            SD3neg: {
              sum: 0,
              events: new Set()
            },
            SD2neg: {
              sum: 0,
              events: new Set()
            },
            SD1neg: {
              sum: 0,
              events: new Set()
            },
            SD0: {
              sum: 0,
              events: new Set()
            },
            SD1: {
              sum: 0,
              events: new Set()
            },
            SD2: {
              sum: 0,
              events: new Set()
            },
            SD3: {
              sum: 0,
              events: new Set()
            }
          },
          acfa: {
            SD3neg: {
              sum: 0,
              events: new Set()
            },
            SD2neg: {
              sum: 0,
              events: new Set()
            },
            SD1neg: {
              sum: 0,
              events: new Set()
            },
            SD0: {
              sum: 0,
              events: new Set()
            },
            SD1: {
              sum: 0,
              events: new Set()
            },
            SD2: {
              sum: 0,
              events: new Set()
            },
            SD3: {
              sum: 0,
              events: new Set()
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
          wfa: 0,
          wfl: 0,
          lhfa: 0,
          bfa: 0,
          acfa: 0
        }
      }
    );
  };

  mapTrackedEntityInstances = trackedEntityInstances => {
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
    const { result, toggleCompare, clearCompare } = this.props;
    const { gender, minAge, maxAge } = result.filter;

    const {
      ouName,
      startDate,
      endDate,
      events,
      filter,
      trackedEntityInstances
    } = result;

    const teiData = this.mapTrackedEntityInstances(trackedEntityInstances);
    const eventData = this.mapEvents(
      teiData,
      events,
      startDate,
      endDate,
      filter
    );

    return (
      <div
        style={{
          width: '100%'
        }}
      >
        <Results
          eventData={eventData}
          ouName={ouName}
          startDate={startDate}
          endDate={endDate}
          gender={gender}
          minAge={minAge}
          maxAge={maxAge}
          toggleCompare={toggleCompare}
          clearCompare={clearCompare}
        />
      </div>
    );
  }
}

export default ResultSection;
