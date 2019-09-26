define(["jquery", "underscore", "component/component", "model/modelNews", "text!template/article.html"],
    function ($, _, component, modelNews, template) {

        let contentView = component.extend({

            componentID: "article",

            el: "#content",

            template: _.template(template),

            init: function () {},

            render: function () {
                let view = this;
                component.prototype.render.call(view);

                $.ajax({
                    type: "GET",
                    url: "data/article.json",
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