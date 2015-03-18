'use strict';

angular.module('specialCoverage.edit', [
  'customSearch',
  'topBar',
  'saveButton.directive',
  'specialCoverage.factory'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/edit/:id/', {
        controller: function ($routeParams, $q, $scope, $window, SpecialCoverage, TopBarItem) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Edit Special Coverage';

          // populate model for use
          $scope.model = SpecialCoverage.$find($routeParams.id);

          $scope.ACTIVE_STATES = SpecialCoverage.ACTIVE_STATES;

          // set up save state function
          $scope.saveModel = function () {
            var promise;

            if ($scope.model) {
              // have model, use save promise as deferred
              promise = $scope.model.$save().$asPromise();
            } else {
              // no model, this is an error, defer and reject
              var deferred = $q.defer();
              deferred.reject();
              promise = deferred.promise;
            }

            return promise;
          };
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-edit/special-coverage-edit.html',
        reloadOnSearch: false
      });
  });
