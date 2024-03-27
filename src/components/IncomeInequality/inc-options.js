import { FixedScaleAxis } from 'chartist';
export const options = {
  width: '100%',
  height: 400,
  chartPadding: { top: 20, right: 0, bottom: 0, left: 0 },
  lineSmooth: false,
  fullWidth: true,
  axisX: { offset: 60, onlyInteger: false },
  axisY: {
    offset: 80,
    labelInterpolationFnc: function (value) {
      return '$' + value / 1000 + 'K';
    },
    labelOffset: { x: -10, y: 8 },
    type: FixedScaleAxis,
    high: 155000,
    low: 0,
    ticks: [0, 25000, 50000, 75000, 100000, 125000, 155000],
  },
};
export const responsiveOptions = [
  [
    'screen and (max-width: 640px)',
    {
      axisX: {
        labelOffset: { x: 0, y: 6 },
        labelInterpolationFnc: function (value, index) {
          return "'" + value.substring(2);
        },
      },
      axisY: {
        offset: 45,
        labelOffset: { x: 0 },
        labelInterpolationFnc: function (value) {
          return value / 1000 + 'K';
        },
      },
    },
  ],
];

export const onDrawHandler = (data, refs) => {
  if (data.type === 'grid' && data.index === 0) {
    data.element.addClass('axis');
  }
  if (
    data.type === 'line' &&
    data.group._node.classList.contains('ct-series')
  ) {
    data.group._node.setAttribute(
      'ref',
      (refs.current[data.index] = data.group._node)
    );
  }
  if (data.group._node.classList.contains('ct-series-a')) {
    data.group._node.classList.add('visible', 'animate');
  }
};
