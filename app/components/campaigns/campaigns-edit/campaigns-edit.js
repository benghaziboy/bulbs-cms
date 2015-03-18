'use strict';

angular.module('campaigns.edit', [
  'BettyCropper',
  'campaigns.edit.sponsorPixel',
  'campaigns.factory',
  'saveButton',
  ])
  .config(function ($routeProvider, routes) {
    $routeProvider
    .when('/cms/app/campaigns/edit/:id/', {
      controller: function ($routeParams, $q, $scope, $window, Campaign) {
        // set title
        $window.document.title = routes.CMS_NAMESPACE + ' | Edit Campaign';

        // populate model for use
        $scope.model = Campaign.$find($routeParams.id);

        $scope.addPixel = function () {
          var pixel = {
            url: '',
            campaign_type: ''
          };
          $scope.model.pixels.push(pixel);
        };

        $scope.deletePixel = function (pixel) {
          $scope.model.pixels = _.without($scope.model.pixels, pixel);
        };

        // set up save state function
        $scope.saveModel = function () {
          var promise;

          if ($scope.model) {
            // have model, use save promise as deferred
            promise = $scope.model.$save().$asPromise();
          } else {
            // no model, this is an error, defer and reject
            var deferred = $q.defer();
            deferred.reject();
            promise = deferred.promise;
          }

          return promise;
        };
      },
      templateUrl: routes.COMPONENTS_URL + 'campaigns/campaigns-edit/campaigns-edit.html',
      reloadOnSearch: false
    });
  });
