import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import IncomeInequalityChart from './components/IncomeInequality/IncInequality';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <h1> Chartist Data Projects 2018 - 2019</h1>
      </header>
      <IncomeInequalityChart />
    </div>
  );
}

export default App;
