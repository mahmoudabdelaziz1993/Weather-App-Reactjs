
import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './components/Weather'
import 'weather-icons/css/weather-icons.css'
import Form from './components/Form'
const Weather_APi = '90cf146f7b0f427696a90ba83fe5f2f9'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weather: {
        country: undefined,
        city: undefined,
        description: undefined,
        icon: undefined,
        like: undefined,
        main: undefined,
        temp_min: undefined,
        temp_max: undefined,
      },
      error: false,
      vision: false,
      load: false
    }

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }


  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Thunderstorm } }));
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Drizzle } }));
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Rain } }));
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Snow } }));
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Atmosphere } }));
        break;
      case rangeId === 800:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Clear } }));
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Clouds } }));
        break;
      default:
        this.setState(prev => ({ weather: { ...prev.weather, icon: icons.Clouds } }));
    }
  }
  getWeather = async (url) => {
    try {
      this.setState({ load: true });
      let data = await fetch(url);
      data = await data.json()
      console.log(data);
      this.setState({
        weather: {
          country: data.sys.country,
          city: data.name,
          description: data.weather[0].description,
          like: this.celsiusConvert(data.main.feels_like),
          main: this.celsiusConvert(data.main.temp),
          temp_min: this.celsiusConvert(data.main.temp_min),
          temp_max: this.celsiusConvert(data.main.temp_max),
        },
        vision: true,
        load:false
      })
      this.get_WeatherIcon(this.weatherIcon, data.weather[0].id)
    } catch (error) {
      this.setState({ error: true, vision: false })
    }
  }
  // convert from kelvin to celsius
  celsiusConvert = (temp) => {
    return Math.floor(temp - 272.15)
  };

  //load weather data 
  loadData = async (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Weather_APi}`
    if (city && country) {
      this.getWeather(URL)
    } else {
      this.errorHandle()
    }

  }
  errorHandle = () => {
    this.setState({ error: true, vision: false })
  }

  render() {
    return (
      <div className="App">
        <Form loadData={ this.loadData } error={ this.state.error } />
        { this.state.load ? <div class="spinner-border text-success dispaly-1"></div> :
          this.state.vision ? <Weather data={ this.state.weather } /> : null }
      </div>
    )
  }
}

export default App

