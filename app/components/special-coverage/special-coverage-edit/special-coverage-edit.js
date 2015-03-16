'use strict';

angular.module('specialCoverage.edit', [
  'customSearch'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/edit/:id/', {
        controller: function ($routeParams, $scope, $window, ContentFactory) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Edit Special Coverage';

          $scope.model = null;
          ContentFactory.one('special-coverage', $routeParams.id).get()
            .then(function (data) {
              $scope.model = data;
            });
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-edit/special-coverage-edit.html',
        reloadOnSearch: false
      });
  });
