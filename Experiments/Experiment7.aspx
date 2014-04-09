<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Experiment7.aspx.cs" Inherits="Experiments_Experiment7" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Google Maps</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
    <style>
        #map_canvas {
            margin-left: auto;
            margin-right: auto;
            width: 700px;
            height: 400px;
        }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script>
        function initialize() {
            var map_canvas = document.getElementById('map_canvas');
            var map_options = {
                center: new google.maps.LatLng(34.89, -88.5463),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(map_canvas, map_options)
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <span><a href="../Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>
        </div>
        <br /><br /><br />
        <div>
            <h4>Google Maps</h4>
            <p>This is an experiment using JavaScript to embed Google Maps into my website</p>
        </div><br />
        <div>
            <div id="map_canvas"></div>
        </div>
        <br /><br />
        <div id="footer">
            <span>Copyright &copy; 2014 by Mounika Dantuluru </ span>
        </div>
    </form>
</body>
</html>
