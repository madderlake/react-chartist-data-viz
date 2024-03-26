import React from 'react';
import './styles/styles.css';
import FederalismChart from './components/Federalism/Federalism';
import IncomeInequalityChart from './components/IncomeInequality/IncomeInequality';

const App = () => {
  if (process.env.REACT_APP_BUILD_TARGET === 'inc') {
    return <IncomeInequalityChart type={`Line`} />;
  } else if (process.env.REACT_APP_BUILD_TARGET === 'fed') {
    return <FederalismChart type={`Bar`} />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Cengage React Chart Projects</h1>
        </header>
        <IncomeInequalityChart type={`Line`} />
        <FederalismChart type={`Bar`} />
      </div>
    );
  }
};

export default App;
