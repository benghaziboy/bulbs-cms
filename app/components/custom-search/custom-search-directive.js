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
          if (_.isUndefined($scope.customSearchService) && !_.isUndefined(newQuery))  {
            $scope.customSearchService = new CustomSearchService($scope.searchQueryData);
          }

          if (!_.isUndefined($scope.customSearchService) && !angular.equals(newQuery, oldQuery)) {
            $scope.addedFilterOn = false;
            $scope.removedFilterOn = false;

            $scope.customSearchService.data(newQuery);
            $scope.customSearchService.$retrieveContent();
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

        $scope.$contentRetrieve = function () {
          $scope.customSearchService.$retrieveContent();
          $scope.onUpdate();
        };



// TODO : wrap all the onupdate functions in something that makes them fire only once when a bunch fire at the same time






      },
      restrict: 'E',
      scope: {
        searchQueryData: '=?',
        onUpdate: '&'
      },
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search.html'
    };
  });
