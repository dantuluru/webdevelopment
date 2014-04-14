<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="DocumentStyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
     <div class="doc-wrapper">
        <h1>APIs and Libraries</h1>
        <br />
        <h3>Leaflet.js and Open Street Map</h3>
        <p>
            Leaflet.js along with Open Street Map provides a users latitude and longitude information when a user drags the blue marker to any 
            location.
        </p>
        <br />
        <h3>data.fcc.gov</h3>
        <p>
            We use one of the features of data.fcc.gov's api, which takes a user's latitude and longitude information and 
            returns the FIPS code, County and State information for that location.
        </p>
        <br />
        <h3>api.census.gov</h3>
        <p>
            The FIPS code, has the following information in it. The state code, county code and tract code. We use the state code and county code 
            to query the census API to get the raw data at the tract level for the selected county and state. This raw data is then aggregated as 
            required to make the plots and populate the tables.
        </p>
    </div>
    </form>
</body>
</html>
