import React, { useEffect, useRef, useState } from 'react';
import ChartistGraph from 'react-chartist';
import classnames from 'classnames';
import { data, keys } from '../IncomeInequality/data/inc-ineq-data-proc';
import { addCommas } from '../utilities/Helpers';
import { Container, Row } from 'reactstrap';
import './index.css';

const IncomeInequalityChart = () => {
  const dataRefs = useRef([]);
  const [activeKeys, setActiveKeys] = useState([]);
  const [currKey, setCurrKey] = useState(null);

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

  const toggle = key => {
    setCurrKey(key);
    if (!activeKeys.includes(key)) {
      setActiveKeys(activeKeys.concat(key));
    } else {
      setActiveKeys(activeKeys.filter(item => item !== key));
      setCurrKey(null);
    }
  };

  const onDrawHandler = data => {
    if (data.type === 'grid' && data.index === 0) {
      data.element.addClass('axis');
    }
    if (
      data.type === 'line' &&
      data.group._node.classList.contains('ct-series')
    ) {
      data.group._node.setAttribute(
        'ref',
        (dataRefs.current[data.index] = data.group._node)
      );
    }
  };

  useEffect(() => {
    if (dataRefs.current) {
      dataRefs.current.forEach((item, i) => {
        if (activeKeys.includes(i)) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
          item.classList.remove('animate');
        }
      });
    }
  }, [activeKeys]);
  useEffect(() => {
    if (dataRefs.current) {
      dataRefs.current.forEach((item, i) => {
        if (currKey === i) {
          item.classList.add('animate');
        } else {
          item.classList.remove('animate');
        }
      });
    }
  }, [currKey]);

  return (
    <div className={`income-inequality`}>
      <section>
        <Container>
          <h2 className={`text-center py-2`}>
            {' '}
            Income Inequality in the U.S.A 1991 - 2013
          </h2>
          <ChartistGraph
            data={data}
            options={options}
            responsiveOptions={responsiveOptions}
            type={type}
            listener={{ draw: e => onDrawHandler(e) }}
            activeKeys={activeKeys}
          />
        </Container>
        <Container className="legend-wrap">
          <Row className="justify-content-between">
            {keys.map((key, i) => {
              return (
                <div
                  key={`k${i}`}
                  data-index={i}
                  onClick={() => {
                    toggle(i);
                  }}
                  className={classnames(
                    `key key-${i}`,
                    activeKeys.includes(i) ? 'active' : ''
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
      </section>
    </div>
  );
};

export default IncomeInequalityChart;
