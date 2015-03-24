'use strict';

angular.module('campaigns.list.directive', [
  'bulbsCmsApp.settings',
  'confirmationModal',
  'apiServices.campaign.factory',
  'momentFormatterFilter'
])
  .directive('campaignsList', function (routes) {
    return {
      controller: function ($scope, $location, Campaign) {

        $scope.$campaigns = [];
        $scope.$retrieveCampaigns = function (filters) {
          $scope.$campaigns = Campaign.$collection().$search(filters);
        };

        $scope.$addCampaign = function () {
          $location.path('/cms/app/campaigns/edit/new/');
        };

        $scope.$removeCampaign = function (campaign) {
          campaign.$destroy();
        };

        $scope.$retrieveCampaigns();
      },
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'campaigns/campaigns-list/campaigns-list.html'
    };
  });
