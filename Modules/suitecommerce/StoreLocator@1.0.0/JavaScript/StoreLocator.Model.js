/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

//@module StoreLocator
define('StoreLocator.Model'
,   [
        'underscore'
    ,   'Backbone'
    ,   'Utils'
    ]
,   function (
        _
    ,   Backbone
    ,   Utils
    )
{
    'use strict';

    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl('services/StoreLocator.Service.ss')

    });
});
