import React, { useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import classnames from 'classnames';
import { data, keys } from './data/inc-ineq-functions';
import { addCommas, strToNum } from '../../components/utilities/Helpers';
import { Container, Row } from 'reactstrap';
import '../../../node_modules/chartist/dist/chartist.css';
import './index.css';
//import chartistPluginAxisTitle from 'chartist-plugin-axistitle';

const IncomeInequalityChart = () => {
  const options = {
    width: '100%',
    height: 320,
    chartPadding: { top: 20, right: 0, bottom: 0, left: 0 },
    lineSmooth: false,
    axisX: { offset: 60, onlyInteger: false },
    axisY: {
      offset: 80,
      labelInterpolationFnc: function(value) {
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
          labelInterpolationFnc: function(value, index) {
            return "'" + value.substring(2);
          }
        },
        axisY: {
          //type: ChartistGraph.AutoScaleAxis,
          offset: 45,
          labelOffset: { x: 0 },
          labelInterpolationFnc: function(value) {
            //return index % 4 === 0 ? 'W' + value : null;
            return value / 1000 + 'K';
          }
        }
      }
    ]
  ];
  const type = 'Line';
  //const [activeKeys, setActiveKeys] = useState([]);
  // const toggle = key => {
  //   !activeKeys.includes(key)
  //     ? setActiveKeys(activeKeys.concat(key))
  //     : setActiveKeys(activeKeys.filter(item => item !== key));
  // };

  useEffect(() => {
    //turn over dom interaction / changes to vanilla js cuz can't access svg nodes easily from React
    const key = document.querySelectorAll('.key');

    key.forEach(
      (key, i) => {
        key.addEventListener('click', function() {
          key.classList.toggle('active');
          const series = document.querySelectorAll('.ct-series');
          const lines = series[i].querySelectorAll('.ct-line');
          const points = series[i].querySelectorAll('.ct-point');
          lines.forEach(line => line.classList.toggle('visible'));
          points.forEach(point => point.classList.toggle('visible'));
        });
      }
      // [ChartistGraph]
    );
  });
  return (
    <div>
      <Container>
        <ChartistGraph
          data={data}
          options={options}
          responsiveOptions={responsiveOptions}
          type={type}
          //activeKeys={activeKeys}
        />
      </Container>
      <Container className="legend-wrap">
        <Row className="justify-content-between">
          {keys.map((key, i) => {
            return (
              <div
                key={`k${i}`}
                data-index={i}
                // onClick={() => {
                //   toggle(i);
                // }}
                className={classnames(
                  `key key-${i}`
                  //activeKeys.includes(i) ? 'active' : ''
                )}
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
