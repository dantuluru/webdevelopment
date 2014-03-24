<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Get States Using JSON</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <span><a href="../Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>

        </div>
        <br />
        <br />
        <br />
        <div>
            <h4>Get States Using JSON</h4>
            <p>
                This is an experiment demonstrating JSON where the data is fetched from us census bureau 
                <br />
                Where all the states are fetched in a order to the drop down list
            </p>
        </div><br />
        <div>
            <div id="states-list-div">
                <select id="statesList" runat="server">
                </select>
            </div>
        </div><br />
        <div>
            <p>
                This experiment will be used in my project to fetch all the states in USA.
            </p>
        </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div id="footer">
            <span>Copyright &copy; 2014 by Mounika Dantuluru </span>
        </div>
    </form>
    <script type="text/javascript" src="../javascript/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="../javascript/app/experiment10.js"></script>
    <script>
        $(document).ready(function () {
            getStates();
        });
    </script>
</body>
</html>
