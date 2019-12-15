// initializing the map
var tempMarkerForCreation;
var mapCenter;
var mapZoom;
var markersData;
var markersHolder = [];
var sharedViews = [];

var mymap = L.map('mapid').setView([41.505, -1.09], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11'
}).addTo(mymap);

//calling the web api to collect some data about the user

function getMockData(userName) {
    var obj = {
        lat: 51.505,
        lng: -0.09,
        zoom: 12,
        markers: [
            {
                id: "1",
                lat: 51.505,
                lng: -0.09,
                text: "first destination"
            },
            {
                id: "2",
                lat: 51.555,
                lng: -0.08,
                text: "second destination"
            },
            {
                id: "3",
                lat: 51.465,
                lng: -0.12,
                text: "third destination"
            }
        ]
    };
     return obj;
}

function getMockSharedViews() {
    var list = [
        {
            id: "1",
            sender: "ali",
            reciever: "hamed",
            lat: 51.505,
            lng: -0.09,
            zoom: 12,
            markers: [
                {
                    id: "1",
                    lat: 51.505,
                    lng: -0.09,
                    text: "first destination"
                },
                {
                    id: "2",
                    lat: 51.555,
                    lng: -0.08,
                    text: "second destination"
                },
                {
                    id: "3",
                    lat: 51.465,
                    lng: -0.12,
                    text: "third destination"
                }
            ]
        },
        {
            id: "222",
            sender: "vali",
            reciever: "hamed",
            lat: 51.505,
            lng: -0.09,
            zoom: 12,
            markers: [
                {
                    id: "1",
                    lat: 51.505,
                    lng: -0.09,
                    text: "first destination"
                },
                {
                    id: "2",
                    lat: 51.555,
                    lng: -0.08,
                    text: "second destination"
                }
            ]
        }
    ];
    return list;
}

// 


function showData(data) {

    markersHolder.forEach(m => {
        mymap.removeLayer(m);
    });

    mymap.flyTo([data.lat, data.lng], data.zoom, {
        animate: true,
        duration: 2 // in seconds
    });
    data.markers.forEach(m => {
        /** start customize popup **/
        //var customPopup = "Mozilla Toronto Offices<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
        // var customPopup = `<input type="text" value="${m.text}">`;
        var customPopup = `<div id="${m.id}">
                            <textarea name="Description" cols="40" rows="5">${m.text}</textarea>
                            <br />
                            <button id="${m.id}-save" type="button">save</button>
                            <button id="${m.id}-cancel" type="button">cancel</button>
                            </div>`;
            
        // specify popup options 
        var customOptions =
            {
            'maxWidth': '500'
            }
        /** end customize popup **/

        var tempMarker = L.marker([m.lat, m.lng]).addTo(mymap);

        tempMarker.bindPopup(customPopup,customOptions);

        markersHolder.push(tempMarker);
    });
    
}

function loadHome() {
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
                    markersData = getMockData(param[1]);
                    console.log(markersData);
                    setTimeout(function() {
                        showData(markersData);
                    }, 2000);
                    
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
}

// console.log(userName);
// var res = getDataMock()


// var popup = L.popup();

function onMapClick(e) {
    // popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(mymap);

    var marker = createMarker(e.latlng);
    
    
}

mymap.on('click', onMapClick);


/* Helper Functions */





function createMarker(latlng){
    // generate a unique id
    var id = generateUniqueId();


    var customPopup = `<div id="${id}">
                        <textarea name="Description" cols="40" rows="5">new marker</textarea>
                        <br />
                        <button id="${id}-create" type="button">create</button>
                        <button id="${id}-discard" type="button">discard</button>
                        </div>`;
    // specify popup options 
    var customOptions =
    {
        closeButton: false,
        closeOnClick: false,
        'maxWidth': '500'
    }

    var tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(mymap);
    tempMarker.bindPopup(customPopup,customOptions).openPopup();
    // markersHolder.push(tempMarker);

    // console.log("temp marker creation", tempMarkerForCreation);
    if(tempMarkerForCreation != undefined){
        mymap.removeLayer(tempMarkerForCreation);
        tempMarkerForCreation= tempMarker;
        // console.log("temp marker create", tempMarkerForCreation)
    }
    else {
        tempMarkerForCreation = tempMarker;
        // console.log("in else", tempMarkerForCreation);
    }
}

function updateMarker(index)
{
    // console.log("index", index);
    // console.log("result.markers", result.markers);

    var tempMarker = markersHolder[index];
    var m = markersData.markers[index];
    var customPopup = `<div id="${m.id}">
                        <textarea name="Description" cols="40" rows="5">${m.text}</textarea>
                        <br />
                        <button id="${m.id}-save" type="button">save</button>
                        <button id="${m.id}-cancel" type="button">cancel</button>
                        </div>`;
        
    // specify popup options 
    var customOptions =
    {
        'maxWidth': '500'
    }
    /** end customize popup **/

    tempMarker.bindPopup(customPopup,customOptions);
}


function generateUniqueId() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

mymap.on('moveend', function(e) {

    saveMapView(mymap.getCenter(), mymap.getZoom());
    
 });

 function saveMapView(center, zoom) {
    mapCenter = center;
    mapZoom = zoom;

    // call a web api to store this data
 }

function shareMapView(userName) {

    // find all the markers inside of the view
    var tempMarkerData = {};
    tempMarkerData.lat = mymap.getCenter().lat;
    tempMarkerData.lng = mymap.getCenter().lng;
    tempMarkerData.zoom = mymap.getZoom();
    tempMarkerData.markers = [];

    // console.log("lat", tempMarkerData.lat);
    // console.log("lng", tempMarkerData.lng);
    // console.log("zoom", tempMarkerData.zoom);

    markersHolder.forEach(m => {
        
        if(mymap.getBounds().contains(m.getLatLng())){
            // console.log("markers lat lng", m.getLatLng());
            var temp = markersData.markers.filter(mrk =>  mrk.lat == m.getLatLng().lat 
                                            && mrk.lng == m.getLatLng().lng);
            // console.log("temp", temp);
            tempMarkerData.markers.push(temp[0]);
        }
    });
    // console.log(tempMarkerData);

    // send this array of markers and username to the web api
}

$("#shareBtn").click(function(event) {
    // alert("share clicked");
    var username = $("#userNameForShare").val();
    // console.log("username", username);
    shareMapView(username);
});

$("#loadBtn").click(function(event) {
    loadSharedViews();
});

$("#homeBtn").click(function(event) {
    loadHome();
});

function loadSharedViews() {
    // get the list of shared views from web api or mock data
    sharedViews = getMockSharedViews();
    console.log(sharedViews);

    // display the list
    var modalBody = $("#unorder-list");
    modalBody.empty();
    sharedViews.forEach(item => {
        modalBody.append( `
                            <a href="#" id="${item.id}" class="list-group-item">
                                ${item.sender}
                            </a>
                        `);
    });

    // markersHolder.forEach(m => {
    //     mymap.removeLayer(m);
    // });

}

$(document).on('click', 'a', function (e) {
    // var row_num = $element.index() + 1;
    console.log(e.target.id);
    console.log(sharedViews);
    $("#myModal .close").click();
    var view = sharedViews.filter(view => view.id == e.target.id)[0];
    console.log("view", view);
    showData(view);
});

/* button click handlers */
$(document).on('click',"button[id$='-save']",function() {
    // alert("button");
    // console.log(this.id);
    var id = this.id.slice(0, this.id.indexOf("-save"));

    var txt = $("#"+id).find('textarea[name="Description"]').val();
    // console.log(txt);

    console.log(markersData);
    // var temp = result.markers.filter(x => x.id == id)[0];
    // temp.text = txt;
    // console.log(result);
    // console.log("markers", markersHolder);

    for(var index = 0; index < markersData.markers.length; index++){
        if(markersData.markers[index].id == id){
            markersData.markers[index].text = txt;
            updateMarker(index);
            break;
        }
    }

    mymap.closePopup();
});

$(document).on('click',"button[id$='-cancel']",function(){
    // alert("cancel");
    mymap.closePopup();
});

$(document).on('click',"button[id$='-create']",function(){

    var id = this.id.slice(0, this.id.indexOf("-create"));

    var txt = $("#"+id).find('textarea[name="Description"]').val();

    var customPopup = `<div id="${id}">
                        <textarea name="Description" cols="40" rows="5">${txt}</textarea>
                        <br />
                        <button id="${id}-save" type="button">save</button>
                        <button id="${id}-cancel" type="button">cancel</button>
                        </div>`;
        
    // specify popup options 
    var customOptions =
    {
        'maxWidth': '500'
    }

    tempMarkerForCreation.bindPopup(customPopup,customOptions);
    // console.log(txt);
    markersHolder.push(tempMarkerForCreation);
    var markerTempData = {
        id: id,
        lat: tempMarkerForCreation.getLatLng().lat,
        lng: tempMarkerForCreation.getLatLng().lng,
        text: txt
    };
    console.log("markerTempData",markerTempData);
    markersData.markers.push(markerTempData);

    // console.log("markerData", markersData.markers);
    tempMarkerForCreation = undefined;

    mymap.closePopup();
});

$(document).on('click',"button[id$='-discard']",function(){
    // alert("cancel");
    if(tempMarkerForCreation != undefined){
        mymap.removeLayer(tempMarkerForCreation);
        tempMarkerForCreation= undefined;
        // console.log("temp marker create", tempMarkerForCreation)
    }
    
    mymap.closePopup();
});
/* end of button click handlers */

loadHome();