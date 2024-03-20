import fedData from './federalism-data';
import { strToNum } from '../../utilities/Helpers';
const series = [],
  newArr = [];
let labelArr;
let totalsArr = [];
for (let k in fedData) {
  totalsArr.push(fedData[k]);
}
function calculateYearTotals(data) {
  const totalsByYear = {};

  data.forEach((yearData) => {
    Object.entries(yearData).forEach(([year, value]) => {
      const numericValue = parseInt(value.replace(/,/g, ''));
      totalsByYear[year] = (totalsByYear[year] || 0) + numericValue;
    });
  });

  return totalsByYear;
}

// Calculate totals
const totalsData = calculateYearTotals(totalsArr);

for (let k in fedData) {
  const arr = Object.values(fedData[k]);
  labelArr = Object.keys(fedData[k]);
  arr.map((item, i) => {
    return newArr.push({ meta: k, value: strToNum(item) });
  });
}
/* reversing this because it is unshifted later on */
const yearSet = [...new Set(Object.values(totalsData).reverse())];

yearSet.map((val) => newArr.unshift({ meta: 'Total', value: strToNum(val) }));

const labels = [...new Set(labelArr)];
const keys = Object.keys(fedData);
keys.unshift('Total');

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
