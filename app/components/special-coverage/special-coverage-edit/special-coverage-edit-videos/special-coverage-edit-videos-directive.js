'use strict';

angular.module('specialCoverage.edit.videos.directive', [
  'specialCoverage.edit.videos.video.directive',
  'ui.sortable'
])
  .directive('specialCoverageEditVideos', function (routes) {
    return {
      controller: function ($scope) {
        /**
         * Content moving function.
         *
         * @param {Number} indexFrom - Index to move content from.
         * @param {Number} indexTo - Index to move content to.
         * @returns {Boolean} true if content moved, false otherwise.
         */
        var moveTo = function (indexFrom, indexTo) {
          var ret = false;
          var videos = $scope.videos;
          if (indexFrom >= 0 && indexFrom < videos.length &&
              indexTo >= 0 && indexTo < videos.length) {
            var splicer = videos.splice(indexFrom, 1, videos[indexTo]);
            if (splicer.length > 0) {
              videos[indexTo] = splicer[0];
              ret = true;
            }
          }
          return ret;
        };

        $scope.moveUp = function (index) {
          moveTo(index, index - 1);
        };

        $scope.moveDown = function (index) {
          moveTo(index, index + 1);
        };
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
