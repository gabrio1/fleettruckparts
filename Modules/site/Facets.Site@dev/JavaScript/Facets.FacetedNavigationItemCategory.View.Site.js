define('Facets.FacetedNavigationItemCategory.View.Site', [
    'Facets.FacetedNavigationItemCategory.View'
], function FacetsFacetedNavigationItemCategoryViewFix(
    FacetsFacetedNavigationItemCategoryView
) {
    'use strict';

    FacetsFacetedNavigationItemCategoryView.prototype.installPlugin('postContext', {
        name: 'facetsItemCategoryContext',
        priority: 10,
        execute: function execute(context) {
            context.showFacet = false;
        }

    });
});
