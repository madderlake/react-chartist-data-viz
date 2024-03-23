import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
function importBuildTarget() {
  if (process.env.REACT_APP_BUILD_TARGET === 'fed') {
    return import('./components/Federalism/Federalism/FedereralismChart');
  } else if (process.env.REACT_APP_BUILD_TARGET === 'inc') {
    return import('./components/IncInequality');
  } else if (process.env.REACT_APP_BUILD_TARGET === 'app') {
    return (
      import('./components/IncomeInequality/IncInequality') &&
      import('./components/Federalism/Federalism')
    );
  } else {
    return Promise.reject(
      new Error('No such build target: ' + process.env.REACT_APP_BUILD_TARGET)
    );
  }
}
importBuildTarget().then(({ default: Environment }) =>
  ReactDOM.render(
    <React.StrictMode>
      <Environment />
    </React.StrictMode>,
    document.getElementById('root')
  )
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
