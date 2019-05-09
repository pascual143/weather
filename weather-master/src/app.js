import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Map from './components/map'
import SidePanel from './components/sidepanel'


const openweatherToken = process.env.OPEN_WEATHER_TOKEN


import './scss/style.scss'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      weatherData: []

    }
    this.mapCenter = { lat: 20, lng: 20},
    this.worldQuadrant = [
      '-180,0,0,90,',
      '-180,-90,0,0,',
      '0,0,180,90,',
      '0,-90,180,0,'],
    this.zoomLevel = 6

    this.handleIconClick = this.handleIconClick.bind(this)
  }

  componentDidMount() {
    // this.localWeatherInfo()
    this.globalWeatherInfo()
    navigator.geolocation.getCurrentPosition(pos => {
      const userPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude}
      this.setState({ userPosition })
    })
  }


  removeEmpty(country) {
    return (country.latlng.length > 0)
  }

  handleIconClick(id) {
    this.setState({ clickedLocation: id })
  }


  localWeatherInfo() {
    console.log('getting weather information...')
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.userPosition.lat}&lon=${this.state.userPosition.lng}&APPID=${openweatherToken}`)
      .then(response => {
        const tempArray = response.data.list.map(eachLocation => ({
          id: eachLocation.id,
          name: eachLocation.name,
          lat: eachLocation.coord.Lat,
          lng: eachLocation.coord.Lon,
          temp: eachLocation.main.temp,
          tempMin: eachLocation.main.temp_min,
          tempMax: eachLocation.main.temp_max,
          humidity: eachLocation.main.humidity,
          windSpeed: eachLocation.wind.speed,
          windDirection: eachLocation.wind.deg,
          weatherId: eachLocation.weather[0].id,
          weather: eachLocation.weather[0].description,
          weatherClouds: eachLocation.clouds.today,
          weatherIcon: eachLocation.weather[0].icon
        }))
        console.log('TempArray: '+tempArray)
      })
  }

  globalWeatherInfo() {
    console.log('getting global weather information...')
    for (let i=0; i<this.worldQuadrant.length;i++){
      axios.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${this.worldQuadrant[i]}${this.zoomLevel}&APPID=${openweatherToken}`)
        .then(response => {
          const tempArray = response.data.list.map(eachLocation => ({
            id: eachLocation.id,
            name: eachLocation.name,
            latlng: [eachLocation.coord.Lat, eachLocation.coord.Lon],
            temp: eachLocation.main.temp,
            tempMin: eachLocation.main.temp_min,
            tempMax: eachLocation.main.temp_max,
            humidity: eachLocation.main.humidity,
            windSpeed: eachLocation.wind.speed,
            windDirection: eachLocation.wind.deg,
            weatherId: eachLocation.weather[0].id,
            weather: eachLocation.weather[0].description,
            weatherClouds: eachLocation.clouds.today,
            weatherIcon: eachLocation.weather[0].icon
          }))
          const weatherData = [...this.state.weatherData, ...tempArray]
          this.setState({ weatherData })
        })
    }
  }



  render() {
    // console.log('weather data', this.state.weatherData)
    console.log(this.state)
    // console.log('REST data', this.state.countryData)
    return (

      <main>
        {this.state.weatherData &&
        <Map
          weatherPoints={this.state.weatherData}
          center={this.mapCenter}
          points={this.state.weatherData}
          handleIconClick={this.handleIconClick}
        />
        }
        <SidePanel
          location={this.state.clickedLocation}
          weatherData={this.state.weatherData}
        />

      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
