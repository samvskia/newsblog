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
            let html = "" +
                "<div class='newsbox'>" +
                "   <div class='newsLink' article-id='" + this.id + "'>" +
                "       <img class='newsbox-image' src='" + this.img + "'>" +
                "       <div class='dark-folie'>" +
                "           <p class='title'>" + this.title + "</p>" +
                "           <p class='type'>" + this.type + "</p>" +
                "       </div>" +
                "   </div>" +
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
