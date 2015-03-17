'use strict';

angular.module('campaigns.factory', [
  'apiServices'
])
  .factory('Campaign', function (restmod) {
    return restmod.model('campaign').mix('NestedDirtyModel', {});
  });
