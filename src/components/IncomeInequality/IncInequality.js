import React, { useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import classnames from 'classnames';
import { data, keys } from './data/inc-ineq-functions';
import { addCommas, strToNum } from '../../components/utilities/Helpers';
import { Container, Row } from 'reactstrap';
import '../../../node_modules/chartist/dist/chartist.css';
import './index.css';

const IncomeInequalityChart = () => {
  const options = {
    width: '100%',
    height: 320,
    chartPadding: { top: 20, right: 0, bottom: 0, left: 0 },
    lineSmooth: false,
    axisX: { offset: 60, onlyInteger: false },
    axisY: {
      offset: 80,
      labelInterpolationFnc: function (value) {
        return addCommas(value);
      },
      labelOffset: { x: -10, y: 8 },
      type: ChartistGraph.FixedScaleAxis,
      high: 150000,
      low: 0
    }
  };
  const responsiveOptions = [
    [
      'screen and (max-width: 640px)',
      {
        axisX: {
          labelOffset: { x: 0, y: 6 },
          labelInterpolationFnc: function (value, index) {
            return "'" + value.substring(2);
          }
        },
        axisY: {
          offset: 45,
          labelOffset: { x: 0 },
          labelInterpolationFnc: function (value) {
            return value / 1000 + 'K';
          }
        }
      }
    ]
  ];
  const type = 'Line';

  useEffect(() => {
    /* until I am able to reference the svg elements directly - WIP */
    const key = document.querySelectorAll('.key');

    key.forEach((key, i) => {
      key.addEventListener('click', function () {
        key.classList.toggle('active');
        const series = document.querySelectorAll('.ct-series');
        const lines = series[i].querySelectorAll('.ct-line');
        const points = series[i].querySelectorAll('.ct-point');
        lines.forEach(line => line.classList.toggle('visible'));
        points.forEach(point => point.classList.toggle('visible'));
      });
    });
  });
  return (
    <div>
      <Container>
        <ChartistGraph
          data={data}
          options={options}
          responsiveOptions={responsiveOptions}
          type={type}
        />
      </Container>
      <Container className="legend-wrap">
        <Row className="justify-content-between">
          {keys.map((key, i) => {
            return (
              <div
                key={`k${i}`}
                data-index={i}
                className={classnames(`key key-${i}`)}
              >
                <svg className="checkbox" width="20" height="20">
                  <rect width="20" height="20" />
                </svg>
                {key}
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default IncomeInequalityChart;
