define(["jquery"],
    function ($) {
        let Functions = {

            /**
             * Get URL Parameter from address bar
             * Usage: var number = getUrlVariables()["x"];
             * */
            getUrlVariables: function () {
                let variables = {};
                let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                    variables[key] = value;
                });
                return variables;
            },

            /**
             * Get URL Parameter from address bar, if it not exist take default value
             * Usage: var number = getUrlParameters('x','10');
             * */
            getUrlParameters: function (parameter, defaultValue) {
                let urlParameter = defaultValue;
                if (window.location.href.indexOf(parameter) > -1) {
                    urlParameter = Functions.getUrlVariables()[parameter];
                }

                return urlParameter;
            }
        };

        return Functions;
    });
