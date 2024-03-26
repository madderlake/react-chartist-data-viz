import { BarChart } from 'chartist';
import { useCallback } from 'react';
export const FedChart = (data, options, responsiveOptions, handler) => {
  const chart = new BarChart('#chart', data, options, responsiveOptions);
  chart.on('draw', handler);
  // console.log(chart());
  return chart;
};
