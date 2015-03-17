'use strict';

angular.module('campaigns.list', [
])
  .config(function ($routeProvider, routes) {
        $routeProvider
            .when('/cms/app/campaigns/', {
                controller: function ($scope, $window) {
                    // set title
                    //$window.document.title = routes.CMS
                },
                templateUrl: routes.COMPONENTS_URL + 'campaigns/campaigns-list/campaigns-list.html',
                reloadOnSearch: false
            });
  });
