define(["jquery",
        "underscore",
        "component/component",
        "view/header",
        "view/newsfeed",
        "view/article",
        "view/footer",
        "text!template/root.html"],
    function ($, _, component,
              HeaderView,
              NewsFeedView,
              ArticleView,
              FooterView,
              template) {

        let rootView = component.extend({

            componentID: "root",
            el: "body",
            template: _.template(template),
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
                if (false) {
                    contentView = new ArticleView();
                } else {
                    contentView = new NewsFeedView();
                }
                this.addSubView(contentView, "#content");
                contentView.render();


                //--- Footer ---//
                let footerView = new FooterView();
                this.addSubView(footerView, "#footer");
                footerView.render();
            }


        });
        return rootView;
    });