import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
        console.log('WOWEE');
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log('HUH');
        console.log(JSON.stringify(err));
        this.setState({ data: err.data })
      });
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await axios.get('/api');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    //console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         {/* Render the newly fetched data inside of this.state.data */}
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}
export default App;