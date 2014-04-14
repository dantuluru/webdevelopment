/* Global variables */
var plot = null;
var plot_category = null;
var census_age_data = null;
var census_race_data = null;
var race_data_summarized = null;
var age_data_raw = null;
var age_data_summarized_male = null;
var age_data_summarized_female = null;
var plot_data = null;
var grid = null;
var global_loc = null;
var marker = null;
var races = ["White", "Black or African American",
                "American Indian and Alaska Native", "Asian",
                "Native Hawaiian and Other Pacific Islander",
                "Some other race",
                "Two or more races"];
var age_groups = ["0-9","10-19","20-29","30-39","40-49","50-59","60-69","70-79","80 and over"];

// function to initialize page
function initializePage() {
    initializeTabs();

    var map = initializeMap();
    setupMapEvents(map);
    setEvents();
}

function setEvents() {
    // race ar age selection
    $('#race-or-age').change(function () {
        //console.log("change in race or age");
        drawPlot();
        loadGrid();
    });
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
            global_loc = loc_info;
            popLocInfo(loc_info);
            if (loc_info.Block.FIPS == null) {
                global_loc = null;
                clearPlotGrid();
            } else {
                getCensusData(loc_info.Block.FIPS);
            }
        }
    });
}

// function to clear plot and grid
function clearPlotGrid() {
    if (plot != null) {
        plot.destroy();
        plot = null;
    }
    if (grid != null) {
        $("#datagrid").jqGrid('GridUnload');
    }
}

// function to set the location info in the sidebar
function popLocInfo(loc_info) {
    //console.log(loc_info);
    var sdiv = $('#loc-info');
    $('p', sdiv).remove();
    if (loc_info.Block.FIPS == null) {
        sdiv.append($('<p class="lcinfo-text"><strong>Block</strong></p>'));
        sdiv.append($('<p class="lcinfo-text"><strong>County</strong></p>'));
        sdiv.append($('<p class="lcinfo-text"><strong>State</strong></p>'));
        sdiv.append($('<p class="msg-text">Select a location with in US</p>'));
    }
    else {
        sdiv.append($('<p class="lcinfo-text"><strong>Block</strong></p>'));
        sdiv.append($('<p class="lcinfo-text">' + loc_info.Block.FIPS + '</p>'));
        sdiv.append($('<p class="lcinfo-text"><strong>County</strong></p>'));
        sdiv.append($('<p class="lcinfo-text">' + loc_info.County.name + '</p>'));
        sdiv.append($('<p class="lcinfo-text"><strong>State</strong></p>'));
        sdiv.append($('<p class="lcinfo-text">' + loc_info.State.name + '</p>'));
    }
}

// function to get the csnus data for the county and state by tracts
function getCensusData(fips) {
    // console.log(fips);
    var state_code = fips.substring(0, 2);
    var county_code = fips.substring(2, 5);
    // console.log(state_code + ", " + county_code);

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://api.census.gov/data/2010/acs5",
        data: {
            get: "B02001_001E,B02001_002E,B02001_003E,B02001_004E,B02001_005E,B02001_006E,B02001_007E,B02001_008E",
            for: "tract:*",
            in: "state:" + state_code + "+county:" + county_code,
            key: "085e759f5af7f60d3d9f7ac199d7fbd4a71baf69"
        },
        async: false,
        success: function (json) {
            //console.log("success");
            plot_data = json;
            census_race_data = json;
        },
        error: function (err) {
            console.log("Error in getting race data");
            console.log(err);
        },
        complete: function () {
            //console.log("complete");
            //console.log(census_race_data);
            generateRaceDataStructures();
        }
    });

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://api.census.gov/data/2010/acs5",
        data: {
            get:    "B01001_001E,B01001_002E,B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_007E,B01001_008E,B01001_009E," +
                    "B01001_010E,B01001_011E,B01001_012E,B01001_013E,B01001_014E,B01001_015E,B01001_016E,B01001_017E,B01001_018E," +
                    "B01001_019E,B01001_020E,B01001_021E,B01001_022E,B01001_023E,B01001_024E,B01001_025E," +
                    "B01001_026E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001_031E,B01001_032E,B01001_033E," +
                    "B01001_034E,B01001_035E,B01001_036E,B01001_037E,B01001_038E,B01001_039E,B01001_040E,B01001_041E,B01001_042E," +
                    "B01001_043E,B01001_044E,B01001_045E,B01001_046E,B01001_047E,B01001_048E,B01001_049E",
            for: "tract:*",
            in: "state:" + state_code + "+county:" + county_code,
            key: "085e759f5af7f60d3d9f7ac199d7fbd4a71baf69"
        },
        async: false,
        success: function (json) {
            //console.log("success");
            census_age_data = json;
        },
        error: function (err) {
            console.log("Error in getting age data");
            console.log(err);
        },
        complete: function () {
            //console.log("complete");
            console.log(census_age_data);
            generateAgeDataStructures();
        }
    });
}

// function to generate the data structures for all the plots and tables by race
function generateRaceDataStructures() {
    var num_race_var = 8;
    race_data_summarized = [];
    for (var i = 0; i < num_race_var; i++) {
        race_data_summarized.push(0);
    }

    for (var i = 1; i < census_race_data.length; i++) {
        for (var j = 0; j < num_race_var; j++) {
            race_data_summarized[j] += parseInt(census_race_data[i][j]);
        }
    }
    //console.log(race_data_summarized);

    var num_var = 8;
    var gkeys = ['r_tract', 'r_w', 'r_b', 'r_ai', 'r_as', 'r_nh', 'r_oth', 'r_two'];

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
}

// function to generate the data structures for all the plots and tables by age
function generateAgeDataStructures() {
    var num_age_var_by_sex = 10;

    // Initialize the array of arrays to 0
    age_data_raw = new Array();
    for (var i = 0; i < census_age_data.length; i++) {
        age_data_raw[i] = new Array();
        for (var j = 0; j < 18; j++) {
            age_data_raw[i][j] = 0;
        }
    }
    age_data_summarized_male = [];
    age_data_summarized_female = [];
    for (var i = 0; i < num_age_var_by_sex; i++) {
        age_data_summarized_male.push(0);
        age_data_summarized_female.push(0);
    }

    for (var i = 1; i < census_age_data.length; i++) {
        age_data_summarized_male[0] += parseInt(census_age_data[i][1]);         // Total, male
        age_data_summarized_female[0] += parseInt(census_age_data[i][25]);      // Total, male
        for (var j = 2, k = 26; j <= 3; j++, k++) {                              // 0-9, (male, female)
            age_data_raw[i - 1][0] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][1] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[1] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[1] += parseInt(census_age_data[i][k]);
        }
        for (var j = 4, k = 28; j <= 6; j++, k++) {                             // 10-19, (male, female)
            age_data_raw[i - 1][2] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][3] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[2] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[2] += parseInt(census_age_data[i][k]);
        }
        for (var j = 7, k = 31; j <= 10; j++, k++) {                             // 20-29, (male, female)
            age_data_raw[i - 1][4] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][5] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[3] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[3] += parseInt(census_age_data[i][k]);
        }
        for (var j = 11, k = 35; j <= 12; j++, k++) {                             // 30-39, (male, female)
            age_data_raw[i - 1][6] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][7] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[4] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[4] += parseInt(census_age_data[i][k]);
        }
        for (var j = 13, k = 37; j <= 14; j++, k++) {                             // 40-49, (male, female)
            age_data_raw[i - 1][8] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][9] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[5] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[5] += parseInt(census_age_data[i][k]);
        }
        for (var j = 15, k = 39; j <= 16; j++, k++) {                             // 50-59, (male, female)
            age_data_raw[i - 1][10] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][11] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[6] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[6] += parseInt(census_age_data[i][k]);
        }
        for (var j = 17, k = 41; j <= 20; j++, k++) {                             // 60-69, (male, female)
            age_data_raw[i - 1][12] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][13] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[7] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[7] += parseInt(census_age_data[i][k]);
        }
        for (var j = 21, k = 45; j <= 22; j++, k++) {                             // 70-79, (male, female)
            age_data_raw[i - 1][14] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][15] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[8] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[8] += parseInt(census_age_data[i][k]);
        }
        for (var j = 23, k = 47; j <= 24; j++, k++) {                             // 80 and over, (male, female)
            age_data_raw[i - 1][16] += parseInt(census_age_data[i][j]);
            age_data_raw[i - 1][17] += parseInt(census_age_data[i][k]);
            age_data_summarized_male[9] += parseInt(census_age_data[i][j]);
            age_data_summarized_female[9] += parseInt(census_age_data[i][k]);
        }
    }
    //console.log(age_data_raw);
    //console.log(age_data_summarized_male);
    //console.log(age_data_summarized_female);
}

// function to initialize tabs
function initializeTabs() {
    $("#tabs").tabs({
        activate: function (evt, ui) {
            //console.log(ui.newPanel[0].id);
            if (global_loc != null) {
                if (ui.newPanel[0].id === "tabs-plot") {
                    drawPlot();
                } else if (ui.newPanel[0].id === "tabs-datatable") {
                    loadGrid();
                }
            }
        }
    });
}

// function which call the appropriate plot function based on race or age drop down selection
function drawPlot() {
    // Get the current selection from race or age drop down
    var selVal = $("#race-or-age :selected").text();

    if (selVal === "Race") {
        plot_category = "Race";
        drawRacePlot();
    } else {
        plot_category = "Age";
        drawAgePlot();
    }
}

// function to draw the race plot
function drawRacePlot() {
    if (global_loc != null) {
        var plot_title = "Population by Race for " + global_loc.County.name + " County, " + global_loc.State.name + " State";
    }

    var s1 = race_data_summarized.slice(1, 8);
    var ticks = races;

    $.jqplot.sprintf.thousandsSeparator = ','; // Thousand separator

    if (plot != null) {
        plot.destroy();
        plot = null;
    }

    if (plot === null) {
        plot = $.jqplot('plot', [s1], {
            title: {
                text: plot_title,   // title for the plot,
                show: true,
            },
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                pointLabels: { show: true },
                rendererOptions: {
                    barPadding: 2,
                    barMargin: 10,
                    shadowOffset: 0
                }
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
            series: [
                { color: '#f35901' },
            ],
            highlighter: { show: false }
        });
    } else {
        for (var i = 0; i < plot.series[0].data.length; i++) {
            plot.series[0].data[i][1] = race_data_summarized[i+1];
        }
        plot.title.text = plot_title;
        plot.replot({ resetAxes: true });
    }
}

// function to draw the age plot
function drawAgePlot() {
    if (global_loc != null) {
        var plot_title = "Population by Age, Sex for " + global_loc.County.name + " County, " + global_loc.State.name + " State";
    }

    var s_male = age_data_summarized_male.slice(1, 10);
    var s_female = age_data_summarized_female.slice(1, 10);
    var ticks = age_groups;

    $.jqplot.sprintf.thousandsSeparator = ','; // Thousand separator

    if (plot != null) {
        plot.destroy();
        plot = null;
    }

    if (plot === null) {
        plot = $.jqplot('plot', [s_male, s_female], {
            //stackSeries: true,
            title: {
                text: plot_title,   // title for the plot,
                show: true,
            },
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                pointLabels: { show: true },
                rendererOptions: {
                    barPadding: 2,
                    barMargin: 10,
                    shadowOffset: 0,
                }
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
                    label: 'Age',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                },
                yaxis: {
                    tickOptions: { formatString: "%'.0f" },
                    label: 'Population',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                }
            },
            series: [
                { color: '#de000c' },
                { color: '#f4a227' },
            ],
            legend: {
                renderer: $.jqplot.EnhancedLegendRenderer, show: true, location: 'nw',
                placement: 'insideGrid', rendererOptions: { numberRows: 1 },
                labels: ["Male", "Female"]
            },
            highlighter: { show: false }
        });
    } else {
        for (var i = 0; i < plot.series[0].data.length; i++) {
            plot.series[0].data[i][1] = age_data_summarized_male[i + 1];
            plot.series[1].data[i][1] = age_data_summarized_female[i + 1];
        }
        plot.title.text = plot_title;
        plot.replot({ resetAxes: true });
    }
}

// function to initialize a map
function initializeMap() {
    var map = L.map('map');
    map.setView(new L.LatLng(39.70, -95.20), 4);
    map.locate();
    //map.locate({ setView: true, maxZoom: 8 });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

// function to set up map events
function setupMapEvents(map) {
    map.on('locationfound', function (e) {
        //console.log("Location Found");
        var radius = e.accuracy / 2;
        marker = L.marker(e.latlng,
            { draggable: true }
            )
            .addTo(map)
            .bindPopup("<p class='popup-text'>Drag the blue marker on the map to any point to get the Block #, County and State</p>").openPopup();
        marker.on('dragend', markerDrag)
    });

    map.on('locationerror', function (e) {
        marker = L.marker(new L.LatLng(42.340081, -71.089215),
            { draggable: true }
            )
            .addTo(map)
            .bindPopup("<p class='popup-text'>Drag the blue marker on the map to any point to get the Block #, County and State</p>").openPopup();
        marker.on('dragend', markerDrag);
    });

    map.on('mousemove', function (e) {
        //console.log(e.latlng);
        var curPos = e.latlng;
        var sdiv = $('#lat-lon');
        $('p', sdiv).remove();
        sdiv.append($('<p class="ltln-text"><strong>Latitude, Longitude</strong></p>'));
        sdiv.append($('<p class="ltln-text">' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));
    });
}

// function when marker is dragged
function markerDrag(event) {
    //console.log(event);
    var curPos = event.target._latlng;
    var sdiv = $('#lat-lon');
    $('p', sdiv).remove();
    sdiv.append($('<p class="ltln-text"><strong>Latitude, Longitude</strong></p>'));
    sdiv.append($('<p class="ltln-text">' + curPos.lat.toFixed(6) + ', ' + curPos.lng.toFixed(6) + '</p>'));

    // Get fips, county and state
    getLocInfo(curPos);
}

// function which call the appropriate load grid function based on race or age drop down selection
function loadGrid() {
    // Get the current selection from race or age drop down
    var selVal = $("#race-or-age :selected").text();

    if (selVal === "Race") {
        plot_category = "Race";
        loadRaceGrid();
    } else {
        plot_category = "Age";
        loadAgeGrid();
    }
}

// function to load the race grid
function loadRaceGrid() {
    if (grid != null) {
        $("#datagrid").jqGrid('GridUnload');
    }

    if (census_race_data != null) {
        var gkeys = ['r_tract', 'r_w', 'r_b', 'r_ai', 'r_as', 'r_nh', 'r_oth', 'r_two'];

        var gnames = ["Tract #", "White", "Black or African American",
                    "American Indian and Alaska Native", "Asian",
                    "Native Hawaiian and Other Pacific Islander",
                    "Some other race",
                    "Two or more races"];
        var gdata = [];
        for (var i = 1; i < census_race_data.length; i++) {
            rdata = {};
            $.each(gkeys, function (x, val) {
                if (val == "r_tract") {
                    rdata[val] = census_race_data[i][10];
                } else {
                    rdata[val] = census_race_data[i][x];
                }
            });
            gdata.push(rdata);
        }

        var caption = "Population by Race by Tract ( " + global_loc.County.name + " County, " + global_loc.State.name + " State )";
        grid = $("#datagrid").jqGrid({
            data: gdata,
            datatype: 'local',
            width: 800,
            height: 480,
            colNames: gnames,
            colModel: [
                { name: 'r_tract', sortable: true, sorttype: 'int', align: 'right', width: 100 },
                { name: 'r_w', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 100 },
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
            beforeSelectRow: function (rowid, e) {
                return false;
            }
        });
        grid.jqGrid('setCaption', caption);
        $('#datagrid').jqGrid('setGridParam', { data: gdata }).trigger('reloadGrid');
    }
}

// function to load the age grid
function loadAgeGrid() {
    if (grid != null) {
        $("#datagrid").jqGrid('GridUnload');
    }

    if (census_age_data != null) {
        var gkeys = ['r_tract', 'r_m_0_9', 'r_f_0_9', 'r_m_10_19', 'r_f_10_19', 'r_m_20_29', 'r_f_20_29', 'r_m_30_39', 'r_f_30_39',
                    'r_m_40_49', 'r_f_40_49', 'r_m_50_59', 'r_f_50_59', 'r_m_60_69', 'r_f_60_69', 'r_m_70_79', 'r_f_70_79', 'r_m_80', 'r_f_80'];

        //var gnames = ["Tract #", "0-9", "0-9", "10-19", "10-19", "20-29", "20-29", "30-39", "30-39", "40-49", "40-49",
        //                "50-59", "50-59", "60-69", "60-69", "70-79", "70-79", ">= 80", ">= 80"];
        var gnames = ["Tract #", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female",
                        "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female"];
        var gdata = [];
        for (var i = 1; i < census_age_data.length; i++) {
            rdata = {};
            $.each(gkeys, function (x, val) {
                if (val == "r_tract") {
                    rdata[val] = census_age_data[i][51];
                } else {
                    rdata[val] = age_data_raw[i-1][x-1];
                }
            });
            gdata.push(rdata);
        }

        var caption = "Population by Age by Sex by Tract ( " + global_loc.County.name + " County, " + global_loc.State.name + " State )";
        grid = $("#datagrid").jqGrid({
            data: gdata,
            datatype: 'local',
            width: 975,
            height: 480,
            colNames: gnames,
            colModel: [
                { name: 'r_tract', sortable: true, sorttype: 'int', align: 'right', width: 75 },
                { name: 'r_m_0_9', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_0_9', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_10_19', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_10_19', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_20_29', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_20_29', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_30_39', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_30_39', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_40_49', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_40_49', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_50_59', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_50_59', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_60_69', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_60_69', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_70_79', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_70_79', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_m_80', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 },
                { name: 'r_f_80', sortable: true, sorttype: 'int', align: 'right', formatter: 'number', formatoptions: { decimalPlaces: 0 }, width: 50 }
            ],
            pager: '#pager', //set your pager div id
            viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
            caption: "",
            hoverrows: false,
            beforeSelectRow: function (rowid, e) {
                return false;
            }
        });
        grid.jqGrid('setCaption', caption);
        $("#datagrid").jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
            groupHeaders: [
                { startColumnName: 'r_tract', numberOfColumns: 1, titleText: 'Age ->' },
                { startColumnName: 'r_m_0_9', numberOfColumns: 2, titleText: '0-9' },
                { startColumnName: 'r_m_10_19', numberOfColumns: 2, titleText: '10-19' },
                { startColumnName: 'r_m_20_29', numberOfColumns: 2, titleText: '20-29' },
                { startColumnName: 'r_m_30_39', numberOfColumns: 2, titleText: '30-39' },
                { startColumnName: 'r_m_40_49', numberOfColumns: 2, titleText: '40-49' },
                { startColumnName: 'r_m_50_59', numberOfColumns: 2, titleText: '50-59' },
                { startColumnName: 'r_m_60_69', numberOfColumns: 2, titleText: '60-69' },
                { startColumnName: 'r_m_70_79', numberOfColumns: 2, titleText: '70-79' },
                { startColumnName: 'r_m_80', numberOfColumns: 2, titleText: '>= 80' }
            ]
        });
        $('#datagrid').jqGrid('setGridParam', { data: gdata }).trigger('reloadGrid');
    }
}