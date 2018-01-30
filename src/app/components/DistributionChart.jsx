import React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';
import HighchartsOfflineExporting from 'highcharts-offline-exporting';

import getColor from '../../formulas/getColor';

HighchartsExporting(ReactHighcharts.Highcharts);
HighchartsOfflineExporting(ReactHighcharts.Highcharts);

const DistributionChart = ({
  label,
  distribution,
  ouName,
  startDate,
  endDate,
  gender,
  minAge,
  maxAge
}) => {
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
      text: `${label} z-score distribution ${ouName}`
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
      min: distributionMin,
      max: Math.abs(distributionMin),
      title: {
        text: 'Z-score'
      },
      tickInterval: 0.5
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
            color: getColor(3)
          },
          {
            value: -1.9,
            color: getColor(2)
          },
          {
            value: -0.9,
            color: getColor(1)
          },
          {
            value: 1,
            color: getColor(0)
          },
          {
            value: 2,
            color: getColor(1)
          },
          {
            value: 3,
            color: getColor(2)
          },
          {
            value: 1000,
            color: getColor(3)
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

  return <ReactHighcharts config={distributionConfig} />;
};

export default DistributionChart;
