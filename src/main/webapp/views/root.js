define(["jquery",
        "underscore",
        "component/component",
        "component/functions",
        "view/header",
        "view/newsfeed",
        "view/newsarea",
        "view/article",
        "view/footer",
        "text!template/root.html"],
    function ($, _, component,
              functions,
              HeaderView,
              NewsFeedView,
              NewsAreaView,
              ArticleView,
              FooterView,
              template) {

        let rootView = component.extend({

            componentID: "root",

            el: "body",

            template: _.template(template),

            events: {
                "click #headerLogo1p": "showNewsfeed",
                "click #headerLogo2p": "showNewsfeed",
                "click #headerHome": "showNewsfeed",
                "click #headerSport": "showNewsfeed",
                "click #headerWeather": "showNewsfeed",
                "click #headerPolitic": "showNewsfeed",
                "click #headerCulture": "showNewsfeed",
                "click #headerOther": "showNewsfeed",
                "click #headerRegister": "showRegisterPage",
                "click #headerLogin": "showLoginPage",
            },

            init: function () {

            },

            render: function () {
                component.prototype.render.call(this);


                //--- Header ---//
                let headerView = new HeaderView();
                this.addSubView(headerView, "#header");
                headerView.render();


                //--- Content ---//
                let contentView = undefined;
                if (functions.getUrlVariables()["page"] === "article") {
                    contentView = new ArticleView();
                } else if (functions.getUrlVariables()["page"] === "newsarea") {
                    contentView = new NewsAreaView();
                } else {
                    contentView = new NewsFeedView();
                }
                this.addSubView(contentView, "#content");
                contentView.render();


                //--- Footer ---//
                let footerView = new FooterView();
                this.addSubView(footerView, "#footer");
                footerView.render();
            },

            showNewsfeed: function (){
                console.log("a");
            },

            showRegisterPage: function () {
                console.log("b");
            },

            showLoginPage: function () {
                console.log("c");
            }

        });
        return rootView;
    });
