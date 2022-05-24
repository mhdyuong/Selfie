// hide the mapbox key
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWhkeXVvbmciLCJhIjoiY2wza2J0ZzR3MDIxYTNncXM4cmR4eGJiYiJ9.yCcGaQcLp3G4KcBrgbuo1g`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWhkeXVvbmciLCJhIjoiY2wza2J0ZzR3MDIxYTNncXM4cmR4eGJiYiJ9.yCcGaQcLp3G4KcBrgbuo1g'
}).addTo(map);

if ('geolocation' in navigator){
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = long;
        });
} 
else{
    console.log('geolocation not available');
} 