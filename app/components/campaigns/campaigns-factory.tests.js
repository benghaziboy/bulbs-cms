'use strict';

describe('Factory: Campaign', function () {

  var Campaign;
  var $httpBackend;
  var moment;

  // load the directive's module
  beforeEach(function () {

    module('bulbsCmsApp');
    module('campaigns.factory');

    inject(function (_$httpBackend_, _Campaign_, _moment_) {
      $httpBackend = _$httpBackend_;
      Campaign = _Campaign_;
      moment = _moment_;
    });

  });

});
