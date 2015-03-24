'use strict';

angular.module('autocompleteBasic', [
  'BulbsAutocomplete',
  'BulbsAutocomplete.suggest',
  'bulbsCmsApp.settings'
])
  .directive('autocompleteBasic', function (routes) {
    return {
      controller: function (_, $scope, BulbsAutocomplete, BULBS_AUTOCOMPLETE_EVENT_KEYPRESS) {
        $scope.writables = {
          searchTerm: ''
        };

        $scope.autocompleteItems = [];

        var autocomplete = new BulbsAutocomplete(function () {
          return $scope.searchFunction($scope.writables.searchTerm)
            .then(function (data) {
              return _.map(data, function (item) {
                return {
                  name: $scope.itemDisplayFormatter({item: item}),
                  value: item
                };
              });
            });
        });

        $scope.updateAutocomplete = function () {
          if ($scope.writables.searchTerm) {
            autocomplete.$retrieve().then(function (results) {
              $scope.autocompleteItems = results;
            });
          }
        };

        $scope.delayClearAutocomplete = function () {
          _.delay(function () {
            $scope.clearAutocomplete();
            $scope.$digest();
          }, 200);
        };

        $scope.clearAutocomplete = function () {
          if (!$scope.inputUseSelectionAsValue()) {
            $scope.writables.searchTerm = '';
          }
          $scope.autocompleteItems = [];
        };

        $scope.handleKeypress = function ($event) {
          if ($event.keyCode === 27) {
            // esc, close dropdown
            $scope.clearAutocomplete();
          } else {
            $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, $event);
          }
        };

        $scope.handleSelect = function (selection) {
          if (selection && $scope.inputUseSelectionAsValue()) {
            $scope.writables.searchTerm = selection.name;
            $scope.clearAutocomplete();
          }

          $scope.onSelect({selection: selection});
        };
      },
      restrict: 'E',
      scope: {
        hideSearchIcon: '&',
        inputId: '@',
        inputPlaceholder: '@',
        inputUseSelectionAsValue: '&',
        itemDisplayFormatter: '&',
        onSelect: '&',
        searchFunction: '='
      },
      templateUrl: routes.COMPONENTS_URL + 'autocomplete-basic/autocomplete-basic.html'
    };
  });
