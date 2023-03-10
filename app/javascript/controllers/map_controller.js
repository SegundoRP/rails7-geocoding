import { Controller } from "@hotwired/stimulus"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

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
    // para el search
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                        mapboxgl: mapboxgl }))
  }

  // agrega marcadores de tus coordenadas en el mapa
  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window)

       // Create a HTML element for your custom marker
      const customMarker = document.createElement("div")
      customMarker.innerHTML = marker.marker_html

      new mapboxgl.Marker(customMarker)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup) // para el pop up quye aparece con la info de cada marker
        .addTo(this.map); // lo agrega al map
    });
  };

  // te posiciona la vista en el mapa (mas cerca)
  #fitMarkersToMap() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ])) //  this.markersValue[0]['end_lng'],this.markersValue[0]['end_lat'] agregar las otras coord de segunda direecion
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  };
}
