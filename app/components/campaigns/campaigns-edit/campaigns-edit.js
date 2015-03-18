'use strict';

angular.module('campaigns.edit', [
  'saveButton',
  'campaigns.factory',
]).constant('PIXEL_TYPES', [
  {
    name: 'Logo',
    value: 'Logo'
  },
  {
    name: 'Detail',
    value: 'Detail'
  }])
  .config(function ($routeProvider, routes) {
    $routeProvider
    .when('/cms/app/campaigns/edit/:id/', {
      controller: function ($routeParams, $q, $scope, $window, Campaign, PIXEL_TYPES) {
        // set title
        $window.document.title = routes.CMS_NAMESPACE + ' | Edit Campaign';

        // populate model for use
        $scope.model = Campaign.$find($routeParams.id);

        $scope.PIXEL_TYPES = PIXEL_TYPES;

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
