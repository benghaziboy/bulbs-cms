'use strict';

angular.module('momentFilter', [])
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
  });
