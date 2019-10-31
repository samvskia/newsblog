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
                "click .newsAreaLink": function(event){this.showNewsAreaPage(event)},
                "click #headerSignUp": "showSignUpPage",
                "click #headerLogin": "showLoginPage",
                "click .newsLink": function (event) {this.showArticlePage(event);}
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

            showNewsfeed: function () {
                this.changeContent(new NewsFeedView());
            },

            showSignUpPage: function () {
                this.changeContent(new SignUpView());
            },

            showLoginPage: function () {
                this.changeContent(new LoginView());
            },

            showNewsAreaPage: function (event){
                let newsAreaId = event.originalEvent.path[0].attributes["area-id"].nodeValue;
                this.changeContent(new NewsAreaView(), newsAreaId);
            },

            showArticlePage: function (event) {
                let articleId = event.originalEvent.path[1].attributes["article-id"].nodeValue;
                this.changeContent(new ArticleView(), articleId);
            }

        });
        return rootView;
    });
