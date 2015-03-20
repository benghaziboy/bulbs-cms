'use strict';

angular.module('campaigns.factory', [
  'apiServices'
])
  .filter('iso_date_string_to_moment', function() {
    return function (dateStr) {
      // Try to parse, else use current time
      var m = moment(dateStr);
      if (m.isValid()) {
        return m;
      } else {
        return null;
      }
    };
  })
  .filter('moment_to_iso_date_string', function() {
    return function (momentObj) {
      if (moment.isMoment(momentObj) && momentObj.isValid()) {
        return momentObj.format();
      } else {
        // Blank time string == not set
        return '';
      }
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
