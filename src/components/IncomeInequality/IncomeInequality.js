import React, { useRef, useState, useEffect, useCallback } from 'react';
import { LineChart } from 'chartist';
import classnames from 'classnames';
import { data, keys } from './data/inc-ineq-data-proc';
import { options, responsiveOptions, onDrawHandler } from './inc-options';
import { Container, Row } from 'reactstrap';
import 'chartist/dist/index.css';
import './index.css';
console.log(data);
const IncomeInequality = (props) => {
  const dataRefs = useRef([]);
  const [activeKeys, setActiveKeys] = useState([]);
  const [currKey, setCurrKey] = useState(null);
  const visibleClass = 'visible';
  const animateClass = 'animate';

  const chartLine = useCallback(() => {
    return new LineChart('#chart-line', data, options, responsiveOptions);
  }, []);

  useEffect(() => {
    chartLine().on('draw', (data) => onDrawHandler(data, dataRefs));
  }, [chartLine]);

  const toggleKeys = (key) => {
    if (!activeKeys.includes(key)) {
      setActiveKeys([...activeKeys, key]);
      setCurrKey(key);
    } else {
      setActiveKeys([...activeKeys].filter((item) => item !== key));
      setCurrKey(null);
    }
  };

  const initialView = () => {
    toggleKeys(0);
  };

  useEffect(() => {
    window.addEventListener('load', initialView);
    window.addEventListener('resize', initialView);
    return () => {
      window.removeEventListener('resize', initialView);
      window.removeEventListener('load', initialView);
    };
  });

  useEffect(() => {
    const els = dataRefs.current;
    els.map((item, i) => {
      return [
        activeKeys.includes(i)
          ? item.classList.add(visibleClass)
          : item.classList.remove(visibleClass),
        item.classList.remove(animateClass),

        currKey === i
          ? item.classList.add(animateClass)
          : item.classList.remove(animateClass),
      ];
    });
  }, [activeKeys, currKey]);

  return (
    <div className="income-inequality">
      <section>
        <Container>
          <h2 className={`text-center py-2`}>
            {' '}
            Income Inequality in the U.S.A 1991 - 2013
          </h2>
          <div id="chart-line" ref={chartLine}></div>
        </Container>
        <Container className="legend-wrap">
          <Row className="justify-content-between">
            {keys.map((key, i) => {
              return (
                <div
                  key={`k${i}`}
                  data-index={i}
                  onClick={() => {
                    toggleKeys(i);
                  }}
                  className={classnames(
                    `key key-${i}`,
                    activeKeys.includes(i) ? 'active' : ''
                  )}>
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
export default IncomeInequality;
