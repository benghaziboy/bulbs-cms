'use strict';

angular.module('campaigns.factory', [
  'apiServices'
])
  .filter('iso_date_string_to_moment', function() {
    return function (dateStr) {
      return moment(dateStr);
    };
  })
  .filter('moment_to_iso_date_string', function() {
    return function (momentObj) {
      return momentObj.format();
    };
  })
  .factory('Campaign', function (restmod) {
    return restmod.model('campaign').mix('NestedDirtyModel', {
      end_date: {
        decode: 'iso_date_string_to_moment',
        encode: 'moment_to_iso_date_string',
      },
      start_date: {
        decode: 'iso_date_string_to_moment',
        encode: 'moment_to_iso_date_string',
      }
    });
  });
