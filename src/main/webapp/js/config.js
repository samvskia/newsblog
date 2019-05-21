require.config({
    deps: ["main"],
    baseUrl: "js",
    paths: {
        //Libraries
        jquery: "libraries/jquery-3.3.1.min",
        underscore: "libraries/underscore-min",
        text: "libraries/text",
        bootstrap: "libraries/bootstrap/bootstrap.min",

        //Directories
        view: "../views",
        template: "../templates"
    }

});