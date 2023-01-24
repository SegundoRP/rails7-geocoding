import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {

  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;
    this.map = new mapboxgl.Map({
      container: this.element, // container ID (puede ser map ahhi tmb ya que es el id del container)
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
    });

    this.#addMarkersToMap();
    this.#fitMarkersToMap();
  }

  // agrega marcadores de tus coordenadas en el mapa
  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .addTo(this.map);
    });
  };

  // te posiciona la vista en el mapa (mas cerca)
  #fitMarkersToMap() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  };
}
