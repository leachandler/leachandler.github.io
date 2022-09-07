const locations = [
    {label:'NASA Jet Propulsion Laboratory, CA', lat:34.2013081, lon:-118.1735884},
    {label:'San Luis Obispo, CA', lat:35.2724749, lon:-120.7420586},
    {label:'Boulder, CO', lat:40.0292887, lon:-105.3101887},
    {label:'Seattle, WA', lat:47.6129428, lon:-122.4824894}
];
const n = locations.length;

const map = new google.maps.Map(document.getElementById('map'), {zoom: 4});
const infowindow = new google.maps.InfoWindow();

var latSum = 0;
var lonSum = 0;
for (let i = 0; i < n; i++) {
    const label = locations[i].label;
    const lat = locations[i].lat;
    const lon = locations[i].lon;
    const position = new google.maps.LatLng(lat, lon);
    const marker = new google.maps.Marker({position: position,map: map});
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(label);
            infowindow.open(map, marker);
        }
    })(marker, i));
    latSum += lat;
    lonSum += lon;
};

const centerLat = latSum / n;
const centerLon = lonSum / n;
map.setCenter(new google.maps.LatLng(centerLat,centerLon));
