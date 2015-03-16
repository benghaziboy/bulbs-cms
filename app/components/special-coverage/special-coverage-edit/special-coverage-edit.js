'use strict';

angular.module('specialCoverage.edit', [
  'specialCoverage.factory',
  'customSearch'
])
  .constant('SAVING_STATES', {
    UNSAVED: 'unsaved',
    SAVED: 'saved',
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
          $scope.model = null;
          SpecialCoverage.$find($routeParams.id).$then(function (data) {
            $scope.model = data;
          });

          // set up save state function
          $scope.saveState = SAVING_STATES.SAVED;
          $scope.saveModel = function () {
            $scope.model.save()
              .notify(function () {
                $scope.saveState = SAVING_STATES.SAVING;
              })
              .then(function () {
                $scope.saveState = SAVING_STATES.SAVED;
              })
              .catch(function () {
                $scope.saveState = SAVING_STATES.ERROR;
              });
          };
        },
        templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-edit/special-coverage-edit.html',
        reloadOnSearch: false
      });
  });
