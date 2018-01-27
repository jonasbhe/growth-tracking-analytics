import React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';
import HighchartsOfflineExporting from 'highcharts-offline-exporting';

import getColor from '../../formulas/getColor';

HighchartsExporting(ReactHighcharts.Highcharts);
HighchartsOfflineExporting(ReactHighcharts.Highcharts);

const getPlotline = (value, label) => ({
  value,
  color: getColor(value),
  dashStyle: 'solid',
  width: 2,
  label: {
    text: label
  }
});

const TimelineChart = ({
  label,
  timeline,
  ouName,
  startDate,
  endDate,
  gender,
  minAge,
  maxAge
}) => {
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

  const timelineConfig = {
    chart: {
      type: 'spline'
    },
    title: {
      text: `${label} z-score timeline ${ouName}`
    },
    subtitle: {
      text: `${startDate
        .toISOString()
        .substring(0, 10)} to ${endDate
        .toISOString()
        .substring(0, 10)}, gender: ${gender}, age: ${minAge} to ${maxAge}`
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
        getPlotline(3, '3 SD'),
        getPlotline(2, '2 SD'),
        getPlotline(1, '1 SD'),
        getPlotline(0, '0 SD'),
        getPlotline(-1, '-1 SD'),
        getPlotline(-2, '-2 SD'),
        getPlotline(-3, '-3 SD')
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
      fallbackToExportServer: false
    }
  };

  return <ReactHighcharts config={timelineConfig} />;
};

export default TimelineChart;
