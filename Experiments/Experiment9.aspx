<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../javascript/jquery.jqplot.1.0.4r1121/dist/jquery.min.js"></script>
<script type="text/javascript" src="../javascript/jquery.jqplot.1.0.4r1121/dist/jquery.jqplot.min.js"></script>
<script type="text/javascript" src="../javascript/jquery.jqplot.1.0.4r1121/dist/plugins/jqplot.barRenderer.min.js"></script>
<script type="text/javascript" src="../javascript/jquery.jqplot.1.0.4r1121/dist/plugins/jqplot.categoryAxisRenderer.min.js"></script>
<script type="text/javascript" src="../javascript/jquery.jqplot.1.0.4r1121/dist/plugins/jqplot.pointLabels.min.js"></script>
<link rel="stylesheet" type="text/css" href="../javascript/jquery.jqplot.1.0.4r1121/dist/jquery.jqplot.min.css" />
</head>
<body>
    <div><span>Moused Over: </span><span id="info2">Nothing</span></div>
    <div id="chart2" style="margin-top: 20px; margin-left: 20px; width: 300px; height: 300px; position: relative;" class="jqplot-target">
    </div>
    <script>
        $(document).ready(function () {
            var s1 = [2, 6, 7, 10];
            var s2 = [7, 5, 3, 2];
            var ticks = ['a', 'b', 'c', 'd'];

            plot2 = $.jqplot('chart2', [s1, s2], {
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    rendererOptions: {
                        // Set the varyBarColor option to true to use different colors for each bar.
                        // The default series colors are used.
                pointLabels: { show: true },
                        varyBarColor: true
                    }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: ticks
                    }
                }
            });

            $('#chart2').bind('jqplotDataHighlight',
                function (ev, seriesIndex, pointIndex, data) {
                    $('#info2').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
                }
            );

            $('#chart2').bind('jqplotDataUnhighlight',
                function (ev) {
                    $('#info2').html('Nothing');
                }
            );
        });
    </script>
</body>
</html>
