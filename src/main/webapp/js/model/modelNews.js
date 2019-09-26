define(["jquery"], function ($) {

    let objectNews = {

        id: undefined,
        title: undefined,
        author: undefined,
        date: undefined,
        type: undefined,
        img: undefined,
        link: undefined,
        content: undefined,

        getNewsFeedLook: function () {
            this.link = "?page=article" +
                "&type=" + this.type +
                "&id=" + this.id;

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


        getArticlePageLook: function () {
            let html = "" +
                "<div class='articlePageLook'>" +
                "   <p class='title'>" + this.title + "</p>" +
                "   <p class='author'>By " + this.author + "</p>" +
                "   <p class='date'>" + this.date + "</p>" +
                "   <p class='type'>" + this.type + "</p>" +
                "   <img class='image' src='" + this.img + "'>" +
                "   <p class='text'>" + this.content + "</p>" +
                "</div>";
            return html;
        }
    };
    return objectNews;
});
