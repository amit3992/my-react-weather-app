import React, { Component } from 'react';
import logo from './amit.ico';
import './App.css';

class App extends Component {

  fetchData = (evt) => {
    evt.preventDefault();
    console.log('Get me some badass weather data son!');
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to my badass React weather app</h2>
        </div>

        <div className = "search_bar">
          <form onSubmit= {this.fetchData}>
            <h1 />
            <label>I want to know the fucking weather for
              <input placeholder={" BadassCity, BadassCountry"} type="text" />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
