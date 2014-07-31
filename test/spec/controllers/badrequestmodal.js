'use strict';

describe('Controller: BadrequestmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('bulbsCmsApp'));

  var BadrequestmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BadrequestmodalCtrl = $controller('BadrequestmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
