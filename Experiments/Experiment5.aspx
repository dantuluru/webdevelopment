<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Experiment5.aspx.cs" Inherits="Experiments_Experiment5" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>Experiment 5</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" />
    <script src="//code.jquery.com/jquery-1.9.1.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
    <script>
        $(function () {
            $("#tabs").tabs();
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <span><a href="Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>
        </div>
        <br />
        <br />
        <div>
            <h3>Experiment 5: JQuery Tabs</h3>
        </div>
        <br />
        <br />
        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">Tab 1</a></li>
                <li><a href="#tabs-2">Tab 2</a></li>
                <li><a href="#tabs-3">Tab 3</a></li>
            </ul>
            <div id="tabs-1">
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div id="tabs-2">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.</p>
            </div>
            <div id="tabs-3">
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
            </div>
        </div>
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <div id="footer">
            <span>Copyright &copy; 2014 by Mounika Dantuluru</span>
        </div>
    </form>
</body>
</html>
