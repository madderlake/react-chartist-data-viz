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

  const [activeKeys, setActiveKeys] = useState([]);
  const [currKey, setCurrKey] = useState(null);
  const visibleClass = 'visible';
  const animateClass = 'animate';
  let hasScrolled = false;
  const initialView = () => {
    toggleKeys(0);
  };

  const handleScroll = (e) => {
    let verticalOffset = window.scrollY;
    const componentOffset = scrollRef.current.offsetTop;
    const buffer = 40;
    if (componentOffset - verticalOffset < buffer && !hasScrolled) {
      initialView();
    } else {
      return;
    }
    hasScrolled = true;
  };

  const toggleKeys = (key) => {
    if (activeKeys) {
      if (!activeKeys.includes(key)) {
        setActiveKeys([...activeKeys, key]);
        setCurrKey(key);
      } else {
        setActiveKeys([...activeKeys].filter((item) => item !== key));
        setCurrKey(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('load', initialView);
    window.addEventListener('resize', initialView);
    return () => {
      window.removeEventListener('scroll', setActiveKeys);
      window.removeEventListener('resize', setActiveKeys);
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
    <div className={`federalism`} ref={scrollRef}>
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
          <h5 className={`mb-5`}>
            Select Categories Below to Explore the Support the Federal Gov't
            Provides to the States
          </h5>
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
