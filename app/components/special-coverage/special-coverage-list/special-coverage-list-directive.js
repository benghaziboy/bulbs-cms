'use strict';

angular.module('specialCoverage.list.directive', [
  'bulbsCmsApp.settings',
  'specialCoverage.factory'
])
  .directive('specialCoverageList', function (routes) {
    return {
      controller: function ($scope, $location, SpecialCoverage) {
        $scope.errors = [];

        $scope.$specialCoverages = [];
        $scope.$retrieveSpecialCoverages = function (filters) {
          $scope.$specialCoverages = SpecialCoverage.$collection().$search(filters);
        };

        $scope.$addSpecialCoverage = function () {
          $scope.$specialCoverages.$create()
            .$then(
              function (data) {
                $location.path('/cms/app/special-coverage/edit/' + data.id + '/');
              },
              function () {
                $scope.errors.push({message: 'Failed to create new special coverage list.'});
              });
        };

        $scope.$retrieveSpecialCoverages();
      },
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list.html'
    };
  });
