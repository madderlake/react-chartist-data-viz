//import { strToNum } from '../../utilities/Helpers';
import { crData } from './inc-ineq-data';

//Set up the data for the chart...

const series = [],
  newArr = [];
let labelArr;

for (let k in crData) {
  const arr = Object.values(crData[k]);

  labelArr = Object.keys(crData[k]);

  arr.map((item, i) => {
    return newArr.push({ meta: k, value: item });
  });
}
const labels = [...new Set(labelArr)];
const keys = Object.keys(crData);

const result = newArr.reduce((r, o) => {
  const k = o.meta;
  if (r[k] || (r[k] = [])) r[k].push({ meta: k, value: o.value });
  return r;
}, {});

for (var n in result) {
  series.push(result[n]);
}

const data = { labels: labels, series: series };

export { data, keys };
