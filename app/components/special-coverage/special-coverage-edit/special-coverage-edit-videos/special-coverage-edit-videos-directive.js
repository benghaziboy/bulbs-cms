'use strict';

angular.module('specialCoverage.edit.videos.directive', [
  'specialCoverage.edit.videos.video.directive'
])
  .directive('specialCoverageEditVideos', function (routes) {
    return {
      controller: function ($scope) {

      },
      link: function (scope, iElement, iAttrs, ngModelCtrl) {
        ngModelCtrl.$formatters.push(function (modelValue) {
          scope.videos = modelValue;
        });
      },
      require: 'ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'special-coverage/special-coverage-edit/special-coverage-edit-videos/special-coverage-edit-videos.html'
    };
  });
