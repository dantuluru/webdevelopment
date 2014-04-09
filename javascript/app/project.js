var plot = null;
var plot_data = null;
var grid = null;
var global_loc = null;
var marker = null;
var races = ["White", "Black or African American",
                "American Indian and Alaska Native", "Asian", 
                "Native Hawaiian and Other Pacific Islander", 
                "Some other race", 
                "Two or more races"]

function initializePage() {
    initializeTabs();

    var map = initializeMap();
    setupMapEvents(map);
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
            global_loc = loc_info
            popLocInfo(loc_info);
            getCensusData(loc_info.Block.FIPS);
        }
    });
}

// function to set the location info in the sidebar
function popLocInfo(loc_info) {
    //console.log(loc_info);
    var sdiv = $('#loc-info');
    $('p', sdiv).remove();
    sdiv.append($('<p class="loc-text">Block: ' + loc_info.Block.FIPS + '</p>'));
    sdiv.append($('<p class="loc-text">County: ' + loc_info.County.name + '</p>'));
    sdiv.append($('<p class="loc-text">State: ' + loc_info.State.name + '</p>'));
}

// function to get the csnus data for the county and state by tracts
function getCensusData(fips) {
    // console.log(fips);
    var state_code = fips.substring(0, 2);
    var county_code = fips.substring(2, 5);
    // console.log(state_code + ", " + county_code);

    //var result;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://api.census.gov/data/2010/acs5",
        data: { get: "B02001_001E,B02001_002E,B02001_003E,B02001_004E,B02001_005E,B02001_006E,B02001_007E,B02001_008E",
            for: "tract:*",
            in: "state:" + state_code + "+county:" + county_code,
            key: "085e759f5af7f60d3d9f7ac199d7fbd4a71baf69"
        },
        async: false,
        success: function (json) {
            //console.log("success");
            plot_data = json;
        },
        error: function (err) {
            console.log("Error: " + err);
        },
        complete: function () {
            //console.log("complete");
            //console.log(plot_data);
        }
    });
}

// function to initialize tabs
function initializeTabs() {
    $("#tabs").tabs({
        activate: function (evt, ui) {
            //console.log(ui.newPanel[0].id);
            if (ui.newPanel[0].id === "tabs-plot") {
                drawPlot();
            } else if (ui.newPanel[0].id === "tabs-datatable") {
                loadGrid();
            }
        }
    });
}

function drawPlot() {
    var summarized_data = [];
    var num_var = 8;
    for (var j = 0; j < num_var; j++) {
        summarized_data.push(0);
    }

    if (plot_data != null) {
        var plot_title = "Population by Race for " + global_loc.County.name + " County, " + global_loc.State.name + " State";
        for (var i = 1; i < plot_data.length; i++) {
            for (var j = 0; j < num_var; j++) {
                summarized_data[j] += parseInt(plot_data[i][j]);
            }
        }
    }
    var s1 = summarized_data.slice(1, 8);
    var ticks = races;

    $.jqplot.sprintf.thousandsSeparator = ','; // Thousand separator

    if (plot === null) {
        plot = $.jqplot('plot', [s1], {
            title: {
                text: plot_title,   // title for the plot,
                show: true,
            },
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: -30,
                    fontSize: '10pt'
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks,
                    label:'Race',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                },
                yaxis: {
                    tickOptions: { formatString: "%'.0f" },
                    label:'Population',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                }
            },
            highlighter: { show: false }
        });
    } else {
        for (var i = 0; i < plot.series[0].data.length; i++) {
            plot.series[0].data[i][1] = summarized_data[i+1];
        }
        plot.title.text = plot_title;
        plot.replot();
    }

}

// function to initialize a map
function initializeMap() {
    var map = L.map('map');
    map.locate({ setView: true, maxZoom: 8 });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

// function to set up map events
function setupMapEvents(map) {
    map.on('click', function (e) {
        //var curPos = e.latlng;
        //var sdiv = $('#lat-lon');
        //$('p', sdiv).remove();
        //sdiv.append($('<p class="ltln-text"> Lat, Lon: ' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));

        //// Get fips, county and state
        //getLocInfo(curPos);
    });

    map.on('locationfound', function (e) {
        //console.log("Location Found");
        var radius = e.accuracy / 2;
        marker = L.marker(e.latlng,
            { draggable: true }
            )
            .addTo(map)
        marker.on('dragend', markerDrag);
            //.bindPopup("You are within " + radius + " meters from this point").openPopup();
        //L.circle(e.latlng, radius).addTo(map);
    });

    map.on('locationerror', function (e) {
        //console.log("Location Not Found");
        map.setView(new L.LatLng(42.340081, -71.089215), 16);
        marker = L.marker(new L.LatLng(42.340081, -71.089215),
            { draggable: true }
            )
            .addTo(map)
        marker.on('dragend', markerDrag);
    });

    map.on('mousemove', function (e) {
        //console.log(e.latlng);
        var curPos = e.latlng;
        var sdiv = $('#lat-lon');
        $('p', sdiv).remove();
        sdiv.append($('<p class="ltln-text">Lat, Lon: ' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));
    });
}

// function when marker is dragged
function markerDrag(event) {
    //console.log(event);
    var curPos = event.target._latlng;
    var sdiv = $('#lat-lon');
    $('p', sdiv).remove();
    sdiv.append($('<p class="ltln-text"> Lat, Lon: ' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));

    // Get fips, county and state
    getLocInfo(curPos);
}

function loadGrid() {
    var num_var = 8;
    var gkeys = ['r_tract', 'r_w', 'r_b', 'r_ai', 'r_as', 'r_nh', 'r_oth', 'r_two'];
    
    var gnames = ["Tract #", "White", "Black or African American",
                "American Indian and Alaska Native", "Asian",
                "Native Hawaiian and Other Pacific Islander",
                "Some other race",
                "Two or more races"];
    var gdata = [];
    if (plot_data != null) {
        for (var i = 1; i < plot_data.length; i++) {
            rdata = {};
            $.each(gkeys, function (x, val) {
                //rdata[val] = parseInt(plot_data[i][x]);
                rdata[val] = plot_data[i][x];
            });
            gdata.push(rdata);
        }
    }

    if (plot_data != null) {
        var caption = "Population by Race by Tract ( " + global_loc.County.name + " County, " + global_loc.State.name + " State )";
        if (grid === null) {
            grid = $("#datagrid").jqGrid({
                data: gdata,
                datatype: 'local',
                width: 800,
                height: 480,
                colNames: gnames,
                colModel: [
                    { name: 'r_tract', sortable: true, sorttype: 'int', align: 'right', width: 100 },
                    { name: 'r_w', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0}, width: 100 },
                    { name: 'r_b', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 },
                    { name: 'r_ai', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 },
                    { name: 'r_as', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 },
                    { name: 'r_nh', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 },
                    { name: 'r_oth', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 },
                    { name: 'r_two', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 }
                ],
                pager: '#pager', //set your pager div id
                viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
                caption: "",
                hoverrows: false,
                loadComplete: function () {
                    $("#datagrid").trigger("reloadGrid");
                },
                beforeSelectRow: function (rowid, e) {
                    return false;
                },
            });
            grid.jqGrid('setCaption', caption);
        } else {
            $('#datagrid').jqGrid('setGridParam', { data: gdata }).trigger('reloadGrid');
            grid.jqGrid('setCaption', caption);
        }
    }
}