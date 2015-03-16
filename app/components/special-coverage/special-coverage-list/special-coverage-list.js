'use strict';

angular.module('specialCoverage.list', [])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/', {
        controller: function ($scope, $window, ContentFactory) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Special Coverage';

          $scope.specialCoverages = [];
          $scope.$retrieveSpecialCoverages = function (filters) {
            ContentFactory.all('special-coverage').getList(filters)
              .then(function (data) {
                $scope.specialCoverages = data;
              });
          };

          $scope.$retrieveSpecialCoverages();
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list.html',
        reloadOnSearch: false
      });
  });
