import React from 'react';
//import logo from './logo.svg';
import './styles/styles.css';
import FederalismChart from './components/Federalism/Federalism';
import IncomeInequalityChart from './components/IncomeInequality/IncInequality';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Cengage Chart Projects 2018 - 2019</h1>
      </header>
      <IncomeInequalityChart />
      <FederalismChart />
    </div>
  );
}

export default App;
