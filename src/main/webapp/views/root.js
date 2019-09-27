define(["jquery",
        "underscore",
        "component/component",
        "component/functions",
        "view/header",
        "view/signUp",
        "view/login",
        "view/newsfeed",
        "view/newsarea",
        "view/article",
        "view/footer",
        "text!template/root.html"],
    function ($, _, component,
              functions,
              HeaderView,
              SignUpView,
              LoginView,
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
                "click #headerSport": "showSportNews",
                "click #headerWeather": "showWeatherNews",
                "click #headerPolitic": "showPoliticNews",
                "click #headerCulture": "showCultureNews",
                "click #headerOther": "showOtherNews",
                "click #headerSignUp": "showSignUpPage",
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
                let contentView = new NewsFeedView();
                this.addSubView(contentView, "#content");
                contentView.render();


                //--- Footer ---//
                let footerView = new FooterView();
                this.addSubView(footerView, "#footer");
                footerView.render();
            },

            changeContent: function(view, argument) {
                let contentView = view;
                this.addSubView(contentView, "#content");
                contentView.render(argument);
            },

            showSignUpPage: function () {
                this.changeContent(new SignUpView());
            },

            showLoginPage: function () {
                this.changeContent(new LoginView());
            },

            showNewsfeed: function () {
                this.changeContent(new NewsFeedView());
            },

            showSportNews: function () {
                this.changeContent(new NewsAreaView(), "sport");
            },

            showWeatherNews: function () {
                this.changeContent(new NewsAreaView(), "weather");
            },

            showPoliticNews: function () {
                this.changeContent(new NewsAreaView(), "politic");
            },

            showCultureNews: function () {
                this.changeContent(new NewsAreaView(), "culture");
            },

            showOtherNews: function () {
                this.changeContent(new NewsAreaView(), "other");
            }

        });
        return rootView;
    });
