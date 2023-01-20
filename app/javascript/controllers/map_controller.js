import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  connect() {
    mapboxgl.accessToken = ENV['MAPBOX_API_KEY'];
    this.map = new mapboxgl.Map({
      container: this.element, // container ID (puede ser map ahhi tmb ya que es el id del container)
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      console.log(this.element)
    });
  }
}
