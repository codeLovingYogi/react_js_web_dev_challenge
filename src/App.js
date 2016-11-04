import React, { Component } from 'react';
const logo = '//d2t498vi8pate3.cloudfront.net/assets/home-header-logo-8d37f4195730352f0055d39f7e88df602e2d67bdab1000ac5886c5a492400c9d.png';
import './App.css';
import AllPassages from './Components/AllPassages'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Quill Web Dev Challenge</h2>
        </div>
        {/*<p className="App-intro">
          Refer to the <a href="https://github.com/empirical-org/quill-web-dev-challenge" target="_blank">README</a> for the instructions to this challenge.
          <br/>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <AllPassages />
      </div>
    );
  }
}

export default App;
