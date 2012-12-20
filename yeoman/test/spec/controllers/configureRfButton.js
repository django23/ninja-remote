'use strict';

describe('Controller: ConfigureRfButtonCtrl', function() {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ConfigureRfButtonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ConfigureRfButtonCtrl = $controller('ConfigureRfButtonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
