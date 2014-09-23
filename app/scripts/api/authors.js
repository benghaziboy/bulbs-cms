angular.module('bulbs.api', ['restangular']).
  factory('AuthorService', function (Restangular) {
    Restangular.setBaseUrl('/cms/api/v1/');
    Restangular.setRequestSuffix('/');
    Restangular.extendModel('author', function (obj) {
      return angular.extend(obj, {
        get_full_name: function() {
          return this.first_name + ' ' + this.last_name;
        }
      });
    });
    return Restangular.all('author');
  });