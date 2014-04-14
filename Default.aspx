<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    
<title>Welcome To Mounika's Website</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/bootstrap-theme.min" rel="stylesheet">

    <link href="css/Home.css" rel="stylesheet">
 
</head>

<body>

<div id="header">
   <span><a href="Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>
</div>

<br />

<div class="container">
    <div class="row">
        <div class="col-md-2">
            <div class="well">
                <ul class="nav nav-list">
                    <li><a href="story/index.htm?../Experiments/story.txt" target="_blank">Experiments</a></li>
                    <li><a href="project.aspx" target="_blank">Project</a></li>
                    <li><a href="story/index.htm?../documentation/story.txt" target="_blank">Project Documentation</a></li>
                    <li><a href="blog/" target="_blank">Blog</a></li>
                    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                    <li><a href="statistics/" target="_blank">Statistics</a></li>
                    <li><a href="source/" target="_blank">Source</a></li>
                    <li><a href="search/" target="_blank">Search</a></li>
                    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                    <li><a href="textview/" target="_blank">TextView</a></li>
                    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                </ul>
             </div>         
        </div><!--col-md-2-->

        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4">
                <img src="images/mounika/mounika.jpg" class="img-responsive" alt="Responsive image"/>
		    </div>

		    <div class="col-md-4">
			    <h2>Welcome!!</h2>
                <p>My name is Mounika Dantuluru.I am a graduate student of Computer Science at Northeastern University.This website is being developed as a part of the course CS5610 : Web Development  </p>
                <p>Visit again for more updates!!</p>
		    </div>

            <div class="col-md-2">
                <span style="display: block !important; width: 180px; text-align: center; font-family: sans-serif; font-size: 12px;">
                    <a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:02101.1.99999&bannertypeclick=wu_simpleblack" title="Boston, Massachusetts Weather Forecast" target="_blank">
                        <img src="http://weathersticker.wunderground.com/weathersticker/cgi-bin/banner/ban/wxBanner?bannertype=wu_simpleblack&airportcode=KBOS&ForcedCity=Boston&ForcedState=MA&zip=02101&language=EN" alt="Find more about Weather in Boston, MA" width="160" />
                    </a>
                </span>
            </div>

        </div>  
        </div>
    </div><!--row-->
</div><!--container-->

<div id="footer">
	<span>Copyright &copy; 2014 by Mounika Dantuluru</span>
</div>

</body>
</html>
