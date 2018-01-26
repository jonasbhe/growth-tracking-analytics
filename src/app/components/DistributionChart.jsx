import React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';

HighchartsExporting(ReactHighcharts.Highcharts);

const DistributionChart = ({ label, distribution }) => {
  const distributionData = Object.entries(distribution)
    .sort((a, b) => a[0] - b[0])
    .map(d => [Number(d[0]), d[1]]);

  const distributionMin =
    Math.abs(distributionData[0][0]) >
    distributionData[distributionData.length - 1][0]
      ? distributionData[0][0]
      : distributionData[distributionData.length - 1][0] * -1;

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

  return <ReactHighcharts config={distributionConfig} />;
};

export default DistributionChart;
