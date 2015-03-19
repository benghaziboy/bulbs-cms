'use strict';

angular.module('apiServices', [
  'restmod'
])
  .constant('API_URL_ROOT', '/cms/api/v1/')
  .config(function (API_URL_ROOT, restmodProvider) {
    restmodProvider.rebase('DefaultPacker', {
      $config: {
        style: 'AMSApi',
        urlPrefix: API_URL_ROOT
      },
      $hooks: {
        'before-request': function (_req) {
          _req.url += '/';
        },
        'after-request': function (_req) {
          // a dirty hack so we don't have to copy/modify the DefaultPacker
          _req.data = {
            '.': _req.data
          };
        }
      }
    });
  });
