'use strict';

angular.module('apiServices.styles', [
  'lodash',
  'restmod'
])
  .factory('DjangoDRFApi', function (_, restmod, inflector) {
    var singleRoot = 'root';
    var manyRoot = 'results';

    return restmod.mixin('DefaultPacker', {
      $config: {
        style: 'DjangoDRFApi',
        primaryKey: 'id',
        jsonMeta: '.',
        jsonLinks: '.',
        jsonRootMany: manyRoot,
        jsonRootSingle: singleRoot
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
          if (_.isUndefined(_req.data[manyRoot])) {
            // this is not a collection, make it so the single root is accessible by the packer
            var newData = {};
            newData[singleRoot] = _req.data;
            _req.data = newData;
          }
        },
      }
    });
  });
