define(["jquery"], function ($) {

    let objectNews = {

        title: undefined,
        type: undefined,
        img: undefined,
        link: undefined,
        content: undefined,

        getNewsFeedLook: function () {
            let html = "" +
                "<div class='newsbox' style='background-image: url(" + this.img + ")'>" +
                "   <a href='" + this.link + "'>" +
                "       <div class='dark-folie'>" +
                "           <p class='title'>" + this.title + "</p>" +
                "           <p class='type'>" + this.type + "</p>" +
                "       </div>" +
                "   </a>" +
                "</div>";

            return html;
        },


        //TODO create html dom for article page
        getArticlePageLook: function () {
            let html = "<div class='articlePageLook'></div>";
        }
    };
    return objectNews;
});