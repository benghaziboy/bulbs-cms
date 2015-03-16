'use strict';

angular.module('specialCoverage.edit', [
  'specialCoverage.factory',
  'customSearch'
])
  .constant('SAVING_STATES', {
    DONE: 'done',
    SAVING: 'saving',
    ERROR: 'error'
  })
  .config(function ($routeProvider, SAVING_STATES, routes) {
    $routeProvider
      .when('/cms/app/special-coverage/edit/:id/', {
        controller: function ($routeParams, $scope, $window, SpecialCoverage) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Edit Special Coverage';

          // populate model for use
          $scope.model = SpecialCoverage.$find($routeParams.id);

          // set up save state function
          $scope.saveStates = SAVING_STATES;
          $scope.saveState = SAVING_STATES.SAVED;
          $scope.saveModel = function () {
            if ($scope.model) {
              $scope.saveState = SAVING_STATES.SAVING;
              $scope.model.$save()
                .$then(
                  function () {
                    $scope.saveState = SAVING_STATES.DONE;
                  },
                  function () {
                    $scope.saveState = SAVING_STATES.ERROR;
                  });
            }
          };
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-edit/special-coverage-edit.html',
        reloadOnSearch: false
      });
  });
