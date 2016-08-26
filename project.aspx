<%@ Page Language="C#" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="javascript/jquery-ui-1.10.4.custom/css/dot-luv/jquery-ui-1.10.4.custom.min.css" />
    <link rel="stylesheet" type="text/css" href="javascript/jquery.jqplot.1.0.8r1250/dist/jquery.jqplot.min.css" />
    <link rel="stylesheet" type="text/css" href="javascript/jquery.jqGrid-4.6.0/css/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="javascript/leaflet-0.7.2/leaflet.css" />
    <link rel="stylesheet" type="text/css" href="css/project.css" />

    <title>US Census Explorer</title>
</head>

<body>
    <div id="wrapper">
	    <div id="header-container">
            <div id="header">
                <span>US Census Explorer</span>
            </div>
        </div>

        <div id="main-container">
            <div id="sidebar">
                <div id="lat-lon">
                    <p class="ltln-text"><strong>Latitude, Longitude</strong></p>
                </div>
                <div id="loc-info">
                    <p class="lcinfo-text"><strong>Block</strong></p>
                    <p class="lcinfo-text"><strong>County</strong></p>
                    <p class="lcinfo-text"><strong>State</strong></p>
                </div>
                <div id="race-or-age-div">
					<label for="race-or-age" id="race-or-age-label"><strong>Select Race or Age:</strong></label>
					<select id="race-or-age" name="race-or-age">
						<option value="race">Race</option>
						<option value="age">Age</option>
					</select>
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
                        <div id="datatable">
                            <table id="datagrid"></table>
                            <div id="pager"></div>
                        </div>    
                    </div>
                </div> <!-- end tabs -->
            </div> <!-- end content -->
        </div> <!-- end main-container-->

        <div id="footer-container">
            <div id="footer">
                <span>Copyright &copy; 2014 by <a href="Default.aspx">Mounika Dantuluru</a></span>
            </div>
        </div>
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
    <script type="text/javascript" src="javascript/jquery.jqplot.1.0.8r1250/dist/plugins/jqplot.enhancedLegendRenderer.min.js"></script>
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