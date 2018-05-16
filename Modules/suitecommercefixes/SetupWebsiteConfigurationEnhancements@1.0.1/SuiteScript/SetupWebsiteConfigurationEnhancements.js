define('SetupWebsiteConfigurationEnhancements', [
    'Configuration',
    'Models.Init',
    'underscore'
], function SetupWebsiteConfigurationEnhancements(
    Configuration,
    CommerceAPI,
    _
) {
    'use strict';
    var extraSiteSettings = CommerceAPI.session.getSiteSettings(['requireloginforpricing', 'siteloginrequired']);
    _.extend(Configuration, {
        passwordProtectedSite: CommerceAPI.session.isLoggedIn2() ? extraSiteSettings.siteloginrequired === 'T' : false,
        loginToSeePrices: CommerceAPI.session.isLoggedIn2() ? extraSiteSettings.requireloginforpricing === 'T' : false
    });
});