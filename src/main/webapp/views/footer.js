define(["jquery", "underscore", "component/component", "text!template/footer.html"],
    function ($, _, component, template) {

        let footerView = component.extend({

            componentID: "footer",
            el: "#footer",
            template: _.template(template),
            init: function () {

            },
            render: function () {
                component.prototype.render.call(this);
            }


        });
        return footerView;
    });