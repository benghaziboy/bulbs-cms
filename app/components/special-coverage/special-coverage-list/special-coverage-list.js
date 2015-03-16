'use strict';

angular.module('specialCoverage.list', [
  'specialCoverage.factory'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/', {
        controller: function ($scope, $window, SpecialCoverage) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Special Coverage';

          $scope.specialCoverages = [];
          $scope.$retrieveSpecialCoverages = function (filters) {
            SpecialCoverage.$collection().$search()
              .$then(function (data) {
                $scope.specialCoverages = data;
              });
          };

          $scope.$retrieveSpecialCoverages();
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list.html',
        reloadOnSearch: false
      });
  });
