'use strict';

angular.module('campaigns.list', [
  'campaigns.factory'
])
  .config(function ($routeProvider, routes) {
  $routeProvider
  .when('/cms/app/campaigns/', {
    controller: function    ($scope, $window, Campaign) {
      // set title
      //$window.document.title = routes.CMS
      $scope.campaigns = [];
      $scope.$retrieveCampaigns = function (filters) {
        Campaign.$collection().$search(filters)
        .$then(function (data) {
          $scope.campaigns = data;
        });
      };
      $scope.$retrieveCampaigns();
    },
    templateUrl: routes.COMPONENTS_URL + 'campaigns/campaigns-list/campaigns-list.html',
    reloadOnSearch: false
  });
  });
