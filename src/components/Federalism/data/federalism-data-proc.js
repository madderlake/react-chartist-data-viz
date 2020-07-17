import fedData from './federalism-data';
import { strToNum } from '../../utilities/Helpers';
const series = [],
  newArr = [];
let labelArr;

for (let k in fedData) {
  const arr = Object.values(fedData[k]);

  labelArr = Object.keys(fedData[k]);

  arr.map((item, i) => {
    return newArr.push({ meta: k, value: strToNum(item) });
  });
}
const labels = [...new Set(labelArr)];
const keys = Object.keys(fedData);

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
