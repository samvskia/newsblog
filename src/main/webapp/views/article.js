define(["jquery", "underscore", "component/component", "text!template/article.html"],
    function ($, _, component, template) {

        let contentView = component.extend({

            componentID: "article",
            template: _.template(template),
            init: function () {

            },
            render: function () {
                component.prototype.render.call(this);


            }


        });
        return contentView;
    });