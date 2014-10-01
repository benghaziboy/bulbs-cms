angular.module('bulbs.api').
  factory('ContributionService', function (Restangular) {
    Restangular.setBaseUrl('/cms/api/v1/content/');
    Restangular.setRequestSuffix('/');
    Restangular.extendModel('contribution', function (obj) {
      obj.contributor = angular.extend(obj.contributor, {
        get_full_name: function() {
          return obj.contributor.first_name + ' ' + obj.contributor.last_name;
        }
      })
      return obj;
    });
    return Restangular.all('contribution');
  });