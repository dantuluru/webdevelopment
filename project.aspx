<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="css/project.css" type="text/css" />
    <link rel="stylesheet" href="javascript/jquery-ui-1.10.4.custom/css/smoothness/jquery-ui-1.10.4.custom.min.css" />
    <link rel="stylesheet" href="javascript/leaflet-0.7.2/leaflet.css" />
    
    <title>Geospatial Application</title>
</head>
 
<body>
    <div id="wrapper">
	    <div id="header-container">
            <div id="header">
                <div id="nav-menu">
                    <ul class="nav-menu-list">
                        <li class="nav-menu-list-item"><a href="#">Create</a></li
                    </ul> <!-- end nav-menu-list -->
                </div><!-- end nav-menu -->
                <div id="nav-login">
                    <ul class="nav-login-list">
                        <li class="nav-login-list-item"><button id="login-btn" type="submit">Login</button></li>
                        <li class="nav-login-list-item"><button id="logout-btn" type="submit">Logout</button></li>
                    </ul> <!-- end nav-login-list -->
                </div><!-- end nav-login -->
            </div> <!-- end header -->
        </div> <!-- end header-container -->

        <div id="main-container">
            <div id="sidebar">
            </div> <!-- end sidebar -->

            <div id="content">
                <ul class='tabs'>
                    <li><a href='#tab-map'>Map</a></li>
                    <li><a href='#tab-graph'>Graph</a></li>
                    <li><a href='#tab-datatable'>Data</a></li>
                </ul>
                <div id='tab-map'>
                    <div id="map"></div>
                </div>
                <div id='tab-graph'>
                </div>
                <div id='tab-datatable'>
                </div>
            </div> <!-- end content -->
        </div> <!-- end main-container-->
    </div>

    <script src="javascript/jquery-1.11.0.min.js"></script>
    <script src="javascript/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js"></script>
    <script src="javascript/leaflet-0.7.2/leaflet.js"></script>
    <script src="javascript/app/project.js"></script>
    <script>
        $(document).ready(function () {
            initPage();
        });
    </script>

</body>
</html>