// Initilize the page
function initPage() {
    map = initMap();          // Initializes the map
    setEvents(map);  // Set the events on the page
}


// function to initialize a map
function initMap() {
    // set up the map
    var map = L.map('map');
    map.locate({ setView: true, maxZoom: 16 });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

// function that sets the events on the page
function setEvents(map) {
    map.on('click', onMapClick);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.on('mousemove', onMouseMove);
}

// Function for mouse click on map
function onMapClick(e) {
    //console.log(e.latlng);
    var curPos = e.latlng;
    var sdiv = $('#lat-lon');
    $('p', sdiv).remove();
    sdiv.append($('<p class="ltln-text"> Lat, Lon: ' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));

    // Get fips, county and state
    getLocInfo(curPos);
}

// Function when the user location is found
function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}

// Function when the user location is not found
function onLocationError(e) {
    map.setView(new L.LatLng(42.340081, -71.089215), 16);
}

// Function which gives map cordinated when mouse moves
function onMouseMove(e) {
    //console.log(e.latlng);
    var curPos = e.latlng;
    var sdiv = $('#lat-lon');
    $('p', sdiv).remove();
    sdiv.append($('<p class="ltln-text">Lat, Lon: ' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));
}

// function to get the location information
function getLocInfo(curPos) {
    var loc_info;
    $.ajax({
        type: 'GET', 
        dataType: 'jsonp',
        url: "http://data.fcc.gov/api/block/find",
        data: { format: 'jsonp', latitude: curPos.lat.toFixed(10), longitude: curPos.lng.toFixed(10), showall: false },
        success: function (json) {
            //console.log("success");
            loc_info = json;
        },
        error: function (err) {
            console.log("Error: " + err);
        },
        complete: function () {
            //console.log("complete");
            popLocInfo(loc_info);
        }
    });
}

// function to set the location info in the sidebar
function popLocInfo(loc_info) {
    var sdiv = $('#loc-info');
    $('p', sdiv).remove();
    sdiv.append($('<p class="loc-text">Block: ' + loc_info.Block.FIPS + '</p>'));
    sdiv.append($('<p class="loc-text">County: ' + loc_info.County.name + '</p>'));
    sdiv.append($('<p class="loc-text">State: ' + loc_info.State.name + '</p>'));
}