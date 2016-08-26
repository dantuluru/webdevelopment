<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>FutureScope</title>
    <link href="../css/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="DocumentStyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container doc-container">
            <div class="doc-wrapper">
                <h1>Future Scope</h1>
                <br />
                <ol>
                    <li>Allow the users to save locations that are already done. So that when a user logs back in, all the previous 
                scenarios are shown with custom markers indicating that the location was already processed. When the user 
                clicks on the custom marker the data will directly be loaded from the database.
                    </li>
                    <li>Ability to show the data as an overlay on the map using d3 visualizations.</li>
                    <li>Add even more census variables in addition to race and age.</li>
                    <li>Allow users to save the plots as images</li>
                    <li>Allow users to export raw data as excel files</li>
                    <li>Add additional plots like pie charts, scatter plots, etc.</li>
                </ol>
            </div>
        </div>
    </form>
</body>
</html>
