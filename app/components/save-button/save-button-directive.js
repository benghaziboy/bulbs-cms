'use strict';

angular.module('saveButton.directive', [
  'bulbsCmsApp.settings'
])
  .directive('saveButton', function (routes) {
    return {
      controller: function ($scope) {
        $scope.SAVING_STATES = {
          DONE: 'done',
          SAVING: 'saving',
          ERROR: 'error'
        };
        $scope.savingState = $scope.SAVING_STATES.DONE;
        $scope.doSave = function () {
          $scope.savingState = $scope.SAVING_STATES.SAVING;
          $scope.saveFunction()
            .then(function () {
              $scope.savingState = $scope.SAVING_STATES.DONE;
            })
            .catch(function () {
              $scope.savingState = $scope.SAVING_STATES.ERROR;
            });
        };
      },
      restrict: 'E',
      scope: {
        disableSave: '&',
        saveFunction: '='
      },
      templateUrl: routes.COMPONENTS_URL + 'save-button/save-button.html'
    };
  });
