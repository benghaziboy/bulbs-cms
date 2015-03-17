'use strict';

angular.module('specialCoverage.list', [
  'specialCoverage.factory'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/', {
        controller: function ($location, $scope, $window, SpecialCoverage) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Special Coverage';

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
console.log('something screwed up')
                });
          };

          $scope.$retrieveSpecialCoverages();
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list.html',
        reloadOnSearch: false
      });
  });
