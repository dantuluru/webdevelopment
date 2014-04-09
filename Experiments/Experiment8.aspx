<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Experiment with JSONP</title>
    <link href="../CSS/Home.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="header">
            <span><a href="../Default.aspx" target="_blank">Mounika Dantuluru's Website</a></span>

        </div>
        <br /><br /><br />
        <div>
            <h4>Search For Movie</h4>
            <p>
                This is an experiment demonstrating JSONP where the data is fetched from http://www.rottentomatoes.com/
                <br />
                Enter any movie name and it displays the list of movies matching with the entered text.<br />
                Once the list of movies are displayed if you click on the poster of the movie it displays
                the movie name and a thumbnail of the movie.
            </p>
            <div class="container display-movie-container">
                <input type="text" placeholder="Enter Movie Name" class="get-movie-name" style="width: 500px;" />
                <input style="margin: 20px;" type="button" value="Search" class="get-movies" />

                <div class="row display-movie-row">
                    <div class="col-md-8">
                        <ul class="display-movie" style="list-style: none;"></ul>
                    </div>
                </div>
            </div>

            <div class="movie-details container" style="margin: 15px; display: none;">
            </div>

        </div>
        <br /><br />
        <div id="footer">
            <span>Copyright &copy; 2014 by Mounika Dantuluru </ span>
        </div>
    </form>
</body>
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script>
    $(function () {
        $(".get-movies").click(getMovieName);
    });

    function getMovieName() {
        console.log("here");
        var name = $(".get-movie-name").val();

        $.ajax({
            url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=w8gq5hg4c2r4zcc7kktq5r66&q=" + name + "&page_limit=10",
            dataType: "jsonp",
            success: function (response) {
                $(".display-movie").empty();
                var ul = $(".display-movie");
                for (var i = 0; i < response.movies.length; i++) {
                    var img = $("<img>").attr("src", response.movies[i].posters.original)
                                        .attr("id", i)
                                        .attr("data-placement", "right")
                                        .attr("class", "img-popover")
                                        .on('click', response, click_pressed)
                                        .css({
                                            width: 200,
                                            height: 200,
                                            margin: 20
                                        });

                    var div = $("<div>").append(img)
                    $("<li>").append(div)
                             .appendTo(ul);
                }
            }
        });
    }

    function click_pressed(response) {
        $(".display-movie-row").css('display', 'none');
        $(".movie-details").css('display', 'table')
                           .append($("<img>").attr('src', response.data.movies[response.target.id].posters.thumbnail),
                                   $("<h3>").html(response.data.movies[response.target.id].title));
    }
</script>

</html>
