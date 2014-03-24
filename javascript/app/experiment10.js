
// function to get the states
function getStates() {
    var states;
    $.ajax({
        type: 'GET', 
        dataType: 'json',
        url: "http://api.census.gov/data/2010/sf1?key=085e759f5af7f60d3d9f7ac199d7fbd4a71baf69&get=P0010001,NAME&for=state:*",
        async: false,
        success: function (json) {
            console.log("success");
            states = json;
        },
        error: function (err) {
            console.log("Error: " + err);
        },
        complete: function () {
            console.log("complete");
            //console.log(states);
            popStatesDropDown(states);
        }
    });
}

// to pop states drop down
function popStatesDropDown(states) {
    var sdiv = $("#statesList");
    $('option', sdiv).remove();
    sdiv.append($('<option></option>').text("").val(""));
    var arrayLength = states.length;
    for (var i = 1; i < arrayLength; i++) {
        console.log(states[i][1]);
        sdiv.append($('<option></option>').text(states[i][1]).val(states[i][1]));
    }
};