const baseUrl = "http://localhost:5000/";
var _username;
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

function getMockData(username) {
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
function getViewData(username) {
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        url: baseUrl + "api/views/" + username,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            markersData = data;
            showData(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText);
        }
    });
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

function getSharedViews(username) {
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        url: baseUrl + "api/sharedviews/" + username,
        success: function (data, textStatus, jqXHR) {
            console.log("shared views", data);
            sharedViews = data;
            displaySharedViewsList(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText);
        }
    });
}
// 


function showData(data) {

    markersHolder.forEach(m => {
        mymap.removeLayer(m);
    });

    if(data == null) return;

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
                    _username = param[1];
                    // markersData = getMockData(_username);
                    getViewData(_username);
                    // console.log("markersData", markersData);
                    // setTimeout(function() {
                    //     showData(markersData);
                    // }, 2000);
                    
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

    // console.log("marker info ", markersData.markers[index]);
    $.ajax({
        contentType: 'application/json',
        type: "PUT",
        url: baseUrl + "api/markers/" + markersData.markers[index].id,
        data: JSON.stringify(markersData.markers[index]),
        success: function (data, textStatus, jqXHR) {
            console.log(jqXHR.responseText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText);
        }
    });
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

    console.log("in save map");
    console.log("center", mapCenter);
    console.log("zoom", mapZoom);

    // call a web api to store this data
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: baseUrl + "api/views",
        data: JSON.stringify({
            username: _username,
            lat : mapCenter.lat,
            lng : mapCenter.lng,
            zoom : mapZoom
        }),
        success: function (data, textStatus, jqXHR) {
            console.log(jqXHR.responseText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText);
        }
    });

 }

function shareMapView(userName) {

    // find all the markers inside of the view
    var tempMarkerData = {};
    tempMarkerData.sender = _username;
    tempMarkerData.reciever = userName;
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
    console.log("tempmarkerData", tempMarkerData);

    // send this array of markers and username to the web api
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: baseUrl + "api/views/sharemapview",
        data: JSON.stringify(tempMarkerData),
        success: function (data, textStatus, jqXHR) {
            alert("successful");
            console.log(jqXHR.responseText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.statusText);
            console.log(jqXHR.statusText);
        }
    });
}

$("#shareBtn").click(function(event) {
    // alert("share clicked");
    var username = $("#userNameForShare").val();
    if(username == "")
        alert("Please enter a username");
    // console.log("username", username);
    else
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
    // sharedViews = getMockSharedViews();
    getSharedViews(_username);
    // console.log(sharedViews);
    
}

function displaySharedViewsList(sharedViews) {
    var modalBody = $("#unorder-list");
    modalBody.empty();
    sharedViews.forEach(item => {
        modalBody.append( `
                            <a href="" id="${item.id}" class="list-group-item">
                                ${item.sender}
                            </a>
                        `);
    });
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
    console.log("markerData", markersData);
    markersData.markers.push(markerTempData);

    
    tempMarkerForCreation = undefined;

    mymap.closePopup();

    // send the created marker to web api
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        url: baseUrl + "api/markers/" + _username,
        data: JSON.stringify(markerTempData),
        success: function (data, textStatus, jqXHR) {
            console.log(jqXHR.responseText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText);
        }
    });
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