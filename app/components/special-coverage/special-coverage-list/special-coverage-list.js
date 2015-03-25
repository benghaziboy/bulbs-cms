'use strict';

angular.module('specialCoverage.list', [
  // 'specialCoverage.list.directive',
  'listPage',
  'apiServices.specialCoverage.factory'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/', {
        controller: function ($scope, $window, SpecialCoverage) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Special Coverage';

          $scope.modelFactory = SpecialCoverage;
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list-page.html',
        reloadOnSearch: false
      });
  });
