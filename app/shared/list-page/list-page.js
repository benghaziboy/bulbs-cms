'use strict';

angular.module('listPage', [
  'bulbsCmsApp.settings',
  'confirmationModal'
])
  .directive('listPage', function (routes) {
    return {
      controller: function ($scope, $location) {
        $scope.name = $scope.modelFactory.identity();
        $scope.namePlural = $scope.modelFactory.identity(true);
        $scope.fields = $scope.modelFactory.getProperty('fieldDisplays');
        $scope.$list = $scope.modelFactory.$collection();

        $scope.$retrieve = function () {
          $scope.$list.$refresh();
        };

        $scope.$add = function () {
          $location.path('/cms/app/' + $scope.cmsEndpoint + '/edit/new/');
        };

        $scope.$remove = function (item) {
          item.$destroy();
        };

        $scope.$retrieve();
      },
      restrict: 'E',
      scope: {
        cmsPage: '@',
        modelFactory: '='
      },
      templateUrl: routes.SHARED_URL + 'list-page/list-page.html'
    };
  });
