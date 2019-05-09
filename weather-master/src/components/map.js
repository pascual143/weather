import React from 'react'
import mapboxgl from 'mapbox-gl'
import $ from 'jquery'
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

class Map extends React.Component {
  constructor() {
    super()
    this.markers = []
    this.clickFunction = this.clickFunction.bind(this)
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/orjon/cjszbpgdy2pqm1fqkzvggasjm',
      center: { lat: 51, lon: -0.7},
      zoom: 3
    })

    this.setMarkers()
  }

  componentDidUpdate() {
    const currentZoom = this.map.getZoom()
    console.log('zoom: '+ Math.floor(currentZoom+1))
    this.setMarkers()
  }

  setMarkers() {
    this.markers.forEach(marker => marker.remove())
    this.markers = this.props.points.map(location => {
      console.log('Maps.js: ' + location.weatherIcon + ', ' + location.name )
      let icon = ''
      switch (location.weatherIcon) {
        case '01d':
          icon='day'
          break
        case '01n':
          icon='night'
          break
        case '02d':
          icon='cloudy-day-1'
          break
        case '02n':
          icon='cloudy-night-1'
          break
        case '03d':
          icon='cloudy-day-3'
          break
        case '03n':
          icon='cloudy-night-3'
          break
        case '04d':
          icon='cloudy'
          break
        case '04n':
          icon='cloudy'
          break
        case '11d':
          icon='thunder'
          break
        case '11n':
          icon='thunder'
          break
        case '13d':
          icon='snowy-6'
          break
        case '13n':
          icon='snowy-6'
          break


        case '09d':
          icon='rainy-5'
          break
        case '09n':
          icon='rainy-5'
          break
        case '10d':
          icon='rainy-6'
          break
        case '10n':
          icon='rainy-6'
          break

        case '50d':
          icon='snowy-6'
          break

        case '50n':
          icon='snowy-6'
          break

        default:
          icon='cloudy'
      }

      const $marker = $('<img />', { class: 'custom-marker img', id: location.id , src: `./images/${icon}.svg`})


      $marker.on('click', () => this.props.handleIconClick(location.id))

      // const popup = new mapboxgl.Popup({ offset: 25, class: 'popup' })
      //   .setHTML(
      //     `<h2>${location.temp.toFixed(0)}°C</h2>
      //     <h3>${location.name || ''}</h3>
      //     <h4>(${location.latlng[0].toFixed(2)},${location.latlng[1].toFixed(2)})</h4>`
      //   )

      return new mapboxgl.Marker($marker.get(0))
        .setLngLat({  lat: location.latlng[0], lng: location.latlng[1] })
        // .setPopup(popup)
        .addTo(this.map)
    })
  }

  clickFunction(event) {
    const clicked = event.currentTarget.id
    console.log('clicked',clicked)
  }

  render() {
    return(
      <div className="map" ref={el => this.mapDiv = el} />
    )
  }
}

export default Map
