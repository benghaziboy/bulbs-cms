'use strict';

angular.module('apiServices', [
  'restmod'
])
  .constant('API_URL_ROOT', '/cms/api/v1/')
  .config(function (API_URL_ROOT, restmodProvider) {
    restmodProvider.rebase({
      $config: {
        style: 'AMSApi',
        urlPrefix: API_URL_ROOT
      },
      $hooks: {
        'before-request': function (_req) {
          _req.url += '/';
        }
      }
    });
  });
