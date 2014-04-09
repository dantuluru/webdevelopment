<%@ Page Language="C#" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="javascript/jquery-ui-1.10.4.custom/css/smoothness/jquery-ui-1.10.4.custom.min.css" />
    <link rel="stylesheet" type="text/css" href="javascript/jquery.jqplot.1.0.8r1250/dist/jquery.jqplot.min.css" />
    <link rel="stylesheet" type="text/css" href="javascript/jquery.jqGrid-4.6.0/css/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="javascript/leaflet-0.7.2/leaflet.css" />
    <link rel="stylesheet" type="text/css" href="css/project.css" />

    <title>Geospatial Application</title>
</head>
 
<body>
    <div id="wrapper">
	    <div id="header-container">
            <div id="header">
                <div id="nav-menu">
                    <!--<ul class="nav-menu-list">
                        <li class="nav-menu-list-item"><a href="#">Create</a></li>
                    </ul> <!-- end nav-menu-list -->
                </div><!-- end nav-menu -->
                <div id="nav-login">
                    <!--<ul class="nav-login-list">
                        <li class="nav-login-list-item"><button id="login-btn" type="submit">Login</button></li>
                        <li class="nav-login-list-item"><button id="logout-btn" type="submit">Logout</button></li>
                    </ul> <!-- end nav-login-list -->
                </div><!-- end nav-login -->
            </div> <!-- end header -->
        </div> <!-- end header-container -->

        <div id="main-container">
            <div id="sidebar">
                <div id="instructions">
                    <p>Drag the blue marker on the map to any point to get the Block #, County and State</p>
                    <p>Selected County population by race is shown in plot tab and data tab</p>
                </div>
                <div id="lat-lon">
                </div>
                <div id="loc-info">
                </div>
            </div> <!-- end sidebar -->

            <div id="content">
                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-map">Map</a></li>
                        <li><a href="#tabs-plot">Plot</a></li>
                        <li><a href="#tabs-datatable">Data</a></li>
                    </ul>
                    <div id="tabs-map">
                        <div id="map"></div>
                    </div>
                    <div id="tabs-plot">
                        <div id="plot"></div>
                    </div>
                    <div id="tabs-datatable">
                        <table id="datagrid"></table>
                        <div id="pager"></div>
                    </div>
                    </div>
            </div> <!-- end content -->
        </div> <!-- end main-container-->
    </div>

    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/jquery.min.js"></script>
    <script type="text/javascript" src="javascript/underscore-min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/jquery.jqplot.min.js"></script>
    <script type="text/javascript" src="javascript/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.pieRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.dateAxisRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.canvasTextRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.canvasAxisLabelRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.categoryAxisRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.barRenderer.min.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.pointLabels.min.js"></script>
    <script type="text/javascript" src="javascript/leaflet-0.7.2/leaflet.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqGrid-4.6.0/plugins/ui.multiselect.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqGrid-4.6.0/js/i18n/grid.locale-en.js"></script>
    <script type="text/javascript" src="javascript/jquery.jqGrid-4.6.0/js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="javascript/app/project.js"></script>
    <script>
        $(document).ready(function () {
            initializePage();
        });
    </script>

</body>
</html>