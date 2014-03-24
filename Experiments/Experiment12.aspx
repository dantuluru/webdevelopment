<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>User Location Using Leaflet.js</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
    <link rel="stylesheet" href="../javascript/leaflet-0.7.2/leaflet.css" />
    <link href="Experiment12.css" rel="stylesheet" />

</head>
<body>
    <div id="header">
        <span><a href="../Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>
    </div> <!-- end header -->
    <br />

    <div style="width: 100%; overflow: hidden;">
        <div id="sidebar">
            <div id="instructions">Click on the map to get the Block #, County and State
            </div>
            <div id="lat-lon">
            </div>
            <div id="loc-info">
            </div>
        </div> <!-- end sidebar -->
        <div id="map"></div>
    </div>  

    <br />

    <div id="footer">
        <span>Copyright &copy; 2014 by Mounika Dantuluru </span>
    </div> <!-- end footer -->
    <script type="text/javascript" src="../javascript/jquery-1.11.0.min.js"></script>
    <script src="../javascript/leaflet-0.7.2/leaflet.js"></script>
    <script src="../javascript/app/experiment12.js"></script>
    <script>
        $(document).ready(function () {
            initPage();
        });
    </script>
</body>
</html>
