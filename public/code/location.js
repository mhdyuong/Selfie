var marker;

function setUp(){
  if ('geolocation' in navigator){
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async (position) => {
          console.log(position);
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          //trying to update the marker if the client moved while the server is in session...still have to click update button
          if (marker){
            map.removeLayer(marker);
          }
          marker = L.marker([lat, long])
          map.addLayer(marker);
          document.getElementById('latitude').textContent = lat;
          document.getElementById('longitude').textContent = long; 
          });
    } 
  else{
      console.log('cannot set up');
   }
  }
setUp();

function sendData(){
if ('geolocation' in navigator){
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        //trying to update the marker if the client moved while the server is in session...still have to click update button
        if (marker){
          map.removeLayer(marker);
        }
        marker = L.marker([lat, long])
        map.addLayer(marker);
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = long; 
        let text = document.getElementById('text').value; // let because I want to change the value of text in some cases
        if (text == ""){
          text = 'No word or phrase was entered.';
        }
        //making the API call
        const data = {lat, long, text};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        const response = await fetch('/api', options); //response is a data stream
        const jsonResponse = await response.json(); //we need to convert it to json
        console.log(jsonResponse);
        //sending the request
        //fetch returns a promise
        });
  } 
else{
    console.log('cannot send');
 }
}

function updateLocation(){
  if ('geolocation' in navigator){
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async (position) => {
          console.log(position);
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          //trying to update the marker if the client moved while the server is in session...still have to click update button
          if (marker){
            map.removeLayer(marker);
          }
          marker = L.marker([lat, long])
          map.addLayer(marker);
          document.getElementById('latitude').textContent = lat;
          document.getElementById('longitude').textContent = long; 
          });
    } 
  else{
      console.log('geolocation not available');
   }
  }
//modules cannot be used in browser javascript???
// https://stackoverflow.com/questions/9901082/what-is-this-javascript-require browser javascript vs node js
var map = L.map('map').setView([0, 0], 1);
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${token}`
}).addTo(map);

var button = document.getElementById('submit');
button.addEventListener('click', function(e){
  sendData();
  console.log("Location updated.");
});

var dataButton = document.getElementById('allData');
dataButton.onclick = function () {
  window.open('all.html');
};

var updateButton = document.getElementById('update');
updateButton.addEventListener('click', function(e){
  updateLocation();
  console.log("Location updated.");
});
