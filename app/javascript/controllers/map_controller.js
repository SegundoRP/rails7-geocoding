import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {

  static values = {
    apiKey: String
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;
    this.map = new mapboxgl.Map({
      container: this.element, // container ID (puede ser map ahhi tmb ya que es el id del container)
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
    });
  }
}
