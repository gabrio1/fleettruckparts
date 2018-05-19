define('Make.Type.View', [
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'Facets.FacetedNavigation.View',
    'Facets.FacetedNavigationItem.View',
    'Profile.Model',
    'SC.Configuration',
    'make_type_view.tpl',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function MakeTypeView(
    BackboneCompositeView,
    BackboneCollectionView,
    FacetsFacetedNavigationView,
    FacetsFacetedNavigationItemView,
    ProfileModel,
    Configuration,
    makeTypeTpl,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: makeTypeTpl,

        page_header: _('Make Type').translate(),

        title: _('Make Type').translate(),

        initialize: function initializeMakeType(options) {
            var self = this;
            var url = '/api/items?c=664777&country=US&currency=USD&fieldset=search&include=facets&language=en&limit=24&n=2&offset=0&sort=relevance%3Aasc';
            this.facetsList = options.application.Configuration.facets;
            this.allFacets = jQuery.get(url).then(
                function success(data) {
                    self.getSomeFacets = data.facets;
                    self.render();
                }
            );
            BackboneCompositeView.add(this);
        },
        getContext: function getContextMakeType() {
            var objFacets = {};
            var returnFacets = [];
            var arrayValues = [];
            var valuestest = {};
            var renamedFacets;
            var facetsCleaned = _.filter(this.getSomeFacets, function filterfacets(facetfilter) {
                return facetfilter.id === 'custitem_truck_make' ||
                    facetfilter.id === 'custitem_engine_make' ||
                    facetfilter.id === 'custitem_transmission_make' ||
                    facetfilter.id === 'custitem_differential_make' ||
                    facetfilter.id === 'custitem_steering_make';
            });
            /* eslint-disable */
            renamedFacets = JSON.stringify(facetsCleaned).replace('custitem_differential_make', 'Diferential Make').replace('custitem_engine_make', 'Engine Make').replace('custitem_steering_make', 'Steering Make').replace('custitem_transmission_make', 'Transmision Make').replace('custitem_truck_make', 'Truck Make');
            /* eslint-enable */
            jQuery.each(JSON.parse(renamedFacets), function returnlist(index, facet) {
                var self = this;
                objFacets = {};
                this.parentId = facet.url;
                objFacets.id = facet.id;
                objFacets.url = facet.url;
                objFacets.values = {};
                valuestest = {};
                if (facet.values) {
                    arrayValues = [];
                    jQuery.each(facet.values, function eachValue(indexval, objVal) {
                        valuestest.values = { 'url': objVal.url, 'label': objVal.label, 'parentId': self.parentId };
                        arrayValues.push(valuestest.values);
                    });
                    objFacets.values = arrayValues;
                }
                returnFacets.push(objFacets);
            });
            return {
                facetsList: returnFacets,
                pageHeader: this.page_header
            };
        }
    });
});
