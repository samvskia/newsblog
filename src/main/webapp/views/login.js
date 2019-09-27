define(["jquery", "underscore", "component/component", "component/functions", "text!template/login.html"],
    function ($, _, component, functions, template) {

        let LoginView = component.extend({

            componentID: "login",

            el: "#content",

            template: _.template(template),

            init: function () {},

            render: function () {
                let view = this;
                component.prototype.render.call(view);


            }

        });
        return LoginView;
    });
