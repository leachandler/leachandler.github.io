const locations = [
    {label:'NASA Jet Propulsion Laboratory, CA', lat:34.2013081, lon:-118.1735884},
    {label:'San Luis Obispo, CA', lat:35.2724749, lon:-120.7420586},
    {label:'Boulder, CO', lat:40.0292887, lon:-105.3101887},
    {label:'Seattle, WA', lat:47.6129428, lon:-122.4824894}
];
const n = locations.length;

let map = new google.maps.Map(document.getElementById('map'), {zoom: 4});
const infowindow = new google.maps.InfoWindow();

var latSum = 0;
var lonSum = 0;
for (i = 0; i < n; i++) {
    const label = locations[i].label;
    const lat = locations[i].lat;
    const lon = locations[i].lon;
    const latlon = new google.maps.LatLng(lat, lon);
    const marker = new google.maps.Marker({position: latlon, map: map});
    marker.addListener('click', () => {
        infowindow.setContent(label);
        infowindow.open(map, marker);
    });
    latSum += lat;
    lonSum += lon;
};

const centerLat = latSum / n;
const centerLon = lonSum / n;
map.setCenter(new google.maps.LatLng(centerLat,centerLon));

function showPosition(position) {
    const label = 'You Are Here'
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const latlon = new google.maps.LatLng(lat, lon);
    const marker = new google.maps.Marker({position: latlon, map: map});
    marker.addListener('click', () => {
        infowindow.setContent(label);
        infowindow.open(map, marker);
    });
    infowindow.setContent(label);
    infowindow.open(map, marker);
    locationResult.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon + "<br>Timestamp:" + position.timestamp;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationResult.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            locationResult.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            locationResult.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            locationResult.innerHTML = "An unknown error occurred."
            break;
    }
}

function addCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationResult.innerHTML = "Geolocation is not supported by this browser.";
    }
}

let locationResult = document.getElementById("locationResult");
let button = document.getElementById("addMyLocationButton");
button.addEventListener("click", () => {
    addCurrentPosition();
})
