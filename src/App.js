/* All my imports */
import React, { Component } from 'react';
import logo from './amit.ico';
import './App.css';
import xhr from 'xhr';
import Plot from './Plot.js';

/* API-KEYS */
const API_KEY = "3c7b00355698afb30089abba1e8d619d";

class App extends Component {
  
  /* Save initial state */
  state = {
    location: 'Seattle',
    data: {},
    dates: {}, // to store xAxis of forecast data
    temps: {} // to store temp (yAxis) of forecast data
  };

  /* This API gets me data from openWeatherMap API */
  fetchData = (evt) => {
    evt.preventDefault();
    console.log('Get me some badass weather data for son!', this.state.location);
    let location = encodeURIComponent(this.state.location);
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID='+ API_KEY +'&units=metric';
    let url = urlPrefix + location + urlSuffix;

    // Get data from my URL
    xhr({
      url: url
    }, (err, data) => {
      if(err) {
        console.log('Error: ' + err);
        return;
      }

      var body = JSON.parse(data.body);
      var list = body.list;
      var dates = [];
      var temps = [];

      for(var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }
      
      this.setState({
        data: body,
        dates: dates,
        temps: temps
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
        <h2> Forecast </h2>
        <Plot
          xData = {this.state.dates}
          yData = {this.state.temps}
          type = 'scatter'
        />
        </div>
      </div>
    );
  }
}

export default App;
