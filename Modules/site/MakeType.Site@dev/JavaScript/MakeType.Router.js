define('MakeType.Router', [
    'Backbone',
    'Make.Type.View'
], function MakeTypeRouter(
    Backbone,
    MakeTypeView
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'maketype': 'makeType'
        },
        initialize: function initialize(application) {
            this.application = application;
        },
        makeType: function makeType() {
            var view = new MakeTypeView({
                application: this.application
            });
            view.showContent();
        }
    });
});
