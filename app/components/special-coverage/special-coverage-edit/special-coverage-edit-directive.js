'use strict';

angular.module('specialCoverage.edit.directive', [
  'bulbsCmsApp.settings',
  'customSearch',
  'saveButton.directive',
  'specialCoverage.factory',
  'topBar',
  'ui.bootstrap.tooltip'
])
  .directive('specialCoverageEdit', function (routes) {
    return {
      controller: function ($location, $q, $scope, SpecialCoverage) {
        $scope.ACTIVE_STATES = SpecialCoverage.ACTIVE_STATES;

        var modelId = $scope.getModelId();
        if (modelId === 'new') {
          // this is a new special coverage, build it
          $scope.model = SpecialCoverage.$build();
          $scope.isNew = true;
        } else {
          // this is an existing special coverage, find it
          $scope.model = SpecialCoverage.$find($scope.getModelId());
        }

        $scope.saveModel = function () {
          var promise;

          if ($scope.model) {
            // have model, use save promise as deferred
            promise = $scope.model.$save().$asPromise().then(function (data) {
              if (modelId === 'new') {
                $location.path('/cms/app/special-coverage/edit/' + data.id + '/');
              }
              $scope.isNew = false;
            });
          } else {
            // no model, this is an error, defer and reject
            var deferred = $q.defer();
            deferred.reject();
            promise = deferred.promise;
          }

          return promise;
        };
      },
      restrict: 'E',
      scope: {
        getModelId: '&modelId'
      },
      templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-edit/special-coverage-edit.html'
    };
  });
