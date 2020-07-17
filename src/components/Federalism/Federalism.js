import React, { useEffect, useRef, useState } from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import classnames from 'classnames';
import { data, keys } from './data/federalism-data-proc';
import { addCommas } from '../utilities/Helpers';
import { Container, Row, Col } from 'reactstrap';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import './index.css';

const FederalismChart = () => {
  const dataRefs = useRef([]);
  //const graphRef = useRef(null);
  const [activeKeys, setActiveKeys] = useState([]);
  const [currKey, setCurrKey] = useState(null);
  const type = 'Bar';

  const options = {
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
      }
    },
    axisY: {
      offset: 80,
      labelInterpolationFnc: function (value) {
        //return addCommas(value);
        return '$' + value / 1000 + ' B';
      },
      labelOffset: { x: 0, y: 8 },
      type: ChartistGraph.FixedScaleAxis,
      high: 150000,
      low: 0,
      ticks: [0, 25000, 50000, 75000, 100000, 125000]
    },
    plugins: [
      ChartistTooltip({
        currency: '$',
        class: 'ct-tooltip',
        transformTooltipTextFnc: function (x) {
          //return addCommas(x) + 'M';
          return (x / 1000).toFixed(1) + 'B';
        }
      })
    ]
  };
  //   const responsiveOptions = [
  //     [
  //       'screen and (max-width: 640px)',
  //       {
  //         axisX: {
  //           labelOffset: { x: 0, y: 6 },
  //           labelInterpolationFnc: function (value, index) {
  //             return "'" + value.substring(2);
  //           }
  //         },
  //         axisY: {
  //           offset: 45,
  //           labelOffset: { x: 0 },
  //           labelInterpolationFnc: function (value) {
  //             return value / 1000 + 'K';
  //           }
  //         }
  //       }
  //     ]
  //   ];

  const toggle = key => {
    setCurrKey(key);

    if (!activeKeys.includes(key)) {
      setActiveKeys(activeKeys.concat(key));
    } else {
      setActiveKeys(activeKeys.filter(item => item !== key));
      setCurrKey(null);
    }
  };

  useEffect(() => {
    if (dataRefs.current) {
      console.log(dataRefs.current);
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
  /* Chart Specific Handler */
  const onDrawHandler = data => {
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
              'z'
            ].join(' '),
            style: 'fill-opacity: 1 ; fill: #f4c63d'
          },
          'ct-arrow'
        );
        data.group.append(arrow);
        const customLabels = [];
        customLabels[data.index] = addCommas(
          Chartist.getMultiValue(data.value)
        );
        if (customLabels[data.index]) {
          const x = data.type === 'bar' ? data.x2 : data.x;
          const y = data.type === 'bar' ? data.y2 : data.y;
          data.group
            .elem('text', { x: x - 24, y: y - 25 }, 'ct-label-top')
            .text(customLabels[data.index]);
        }
      }
    }

    if (
      data.type === 'bar' &&
      data.group._node.classList.contains('ct-series')
    ) {
      data.group._node.setAttribute(
        'ref',
        (dataRefs.current[data.seriesIndex] = data.group._node)
      );
    }
  };

  return (
    <div className={`federalism`}>
      <Row tag={`section`}>
        <Container>
          <h2 className={`text-center py-2`}> Federal Support for States</h2>
          <ChartistGraph
            data={data}
            options={options}
            //responsiveOptions={responsiveOptions}
            type={type}
            listener={{ draw: e => onDrawHandler(e) }}
          />
        </Container>
        <Container className="legend-wrap">
          <h5 className={`mb-5`}>
            Select Categories Below to Compare How Much Support the Federal
            Gov't Provides to the States
          </h5>
          <Row className="justify-content-between">
            {keys.map((key, i) => {
              return (
                <Col className={`key-wrap`} key={key} sm={12} md={6} lg={3}>
                  <button
                    key={`k${i}`}
                    data-index={i}
                    onClick={() => {
                      toggle(i);
                    }}
                    className={classnames(`key key-${i}`)}
                  >
                    <i
                      className={classnames(
                        `${key.toLowerCase().replace(/\s/g, '-')}`,
                        activeKeys.includes(i) ? 'on' : ''
                      )}
                      key={`${i}`}
                    ></i>
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
      </Row>
    </div>
  );
};

export default FederalismChart;
