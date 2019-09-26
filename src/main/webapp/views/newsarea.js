define(["jquery", "underscore", "component/component", "component/functions", "model/modelNews", "text!template/newsarea.html"],
    function ($, _, component, functions, modelNews, template) {

        let contentView = component.extend({

            componentID: "newsarea",

            el: "#content",

            template: _.template(template),

            init: function () {},

            render: function () {
                let view = this;
                component.prototype.render.call(view);
                let urlParams = functions.getUrlVariables();

                $.ajax({
                    type: "POST",
                    url: "/newsblog/rest/json/getArticleListByType",
                    data: urlParams["type"],
                    contentType: "text/plain; charset=utf-8",
                    cache: false,
                    dataType: "json",
                    success: function (data) {
                        for (let i = 0; i < data.length; i++) {
                            let news = modelNews;
                            news.id = data[i].id;
                            news.title = data[i].title;
                            news.type = data[i].type;
                            news.img = data[i].img;
                            news.link = data[i].link;
                            news.date = data[i].date;
                            news.author = data[i].author;

                            view.$('#newsarea').append(news.getNewsFeedLook());
                        }
                    }
                });

            }

        });
        return contentView;
    });
