import React, { useEffect, useRef, useState } from 'react';
import ChartistGraph from 'react-chartist';
import classnames from 'classnames';
import { data, keys } from './data/federalism-data-proc';
import {
  options,
  responsiveOptions,
  onDrawHandler,
} from './federalism-options';
import { Container, Row, Col } from 'reactstrap';
import './index.css';

const FederalismChart = (props) => {
  const dataRefs = useRef([]);
  const scrollRef = useRef();

  const [activeKeys, setActiveKeys] = useState([0]);
  const visibleClass = 'visible';
  const animateClass = 'animate';

  const handleScroll = (e) => {
    let verticalOffset = window.scrollY;
    const componentOffset =
      e.target.body.querySelector('.federalism').offsetTop;
    const buffer = 200;
    if (componentOffset - verticalOffset < buffer) {
    }
  };

  const toggleKeys = (key) => {
    if (activeKeys) {
      if (!activeKeys.includes(key)) {
        setActiveKeys([...activeKeys, key]);
      } else {
        setActiveKeys([...activeKeys].filter((item) => item !== key));
      }
    }
  };

  const updateDataStyle = (el, i) => {
    if (activeKeys.includes(i)) {
      el.classList.add(visibleClass);
      el.classList.add(animateClass);
    } else {
      el.classList.remove(visibleClass);
      el.classList.remove(animateClass);
    }
  };

  useEffect(() => {
    window.addEventListener('load', function () {
      setActiveKeys([0]);
    });
    window.addEventListener('resize', function () {
      setActiveKeys([0]);
    });
    return () => {
      window.removeEventListener('load', setActiveKeys);
      window.removeEventListener('resize', setActiveKeys);
    };
  }, []);

  useEffect(() => {
    const els = dataRefs.current;
    els.map((el, i) => setTimeout(updateDataStyle, 750 * i, el, i));
  }, [activeKeys]);

  return (
    <div className={`federalism`} ref={scrollRef} onScroll={handleScroll}>
      <section>
        <Container>
          <h2 className={`text-center py-2`}> Federal Support for States</h2>

          <ChartistGraph
            data={data}
            options={options}
            responsiveOptions={responsiveOptions}
            type={props.type}
            listener={{ draw: (e) => onDrawHandler(e, dataRefs) }}
          />
        </Container>
        <Container className="legend-wrap">
          {/* <h5 className={`mb-5`}>
            Select Categories Below to Compare How Much Support the Federal
            Gov't Provides to the States
          </h5> */}
          <Row className="">
            {keys.map((key, i) => {
              return (
                <Col className={`key-wrap`} key={key} sm={12} md={6} lg={2}>
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
                    {key}
                  </button>
                </Col>
              );
            })}
          </Row>
          <small className={`source`}>
            <small className={`text-center`}>
              Source:{' '}
              <a href="https://www.whitehouse.gov/omb/historical-tables/">
                https://www.whitehouse.gov/omb/historical-tables/
              </a>
            </small>
          </small>
        </Container>
      </section>
    </div>
  );
};

export default FederalismChart;
