define(["jquery", "underscore", "component/component", "component/functions", "text!template/signUp.html"],
    function ($, _, component, functions, template) {

        let signUpView = component.extend({

            componentID: "signUp",

            el: "#content",

            template: _.template(template),

            init: function () {},

            render: function () {
                let view = this;
                component.prototype.render.call(view);


            }

        });
        return signUpView;
    });
