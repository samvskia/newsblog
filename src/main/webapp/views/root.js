define(["jquery",
        "underscore",
        "component/component",
        "view/header",
        "view/newsfeed",
        "view/footer",
        "text!template/root.html"],
    function ($, _, component,
              HeaderView,
              NewsFeedView,
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

                let headerView = new HeaderView();
                this.addSubView(headerView, "#header");
                headerView.render();

                let contentView = new NewsFeedView();
                this.addSubView(contentView, "#content");
                contentView.render();

                let footerView = new FooterView();
                this.addSubView(footerView, "#footer");
                footerView.render();
            }


        });
        return rootView;
    });