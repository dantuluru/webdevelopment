<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Experiment2.css" rel="stylesheet" />
    <link href="../CSS/Home.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <span><a href="Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>
        </div>

        <br />

        <div>
            <h2>Experiment 2:Hover Effect</h2>
            <p>Place the cursor on the image to see the hover effect</p>
            <img src="../images/jfitz_cards/jb.gif" id="img"/>
        </div>
        <br />
        <div id="hov-div">
            place the cursor on me to see hover effect
        </div>
        <br />
        <div>
            <h4>About this experiment:</h4>
            <p>In this experiment hover selector is used to select items when we are using a mouse</p>
        </div>
    </form>
    <div id="footer">
	    <span>Copyright &copy; 2014 by Mounika Dantuluru</span>
    </div>
</body>
</html>
