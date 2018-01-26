import React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';

import getColor from '../../formulas/getColor';

HighchartsExporting(ReactHighcharts.Highcharts);

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

    const distributionData = Object.entries(distribution)
      .sort((a, b) => a[0] - b[0])
      .map(d => [Number(d[0]), d[1]]);

    const distributionMin =
      Math.abs(distributionData[0][0]) >
      distributionData[distributionData.length - 1][0]
        ? distributionData[0][0]
        : distributionData[distributionData.length - 1][0] * -1;

    const timelineData = Object.entries(timeline).map(val => [
      Number(val[0]),
      val[1].reduce((acc, v) => acc + v, 0) / val[1].length
    ]);

    const timelineMin = timelineData.reduce(
      (minVal, val) => Math.min(minVal, val[1]),
      0
    );
    const timelineMax = timelineData.reduce(
      (maxVal, val) => Math.max(maxVal, val[1]),
      0
    );
    const timelineLimit =
      Math.abs(timelineMin) > Math.abs(timelineMax) ? timelineMin : timelineMax;

    // TODO: Move Timeline and Distribution into seperate classes

    const distributionConfig = {
      chart: {
        type: 'column'
      },
      title: {
        text: `${label} z-score distribution`
      },
      xAxis: {
        crosshair: true,
        min: distributionMin,
        max: Math.abs(distributionMin),
        title: {
          text: 'Z-score'
        }
      },
      yAxis: {
        title: {
          text: 'Number of occurences'
        }
      },
      tooltip: false,
      credits: false,
      legend: {
        enabled: false
      },
      series: [
        {
          data: distributionData,
          zoneAxis: 'x',
          zones: [
            {
              value: -2.9,
              color: '#777777'
            },
            {
              value: -1.9,
              color: '#ff7070'
            },
            {
              value: -0.9,
              color: '#dede32'
            },
            {
              value: 1,
              color: '#BADA55'
            },
            {
              value: 2,
              color: '#dede32'
            },
            {
              value: 3,
              color: '#ff7070'
            },
            {
              value: 1000,
              color: '#777777'
            }
          ],

          pointPadding: 0,
          groupPadding: 0
        }
      ],
      exporting: {
        enabled: true
      }
    };

    const timelineConfig = {
      chart: {
        type: 'spline'
      },
      title: {
        text: `${label} z-score timeline`
      },
      xAxis: {
        crosshair: true,
        title: {
          text: 'Month'
        }
      },
      yAxis: {
        crosshair: true,
        title: {
          text: 'Z-score'
        },
        min: Math.floor(Math.abs(timelineLimit) * -1),
        max: Math.ceil(Math.abs(timelineLimit)),
        plotLines: [
          {
            value: 3,
            color: '#777777',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '3 SD'
            }
          },
          {
            value: 2,
            color: '#ff7070',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '2 SD'
            }
          },
          {
            value: 1,
            color: '#dede32',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '1 SD'
            }
          },
          {
            value: 0,
            color: '#BADA55',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '0 SD'
            }
          },
          {
            value: -1,
            color: '#dede32',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '-1 SD'
            }
          },
          {
            value: -2,
            color: '#ff7070',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '-2 SD'
            }
          },
          {
            value: -3,
            color: '#777777',
            dashStyle: 'solid',
            width: 2,
            label: {
              text: '-3 SD'
            }
          }
        ]
      },
      tooltip: false,
      credits: false,
      legend: {
        enabled: false
      },
      series: [
        {
          data: timelineData,
          lineWidth: 5,
          marker: {
            enabled: false
          },
          zoneAxis: 'y',
          zones: [
            {
              value: -3,
              color: '#777777'
            },
            {
              value: -2,
              color: '#ff7070'
            },
            {
              value: -1,
              color: '#dede32'
            },
            {
              value: 1,
              color: '#BADA55'
            },
            {
              value: 2,
              color: '#dede32'
            },
            {
              value: 3,
              color: '#ff7070'
            },
            {
              value: 1000,
              color: '#777777'
            }
          ],

          pointPadding: 0,
          groupPadding: 0
        }
      ],
      exporting: {
        enabled: true
      }
    };

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
          {showDistribution && <ReactHighcharts config={distributionConfig} />}
          {showTimeline && <ReactHighcharts config={timelineConfig} />}
        </div>
      </div>
    );
  }
}

export default Result;
