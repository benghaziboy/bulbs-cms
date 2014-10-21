'use strict';

angular.module('bulbsCmsApp')
  .filter('tzDate', function (dateFilter, moment, TIMEZONE_NAME, TIMEZONE_LABEL) {
    return function (input, format) {
      if (!input) {
        return '';
      }
      var newdate = moment(input).tz(TIMEZONE_NAME).format('YYYY-MM-DDTHH:mm');
      var formattedDate = dateFilter(newdate, format);
      if (format.toLowerCase().indexOf('h') > -1) {
        formattedDate += ' ' + TIMEZONE_LABEL;
      }
      return formattedDate;
    };
  });
