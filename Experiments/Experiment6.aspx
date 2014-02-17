<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">
     

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ASP.Net WebForm</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
</head>


<body>

    <form id="Form1" runat="server" action="Experiment6.aspx" method="get">

        <div id="header">
            <span><a href="../Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>

        </div>
        <br /><br /><br />
        <div>
            <p>This is an experiment demonstrating how it takes the user input and displays it using ASP.NET.</p>
        </div><br />
        <div><h4>Demonstration:</h4>
            <p>Enter your First Name and Last Name and hit the submit button which will display your name</p></div><br /><br />
        <div>
        <%
               string FirstName = Request.QueryString["FirstName"];
               string LastName = Request.QueryString["LastName"];  
        %>
        First Name:<br />
        <input type="text" name="FirstName" value="" /><br />
        Last Name:<br />
        <input type="text" name="LastName" value="" /><br />
        <br />
        <input type="submit" value="Submit" class="submit" /><br />
        <b>
            <%=FirstName%>
            <%=LastName%>
            <br />
        </b></div><br /><br /><br /><br /><br /><br /><br />
        <div id="footer">
            <span>Copyright &copy; 2014 by Mounika Dantuluru </ span>
        </div>
    </form>
</body>
</html>
