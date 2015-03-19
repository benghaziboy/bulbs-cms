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
        return moment();
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
  // Used for HTML formatting. Date can be any valid moment constructor.
  .filter('moment', function() {
    return function(date, format) {
      var m = moment(date);
      if (m.isValid()) {
        return m.format(format);
      } else {
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
