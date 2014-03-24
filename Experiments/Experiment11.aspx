<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Location Using Leaflet.js</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
    <link rel="stylesheet" href="../javascript/leaflet-0.7.2/leaflet.css" />
    <style>
        #map {
            height: 500px;
        }
    </style>
</head>
<body>
    <div id="header">
        <span><a href="../Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>

    </div>
    <br />
    <br />
    <div>
        <div id="map">
        </div>
    </div>
    <br />
    <br />
    <br />
    <div id="footer">
        <span>Copyright &copy; 2014 by Mounika Dantuluru </span>
    </div>
    <script type="text/javascript" src="../javascript/jquery-1.11.0.min.js"></script>
    <script src="../javascript/leaflet-0.7.2/leaflet.js"></script>
    <script src="../javascript/app/experiment11.js"></script>
    <script>
        $(document).ready(function () {
            initMap();
        });
    </script>
</body>
</html>
