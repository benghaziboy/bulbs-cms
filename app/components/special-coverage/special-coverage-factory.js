'use strict';

angular.module('specialCoverage.factory', [
  'apiServices'
])
  .factory('SpecialCoverage', function (restmod) {
    return restmod.model('special-coverage').mix('NestedDirtyModel', {});
  });
