<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ProjectOverview</title>
    <link href="../css/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="DocumentStyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container doc-container">
            <div class="doc-wrapper">
                <h1>Project Overview</h1>
                <br />
                <br />
                <h2>Abstract</h2>
                <br />
                <p>
                    US Census Browser is a web application which allows the user to look at the Census data in two different ways, 
            as a plot as well as a raw data table.
                </p>
                <br />
                <h3>Map</h3>
                <p>
                    The user can select a county by dragging a marker onto the required location within the US.
                </p>
                <br />
                <h3>Plot</h3>
                <p>
                    The race and age information at the county level are shown in the plot.
                </p>
                <br />
                <h3>Data Table</h3>
                <p>
                    The race and age information at the tract level with in a county are shown in the raw data table.
                </p>
                <br />
                <br />
            </div>

        </div>
    </form>
</body>
</html>
