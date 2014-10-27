'use strict';

angular.module('bulbsCmsApp')
  .filter('tzDate', function (dateFilter, moment, TIMEZONE_LABEL) {
    return function (input, format) {
      if (!input) {
        return '';
      }
      var newdate = moment(input).format('YYYY-MM-DDTHH:mm');
      var formattedDate = dateFilter(newdate, format);
      if (format.toLowerCase().indexOf('h') > -1) {
        formattedDate += ' ' + TIMEZONE_LABEL;
      }
      return formattedDate;
    };
  });
