'use strict';

angular.module('specialCoverage.list.directive', [
  'bulbsCmsApp.settings',
  'confirmationModal',
  'apiServices.specialCoverage.factory'
])
  .directive('specialCoverageList', function (routes) {
    return {
      controller: function ($scope, $location, SpecialCoverage) {

        $scope.$specialCoverages = [];
        $scope.$retrieveSpecialCoverages = function (filters) {
          $scope.$specialCoverages = SpecialCoverage.$collection().$search(filters);
        };

        $scope.$addSpecialCoverage = function () {
          $location.path('/cms/app/special-coverage/edit/new/');
        };

        $scope.$removeSpecialCoverage = function (specialCoverage) {
          specialCoverage.$destroy();
        };

        $scope.$retrieveSpecialCoverages();
      },
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list.html'
    };
  });
