import React from 'react';
import './styles/styles.css';
import FederalismChart from './components/Federalism/Federalism';
import IncomeInequalityChart from './components/IncomeInequality/IncInequality';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Cengage Chart Projects 2018 - 2019</h1>
      </header>
      <IncomeInequalityChart type={`Line`} />
      <FederalismChart type={`Bar`} />
    </div>
  );
};

export default App;
