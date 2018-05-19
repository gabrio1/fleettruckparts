define('MakeType', [
    'MakeType.Router'
], function MakeType(
    MakeTypeRouter
) {
    'use strict';

    return {
        mountToApp: function mountToAppMakeType(application) {
            return new MakeTypeRouter(application);
        }
    };
});
