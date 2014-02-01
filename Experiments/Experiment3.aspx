<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Experiment3.aspx.cs" Inherits="Experiments_Experiment4" %>

<!DOCTYPE html>


<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="utf-8" />
    <title>jQuery UI Sortable - Display as grid</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" />
    <script src="//code.jquery.com/jquery-1.9.1.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
    <link href="../CSS/Home.css" rel="stylesheet" />
    <style>
        #sortable {
            list-style-type: none;
            width: 650px;
            height: 400px;
        }

            #sortable li {
                float: left;
                width: 150px;
                height: 150px;
            }
    </style>
    <script>
        $(function () {
            $("#sortable").sortable();
            $("#sortable").disableSelection();
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <span><a href="Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>

        </div>
        <br /><br />
        <div>

            <ul id="sortable">
                <li class="ui-state-default">
                    <img src="../images/Experiment4/7.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/6.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/3.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/11.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/2.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/12.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/9.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/8.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/4.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/10.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/1.jpg" class="img-responsive" alt="Responsive image" /></li>
                <li class="ui-state-default">
                    <img src="../images/Experiment4/5.jpg" class="img-responsive" alt="Responsive image" /></li>
            </ul>
        </div>
        <br /><br /><br />
        <div><h4>Sort the tiles and form a koala bear</h4></div>
        <div id="footer">
            <span>Copyright &copy; 2014 by Mounika Dantuluruspan>
        </div>
    </form>
</body>
</html>
