import {toArray} from "../utils";
import L from "leaflet";
import marker from "../../assets/svg/pin.svg";
import markerShadow from "../../assets/marker-shadow.png";
import markerOG from "../../assets/marker-icon-2x.png";

let myIcon = L.icon({
	iconSize: [24, 36],        // [width, height]
	iconAnchor: [12, 36],      // Bottom center of the icon
	popupAnchor: [0, -36],
    iconUrl: marker,
	shadowUrl: markerShadow
})

export class CustomLeaflet {
    constructor(selector = ".wp-block-wb-map") {
        this._blockEls = toArray(selector);


        if(!this._blockEls) return;

        this._blockEls.forEach((location) => {

            const lat = location.dataset.lat;
            const long = location.dataset.long;
            const popup = location.dataset.popup;

            this._initializeMap(location, lat, long, popup);
        })
    }


    _initializeMap(blockEl, lat, lng, popup) {
        const map = L.map(blockEl).setView([lat, lng], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        if(!popup) {
            const marker = L.marker([lat, lng]).addTo(map).openPopup();

        } else {
            const marker = L.marker([lat, lng], {icon: myIcon} ).addTo(map);
            marker.bindPopup(`<address>${popup}</address>`).openPopup();
        }


    }
}
