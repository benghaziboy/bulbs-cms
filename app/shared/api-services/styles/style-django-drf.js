'use strict';

angular.module('apiServices.styles', [
  'restmod'
])
  .factory('DjangoDRFApi', function (restmod, inflector) {
    return restmod.mixin('DefaultPacker', {
      $config: {
        style: 'DjangoDRFApi',
        primaryKey: 'id',
        jsonMeta: '.',
        jsonLinks: '.',
        jsonRootMany: 'results',
        jsonRootSingle: '.'
      },

      $extend: {
        // special snakecase to camelcase renaming
        Model: {
          decodeName: inflector.camelize,
          encodeName: function(_v) { return inflector.parameterize(_v, '_'); },
          encodeUrlName: inflector.parameterize
        }
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
