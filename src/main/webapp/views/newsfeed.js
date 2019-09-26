define(["jquery", "underscore", "component/component", "model/modelNews", "text!template/newsfeed.html"],
    function ($, _, component, modelNews, template) {

        let contentView = component.extend({

            componentID: "newsfeed",

            el: "#content",

            template: _.template(template),

            init: function () {},

            render: function () {
                let view = this;
                component.prototype.render.call(view);

                $.ajax({
                    type: "GET",
                    url: "/newsblog/rest/json/getArticleList",
                    dataType: "json",
                    success: function (json) {
                        for (let i = 0; i < json.length; i++) {
                            let news = modelNews;
                            news.id = json[i].id;
                            news.title = json[i].title;
                            news.type = json[i].type;
                            news.img = json[i].img;
                            news.link = json[i].link;
                            news.date = json[i].date;
                            news.author = json[i].author;

                            view.$('#newsfeed').append(news.getNewsFeedLook());
                        }
                    }
                });

            }

        });
        return contentView;
    });
