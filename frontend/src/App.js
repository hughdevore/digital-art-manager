import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

// Feel free to remove this
axios.get(`${process.env.REACT_APP_API_URL}/test`)
  .then(function (response) {
    // handle success
    console.log('success', response);
  })
  .catch(function (error) {
    // handle error
    console.log('error', error);
  })
  .then(function () {
    // always executed
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
      </header>
    </div>
  );
}

export default App;
