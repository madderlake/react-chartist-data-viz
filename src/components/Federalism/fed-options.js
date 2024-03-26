import { getMultiValue, Svg, FixedScaleAxis } from 'chartist';
import { strToNum } from '../utilities/Helpers';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

export const onDrawHandler = (data, refs) => {
  if (data.type === 'grid' && data.index === 0) {
    data.element.addClass('axis');
  }

  if (data.type === 'bar') {
    if (getMultiValue(data.value) > 125000) {
      const arrow = new Svg(
        'path',
        {
          d: [
            'M',
            data.x1,
            data.y2 - 10,
            'L',
            data.x2 - 10,
            data.y2 + 1,
            'L',
            data.x2 + 10,
            data.y2 + 1,
            'z',
          ].join(' '),
        },
        'ct-arrow'
      );
      data.group.append(arrow);
      const customLabels = [];
      customLabels[data.index] = getMultiValue(data.value);
      if (customLabels[data.index]) {
        const x = data.type === 'bar' ? data.x2 : data.x;
        const y = data.type === 'bar' ? data.y2 : data.y;
        const offsetY = data.group._node.classList.contains('ct-series-a')
          ? 35
          : 20;
        data.group
          .elem('text', { x: x - 15, y: y - offsetY }, 'ct-label-top')
          .text('$' + strToNum(customLabels[data.index] / 1000) + 'B');
      }
    }
  }

  if (data.type === 'bar') {
    data.group._node.setAttribute(
      'ref',
      (refs.current[data.seriesIndex] = data.group._node)
    );
  }
};
export const options = {
  width: '100%',
  height: 450,
  chartPadding: { top: 80, right: 40, bottom: 0, left: 0 },
  seriesBarDistance: 10,
  fullWidth: true,
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
    type: FixedScaleAxis,
    high: 150000,
    low: 0,
    ticks: [0, 25000, 50000, 75000, 100000, 125000],
  },
  // plugins: [
  //   ChartistTooltip({
  //     currency: '$',
  //     class: 'ct-tooltip',
  //     appendToBody: true,
  //     transformTooltipTextFnc: function (x) {
  //       //return addCommas(x) + 'M';
  //       return (x / 1000).toFixed(1) + 'B';
  //     },
  //   }),
  // ],
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
