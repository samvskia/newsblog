define(["jquery", "underscore", "component/component", "component/functions", "model/modelNews", "text!template/article.html"],
    function ($, _, component, functions, modelNews, template) {

        let contentView = component.extend({

            componentID: "article",

            el: "#content",

            template: _.template(template),

            init: function () {},

            render: function () {
                let view = this;
                component.prototype.render.call(view);
                let urlParams = functions.getUrlVariables();

                $.ajax({
                    type: "POST",
                    url: "/newsblog/rest/json/getArticleById",
                    data: urlParams["id"],
                    contentType: "text/plain; charset=utf-8",
                    cache: false,
                    dataType: "json",
                    success: function (json) {

                        let article = modelNews;
                        article.title = json.title;
                        article.author = json.author;
                        article.date = json.date;
                        article.type = json.type;
                        article.img = json.img;
                        article.content = json.content;

                        view.$('#article').append(article.getArticlePageLook());

                    }
                });
            }


        });
        return contentView;
    });
