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

  it('campaign should translate iso date strings into moments', function () {
    var DATE_STR = '2015-03-19T16:00:00-0500';
    $httpBackend.expectGET(/^\/cms\/api\/v1\/campaign\/(\d+)\/$/).respond({
        start_date: DATE_STR
    });

    var campaign = Campaign.$find(1);
    $httpBackend.flush();
    expect(campaign.start_date.isSame(moment(DATE_STR))).toBe(true);
  });

  it('campaign should convert invalid/blank iso date strings into current moment', function () {

    var now = moment();
    spyOn(window, 'moment').andReturn(now);

    for (var start_date in ['', 'invalid date']) {
      $httpBackend.expectGET(/^\/cms\/api\/v1\/campaign\/(\d+)\/$/).respond({
          start_date: start_date
      });

      var campaign = Campaign.$find(1);
      $httpBackend.flush();
      expect(campaign.start_date.isSame(now)).toBe(true);
    }
  });

  it('campaign should translate invalid moments to empty strings', function () {

    var campaignToSave = Campaign.$build({
      start_date: moment('')  // Invalid date
    });
    spyOn(campaignToSave.start_date, 'format');
    campaignToSave.$save();

    // capture posted value
    var postedStartDate;
    $httpBackend.expectPOST(/^\/cms\/api\/v1\/campaign\/$/).respond(function(method, url, data) {
      postedStartDate = JSON.parse(data).start_date;
      return [200, {}];
    });

    $httpBackend.flush();
    expect(postedStartDate).toBe('');
    expect(campaignToSave.start_date.format).not.toHaveBeenCalled();
  });

  it('campaign should translate moments to iso date strings', function () {

    var DATE_STR = '2015-03-19T18:00:00-05:00';
    var campaignToSave = Campaign.$build({
      start_date: moment(DATE_STR)
    });
    campaignToSave.$save();

    // capture posted value
    var postedStartDate;
    $httpBackend.expectPOST(/^\/cms\/api\/v1\/campaign\/$/).respond(function(method, url, data) {
      postedStartDate = JSON.parse(data).start_date;
      return [200, {}];
    });

    $httpBackend.flush();
    expect(postedStartDate).toEqual(DATE_STR);
  });

  it('has a moment filter', inject(function($filter) {
      expect($filter('moment')).not.toBeNull();
  }));

  it("moment filter should turn invalid dates into blank strings", inject(function (momentFilter) {
      expect(momentFilter('')).toBe('');
      expect(momentFilter('invalid date')).toBe('');
  }));

  it("moment filter should format date strings", inject(function (momentFilter) {
      expect(momentFilter('2015-03-19T18:00:00-05:00', 'MM/DD/YY')).toBe('03/19/15');
  }));

  it("moment filter should format moments into date strings", inject(function (momentFilter) {
      expect(momentFilter(moment('2015-03-19T18:00:00-05:00'), 'MM/DD/YY')).toBe('03/19/15');
  }));

});
