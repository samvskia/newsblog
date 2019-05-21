$(function () {
    $.ajax({
        url: "templates/newsfeed.html",
        dataType: "html",
        success: function (data) {
            $("#content").html(data);
        }
    });


});