define(["jquery", "underscore", "component/component", "text!template/header.html"],
    function ($, _, component, template) {

        let headerView = component.extend({

            componentID: "header",
            template: _.template(template),
            init: function () {

            },
            render: function () {
                component.prototype.render.call(this);
            }


        });
        return headerView;
    });