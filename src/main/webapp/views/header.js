$(function () {
    $.ajax({
        url: "templates/header.html",
        dataType: "html",
        success: function (data) {
            $("#header").html(data);
        }
    });

    //--- Events -------------------------------
    $("#buttonHome, #buttonSport").click(function () {
        alert("he");
        $.ajax({
            type: "GET",
            url: "templates/newsfeed.html",
            dataType: "html",
            success: function (data) {
                $("#content").html(data);
            }
        });
    });

    $(".newsbox").click(function () {
        $.ajax({
            type: "GET",
            url: "templates/article.html",
            dataType: "html",
            success: function (data) {
                $("#content").html(data);
            }
        });
    });
});