'use strict';

angular.module('customSearch.directive', [
  'bulbsCmsApp.settings',
  'customSearch.contentItem',
  'customSearch.service',
  'customSearch.simpleContentSearch',
  'customSearch.group'
])
  .directive('customSearch', function (routes) {
    return {
      controller: function (_, $scope, CustomSearchService) {

        $scope.$watch('searchQueryData', function (newQuery, oldQuery) {
          $scope.customSearchService = new CustomSearchService($scope.searchQueryData);
          $scope.customSearchService.$retrieveContent();

          $scope.addedFilterOn = false;
          $scope.removedFilterOn = false;

          if (!_.isUndefined(oldQuery)) {
            $scope.onUpdate();
          }
        }, true);

        $scope.resetFilters = function () {
          $scope.customSearchService.setPage(1);
          $scope.customSearchService.setQuery('');
          $scope.addedFilterOn = false;
          $scope.removedFilterOn = false;
        };

        $scope.$conditionalContentRetrieve = function () {
          if ($scope.addedFilterOn) {
            // included filter is on, use retrieval by included
            $scope.customSearchService.$filterContentByIncluded();
          } else if ($scope.removedFilterOn) {
            // excluded filter is on, use retrieval by excluded
            $scope.customSearchService.$filterContentByExcluded();
          } else {
            // no query entered, any request should go to page one
            $scope.customSearchService.$retrieveContent();
          }
        };
      },
      restrict: 'E',
      scope: {
        searchQueryData: '=?',
        onUpdate: '&'
      },
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search.html'
    };
  });
