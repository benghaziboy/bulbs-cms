'use strict';

describe('Directive: saveButton', function () {
  var
    $,
    $button,
    $directiveScope,
    $q,
    $scope;

  beforeEach(function () {
    module('jquery');
    module('saveButton.directive');
    module('jsTemplates');

    inject(function (_$_, _$q_, _$rootScope_, $compile) {
      $ = _$_;
      $q = _$q_;

      $scope = _$rootScope_.$new();

      $scope.disabler = false;
      $scope.saver = null;

      var element = $compile('<save-button disable-save="disabler" save-function="saver"></save-button>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();

      $button = $(element).children('button');
    });
  });

  describe('disabling', function () {

    it('should have a disabled state', function () {
      $scope.disabler = true;

      $scope.$digest();

      expect($button.is(':disabled')).toBe(true);
    });

    it('should have a non-disabled state', function () {
      $scope.disabler = null;

      $scope.$digest();

      expect($button.is(':disabled')).toBe(false);
    });
  });

  describe('saving functionality', function () {

    it('should have a saving state', function () {
      $scope.saver = function () {
        return $q.defer().promise;
      };

      $scope.$digest();

      $button.click();

      $scope.$digest();

      expect($directiveScope.savingState).toBe($directiveScope.SAVING_STATES.SAVING);
      expect($.trim($button.text())).toBe('Saving...');
    });

    it('should have a done state', function () {
      $scope.saver = function () {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      };

      $scope.$digest();

      $button.click();

      $scope.$digest();

      expect($directiveScope.savingState).toBe($directiveScope.SAVING_STATES.DONE);
      expect($.trim($button.text())).toBe('Save');
    });

    it('should have an error state', function () {
      $scope.saver = function () {
        var deferred = $q.defer();
        deferred.reject();
        return deferred.promise;
      };

      $scope.$digest();

      $button.click();

      $scope.$digest();

      expect($directiveScope.savingState).toBe($directiveScope.SAVING_STATES.ERROR);
      expect($.trim($button.text())).toBe('Error');
    });
  });
});
