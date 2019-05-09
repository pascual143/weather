import React from 'react'
import $ from 'jquery'


class SidePanel extends React.Component {
  constructor() {
    super()
    this.locale={
      name: ''
    }
  }


  findLocation(locationId)  {
    this.locale = this.props.weatherData.filter(x => x.id === parseInt(locationId))[0]
    console.log(this.locale.name)
    console.log('sidepanel icon: ')
    console.log(this.locale.weatherIcon)
    switch (this.locale.weatherIcon) {
      case '01d':
        this.locale.weatherIconPath='./images/day-amin.svg'
        break
      case '01n':
        this.locale.weatherIconPath='./images/night-amin.svg'
        break
      case '02d':
        this.locale.weatherIconPath='./images/cloudy-day-1-amin.svg'
        break
      case '02n':
        this.locale.weatherIconPath='./images/cloudy-night-1-amin.svg'
        break
      case '03d':
        this.locale.weatherIconPath='./images/cloudy-day-3-amin.svg'
        break
      case '03n':
        this.locale.weatherIconPath='./images/cloudy-night-3-amin.svg'
        break
      case '04d':
        this.locale.weatherIconPath='./images/cloudy-amin.svg'
        break
      case '04n':
        this.locale.weatherIconPath='./images/cloudy-amin.svg'
        break
      case '11d':
        this.locale.weatherIconPath='./images/thunder-amin.svg'
        break
      case '11n':
        this.locale.weatherIconPath='./images/thunder-amin.svg'
        break
      case '13d':
        this.locale.weatherIconPath='./images/snowy-6-amin.svg'
        break
      case '13n':
        this.locale.weatherIconPath='./images/snowy-6-amin.svg'
        break


      case '09d':
        this.locale.weatherIconPath='./images/rainy-5-amin.svg'
        break
      case '09n':
        this.locale.weatherIconPath='./images/rainy-5-amin.svg'
        break
      case '10d':
        this.locale.weatherIconPath='./images/rainy-6-amin.svg'
        break
      case '10n':
        this.locale.weatherIconPath='./images/rainy-6-amin.svg'
        break
      case '50d':
        this.locale.weatherIconPath='./images/snowy-6-amin.svg'
        break
      case '50n':
        this.locale.weatherIconPath='./images/snowy-6-amin.svg'
        break
      // default:
      //   this.locale.weatherIcon='./images/rainy-6-amin.svg'
    }
    this.locationName = location.id
    return

  }

  render() {
    if(!this.props.location) return null
    // console.log(location.name)
    return(
      <aside>
        {this.findLocation(this.props.location)}
        <div className='place'>{this.locale.name}</div>

        <div>{this.locale.weatherIcon}</div>
        <div>{this.locale.weatherIconPath}</div>

        <img className='weatherIcon' src={this.locale.weatherIconPath} />
        <div className='temp'>{this.locale.temp.toFixed(1)}°C</div>
        <div>{this.locale.tempMin.toFixed(1)}°C / {this.locale.tempMax.toFixed(1)}°C</div>
        <div>&nbsp;</div>
        <div>Humidty: {this.locale.humidity}%</div>
        <div>&nbsp;</div>
        <div>Windspeed: {this.locale.windSpeed} knots</div>
        <div>Direction: {this.locale.windDirection.toFixed(0)}°</div>
        <div>&nbsp;</div>
        <div>{this.locale.weather}</div>
      </aside>
    )
  }
}

export default SidePanel
