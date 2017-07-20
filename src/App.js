/* All my imports */
import React, { Component } from 'react';
import logo from './amit.ico';
import './App.css';
import xhr from 'xhr';

/* API-KEYS */
const API_KEY = "3c7b00355698afb30089abba1e8d619d";


class App extends Component {
  
  /* Save initial state */
  state = {
    location: 'Seattle',
    data: {}
  };

  /* This API gets me data from openWeatherMap API */
  fetchData = (evt) => {
    evt.preventDefault();
    console.log('Get me some badass weather data for son!', this.state.location);
    let location = encodeURIComponent(this.state.location);
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID='+ API_KEY +'&units=imperial';
    let url = urlPrefix + location + urlSuffix;

    // Get data from my URL
    xhr({
      url: url
    }, (err, data) => {
      if(err) {
        console.log('Error: ' + err);
        return;
      }

      this.setState({
        data: JSON.parse(data.body)
      });
    });

  };

  // Change location from user input
  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    let currentTemp = "Give me a location, ass. ";
    if(this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to my badass React weather app</h2>
        </div>

        <div className = "search_bar">
          <form onSubmit= {this.fetchData}>
            <h1 />
            <label>I want to know the badass weather for
              <input placeholder={" BadassCity,Country"} 
              type="text"
              value = {this.state.location}
              onChange = {this.changeLocation} 
              />
            </label>
          </form>
          <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
        </div>
      </div>
    );
  }
}

export default App;
