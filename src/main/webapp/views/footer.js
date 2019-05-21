$.ajax({
    url: "templates/footer.html",
    dataType: "html",
    success: function (data) {
        $("#footer").html(data);
    }
});