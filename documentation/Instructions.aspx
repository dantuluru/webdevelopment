<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Instructions</title>
    <link href="../css/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="DocumentStyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container doc-container">
            <div class="doc-wrapper">
                <h1>Instructions</h1>
                <br />
                <ol>
                    <li>The user will see a blue marker on the map when the app is loaded</li>
                    <li>The user can find the latitude and longitude of any location by just moving the mouse over the map. The latitude and longitude are updated in the sidebar</li>
                    <li>The user can drag the blue marker to get the census details of a location of interest by dragging the blue marker to the specific location</li>
                    <li>After the blue marker is dragged, the location's Block, County and State are updated in the sidebar</li>
                    <li>The plot for the selected location is shown in the Plot tab as a bar plot</li>
                    <li>The user can also look at the age of the selected county by selecting age from the drop-down in the sidebar</li>
                    <li>The user can look at the raw data for the selected location by going to the Data tab</li>
                    <li>In the Data tab, the raw data by tract is shown in a grid for Race/Age</li>
                    <li>The user can sort the data in the grid by any column by clicking on the column name</li>
                    <li>The data in grid also changes by selecting Race/Age from the drop-down in the sidebar</li>
                </ol>
            </div>
        </div>
    </form>
</body>
</html>
