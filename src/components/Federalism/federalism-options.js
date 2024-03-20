import Chartist from 'chartist';
import { strToNum } from '../utilities/Helpers';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import ChartistGraph from 'react-chartist';

export const onDrawHandler = (data, refs) => {
  if (data.type === 'grid' && data.index === 0) {
    data.element.addClass('axis');
  }

  if (data.type === 'bar') {
    if (Chartist.getMultiValue(data.value) > 125000) {
      const arrow = Chartist.Svg(
        'path',
        {
          d: [
            'M',
            data.x1,
            data.y2 - 13,
            'L',
            data.x2 - 13,
            data.y2 + 1,
            'L',
            data.x2 + 13,
            data.y2 + 1,
            'z',
          ].join(' '),
        },
        'ct-arrow'
      );
      data.group.append(arrow);
      const customLabels = [];
      customLabels[data.index] = Chartist.getMultiValue(data.value);
      if (customLabels[data.index]) {
        const x = data.type === 'bar' ? data.x2 : data.x;
        const y = data.type === 'bar' ? data.y2 : data.y;
        data.group
          .elem('text', { x: x - 15, y: y - 25 }, 'ct-label-top')
          .text(strToNum(customLabels[data.index] / 1000) + 'B');
      }
    }
  }

  if (data.type === 'bar' && data.group._node.classList.contains('ct-series')) {
    data.group._node.setAttribute(
      'ref',
      (refs.current[data.seriesIndex] = data.group._node)
    );
  }
};
export const options = {
  width: '100%',
  height: 380,
  chartPadding: { top: 40, right: 0, bottom: 0, left: 0 },
  seriesBarDistance: 10,
  axisX: {
    offset: 60,
    labelOffset: { x: 0, y: 5 },
    labelInterpolationFnc: function (value) {
      if (value > 2016) {
        return value + '\n (estimate)';
      } else {
        return value;
      }
    },
  },
  axisY: {
    offset: 80,
    labelInterpolationFnc: function (value) {
      return '$' + value / 1000 + ' B';
    },
    labelOffset: { x: 0, y: 8 },
    type: ChartistGraph.FixedScaleAxis,
    high: 150000,
    low: 0,
    ticks: [0, 25000, 50000, 75000, 100000, 125000],
  },
  plugins: [
    ChartistTooltip({
      currency: '$',
      class: 'ct-tooltip',
      appendToBody: true,
      transformTooltipTextFnc: function (x) {
        //return addCommas(x) + 'M';
        return (x / 1000).toFixed(1) + 'B';
      },
    }),
  ],
};

export const responsiveOptions = [
  [
    'screen and (max-width: 640px)',
    {
      width: '95%',
      axisX: {
        labelOffset: { x: 0, y: 6 },
        labelInterpolationFnc: function (value, index) {
          if (value > 2016) {
            return "'" + value.substring(2) + '\n  (est)';
          } else {
            return "'" + value.substring(2);
          }
        },
      },
      axisY: {
        offset: 40,
        labelOffset: { x: 0 },
        labelInterpolationFnc: function (value) {
          return value / 1000 + 'K';
        },
      },
    },
  ],
];
