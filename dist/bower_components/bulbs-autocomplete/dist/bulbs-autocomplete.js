// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by-directive.js
angular.module('BulbsAutocomplete.suggest.groupBy.directive', [])
  .directive('bulbsAutocompleteSuggestGroupBy', ['BULBS_AUTOCOMPLETE_EVENT_KEYPRESS', function (BULBS_AUTOCOMPLETE_EVENT_KEYPRESS) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.html',
      scope: {
        formatter: '&',
        grouper: '=',
        items: '=',
        onSelect: '&'
      },
      link: function (scope) {
        scope.mouseActive = false;
        scope.selectedGroupIndex = -1;
        scope.selectedIndex = -1;

        scope.$watch('items', function (newItemsValue) {
          scope.groupedItems = _.chain(scope.grouper(newItemsValue)).mapValues(function (group) {
              return group;
            })
            .pairs()
            .value();
        });

        scope.mouseEnterItem = function (groupIndex, itemIndex) {
          scope.mouseActive = true;
          scope.selectedGroupIndex = groupIndex;
          scope.selectedIndex = itemIndex;
        };

        scope.mouseLeaveItem = function () {
          scope.mouseActive = false;
          scope.selectedGroupIndex = -1;
          scope.selectedIndex = -1;
        };

        scope.$on(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, function (event, keyEvent) {
          if (!_.isEmpty(scope.groupedItems)) {
            var lastIndexOfGroups = scope.groupedItems.length - 1;

            if (lastIndexOfGroups < scope.selectedGroupIndex) {
              scope.selectedGroupIndex = -1;
              scope.selectedIndex = -1;
            }

            var items;
            var lastIndexOfItems;
            switch (keyEvent.keyCode) {
              case 13:
                // enter
                if (scope.selectedGroupIndex !== -1 && scope.selectedIndex !== -1) {
                  items = scope.groupedItems[scope.selectedGroupIndex][1];
                  scope.onSelect({
                    selection: items[scope.selectedIndex]
                  });
                }
                break;
              case 38:
                // up
                if (!scope.mouseActive) {
                  if (scope.selectedGroupIndex === -1) {
                    scope.selectedGroupIndex = lastIndexOfGroups;
                  }

                  items = scope.groupedItems[scope.selectedGroupIndex][1];
                  lastIndexOfItems = items.length - 1;

                  if (scope.selectedGroupIndex === 0 && scope.selectedIndex === 0) {
                    scope.selectedGroupIndex = lastIndexOfGroups;
                    scope.selectedIndex = scope.groupedItems[scope.selectedGroupIndex][1].length - 1;
                  } else if (scope.selectedIndex === 0) {
                    scope.selectedGroupIndex--;
                    scope.selectedIndex = scope.groupedItems[scope.selectedGroupIndex][1].length - 1;
                  } else {
                    scope.selectedIndex = scope.selectedIndex <= 0 ? lastIndexOfItems : scope.selectedIndex - 1;
                  }
                }
                break;
              case 40:
                // down
                if (!scope.mouseActive) {
                  if (scope.selectedGroupIndex === -1) {
                    scope.selectedGroupIndex = 0;
                  }

                  items = scope.groupedItems[scope.selectedGroupIndex][1];
                  lastIndexOfItems = items.length - 1;

                  if (scope.selectedGroupIndex === lastIndexOfGroups && scope.selectedIndex === lastIndexOfItems) {
                    scope.selectedGroupIndex = 0;
                    scope.selectedIndex = 0;
                  } else if (scope.selectedIndex === lastIndexOfItems) {
                    scope.selectedGroupIndex++;
                    scope.selectedIndex = 0;
                  } else {
                    scope.selectedIndex = scope.selectedIndex >= lastIndexOfItems ? 0 : scope.selectedIndex + 1;
                  }
                }
                break;
            }
          }
        });
      }
    };
  }]);

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.js
angular.module('BulbsAutocomplete.suggest.groupBy', [
  'BulbsAutocomplete',
  'BulbsAutocomplete.suggest.groupBy.directive'
]);

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-directive.js
angular.module('BulbsAutocomplete.suggest.directive', [])
  .directive('bulbsAutocompleteSuggest', ['BULBS_AUTOCOMPLETE_EVENT_KEYPRESS', function (BULBS_AUTOCOMPLETE_EVENT_KEYPRESS) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
      scope: {
        formatter: '&',
        items: '=',
        onSelect: '&'
      },
      link: function (scope) {
        scope.mouseActive = false;
        scope.selectedIndex = -1;

        scope.mouseEnterItem = function (index) {
          scope.mouseActive = true;
          scope.selectedIndex = index;
        };

        scope.mouseLeaveItem = function () {
          scope.mouseActive = false;
          scope.selectedIndex = -1;
        };

        scope.$on(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, function (event, keyEvent) {
          if (scope.items) {
            var lastIndexOfItems = scope.items.length - 1;
            switch (keyEvent.keyCode) {
              case 13:
                // enter
                if (scope.selectedIndex !== -1) {
                  scope.onSelect({
                    selection: scope.items[scope.selectedIndex]
                  });
                }
                break;
              case 38:
                // up
                if (!scope.mouseActive) {
                  scope.selectedIndex = scope.selectedIndex <= 0 ? lastIndexOfItems : scope.selectedIndex - 1;
                }
                break;
              case 40:
                //Down
                if (!scope.mouseActive) {
                  scope.selectedIndex = scope.selectedIndex >= lastIndexOfItems ? 0 : scope.selectedIndex + 1;
                }
                break;
            }
          }
        });
      }
    };
  }]);

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.js
angular.module('BulbsAutocomplete.suggest', [
  'BulbsAutocomplete',
  'BulbsAutocomplete.suggest.directive'
]);

// Source: src/bulbs-autocomplete.js
angular.module('BulbsAutocomplete', [
  'BulbsAutocomplete.suggest',
  'BulbsAutocomplete.suggest.groupBy'
])
  .constant('BULBS_AUTOCOMPLETE_EVENT_KEYPRESS', 'bulbs-autocomplete-keypress');

// Source: .tmp/bulbs-autocomplete-templates.js
angular.module('BulbsAutocomplete').run(['$templateCache', function($templateCache) {
$templateCache.put('src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.html',
    "<ul><li class=bulbs-autocomplete-group-container ng-repeat=\"group in groupedItems\"><div class=bulbs-autocomplete-group-key>{{ group[0] }}</div><ul class=bulbs-autocomplete-group-items><li class=bulbs-autocomplete-item ng-repeat=\"item in group[1]\" ng-click=\"onSelect({selection: item})\" ng-class=\"{active: selectedGroupIndex === $parent.$index && $index === selectedIndex}\" ng-mouseenter=\"mouseEnterItem($parent.$index, $index)\" ng-mouseleave=mouseLeaveItem()>{{ formatter({item:item}) }}</li></ul></li></ul>"
  );


  $templateCache.put('src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
    "<ul><li ng-repeat=\"item in items\" ng-click=\"onSelect({selection: item})\" ng-class=\"{active: $index === selectedIndex}\" ng-mouseenter=mouseEnterItem($index) ng-mouseleave=mouseLeaveItem()>{{ formatter({item:item}) }}</li></ul>"
  );

}]);
