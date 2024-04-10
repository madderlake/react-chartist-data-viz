import React, { useEffect, useRef, useState, useCallback } from 'react';

import { BarChart } from 'chartist';
import classnames from 'classnames';
import { data, keys } from './data/federalism-data-proc';
import { options, responsiveOptions, onDrawHandler } from './fed-options';
import { Container, Row, Col } from 'reactstrap';
import 'chartist/dist/index.css';
import './index.css';

const Federalism = () => {
  const dataRefs = useRef([]);
  const scrollRef = useRef();

  const [activeKeys, setActiveKeys] = useState([]);
  const [currKey, setCurrKey] = useState(null);
  const visibleClass = 'visible';
  const animateClass = 'animate';

  const toggleKeys = useCallback(
    (key) => {
      if (!activeKeys.includes(key)) {
        setActiveKeys([...activeKeys, key]);
        setCurrKey(key);
      } else {
        setActiveKeys([...activeKeys].filter((item) => item !== key));
        setCurrKey(null);
      }
    },
    [activeKeys]
  );

  const initialView = useCallback(() => {
    toggleKeys(0);
  }, [toggleKeys]);

  useEffect(() => {
    window.addEventListener('load', initialView);
    return () => {
      window.removeEventListener('load', initialView);
    };
  }, [initialView]);

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

  const chartBar = useCallback(() => {
    return new BarChart('#chart-bar', data, options, responsiveOptions);
  }, []);

  useEffect(() => {
    chartBar().on('draw', (data) => onDrawHandler(data, dataRefs));
  }, [chartBar]);

  return (
    <div className={`federalism`} ref={scrollRef}>
      <section>
        <Container>
          <h2 className={`text-center py-2`}> Federal Support for States</h2>
          <div id="chart-bar" ref={chartBar}></div>
        </Container>
        <Container className="legend-wrap">
          <h5 className="text-center">
            Select Categories Below to Explore the Support the Federal Gov't
            Provides to the States
          </h5>
          <Row className="">
            {keys.map((key, i) => {
              const shortKey = key.split(' ')[0];
              return (
                <Col className="key-wrap" key={key} sm={4} lg={3}>
                  <button
                    key={`k${i}`}
                    data-index={i}
                    onClick={() => toggleKeys(i)}
                    className={classnames(`key key-${i}`)}>
                    <i
                      className={classnames(
                        `${key.toLowerCase().replace(/\s/g, '-')}`,
                        activeKeys.includes(i) ? 'on' : ''
                      )}
                      key={`${i}`}></i>
                    {shortKey}
                  </button>
                </Col>
              );
            })}
          </Row>
          <small className="source text-center">
            Source:{' '}
            <a href="https://www.whitehouse.gov/omb/historical-tables/">
              Whitehouse Historical Tables
            </a>
          </small>
        </Container>
      </section>
    </div>
  );
};

export default Federalism;
