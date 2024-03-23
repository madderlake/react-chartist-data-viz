import React from 'react';
import './styles/styles.css';
import FederalismChart from './components/Federalism/Federalism';
import IncomeInequalityChart from './components/IncomeInequality/IncInequality';

const App = () => {
  if (process.env.REACT_APP_BUILD_TARGET === 'inc') {
    return <IncomeInequalityChart type={`Line`} />;
  } else if (process.env.REACT_APP_BUILD_TARGET === 'fed') {
    return <FederalismChart type={`Bar`} />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Cengage Chart Projects 2018 - 2019</h1>
        </header>
        <IncomeInequalityChart type={`Line`} />
        <FederalismChart type={`Bar`} />
      </div>
    );
  }
};
console.log(process.env.REACT_APP_BUILD_TARGET);
export default App;
