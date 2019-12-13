//calling the web api to collect some data about the user
var res;
function getMockData(userName) {
    var obj = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
        markers: [
            {
                lat: 50.505,
                lng: -0.09,
                text: "first destination"
            },
            {
                lat: 50.555,
                lng: -0.08,
                text: "second destination"
            },
            {
                lat: 50.465,
                lng: -0.12,
                text: "third destination"
            }
        ]
    };
     return obj;
}

var urlParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
console.log(urlParams);

if(urlParams.length < 1) {
    alert("something wrong with the parameters in the url, please check!");
}
else {
    urlParams.forEach(element => {
        var param = element.split('=');
        if(param.length == 2) {
            if(param[0] === "userName") {
                // console.log(param[1]);
                res = getMockData(param[1]);
                console.log(res);
            }
            else {
                console.log("in else 1");
            }
        }
        else {
            console.log("in else 2");
        }
    });
}
// console.log(userName);
// var res = getDataMock()


var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11'
}).addTo(mymap);

// L.marker([51.5, -0.09]).addTo(mymap)
//     .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

// L.circle([51.508, -0.11], 500, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(mymap).bindPopup("I am a circle.");

// L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap).bindPopup("I am a polygon.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);