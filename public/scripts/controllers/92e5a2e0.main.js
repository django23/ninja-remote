'use strict';

yeomanApp.controller('MainCtrl'
  , ['$scope', '$rootScope', 'UIEvents', 'UserStore', 'NewButtonService'
  , function($scope, $rootScope, UIEvents, UserStore, NewButtonService) {

    $scope.ConfigureMode = false;

    $scope.Buttons = UserStore.GetButtons();

    /**
     * Edits an existing Button
     * @param {[type]} button [description]
     */
    $scope.EditButton = function(button) {
      var type = button.GetDevice().Options.type;

      NewButtonService.Button = button;

      switch (type) {
        case Ninja.DeviceTypes.RGBLED:
        case "rgbled8":
          $scope.setRoute('/configureLed');
          break;
        case Ninja.DeviceTypes.RELAY:
          $scope.setRoute('/configureRelay');
          break;
        case Ninja.DeviceTypes.RF433:
          if (!button.Options.value2) {
            $scope.setRoute('/configureRfButton');
          } else {
            $scope.setRoute('/configureSocket');
          }
          break;
      }
    };

    $scope.HandlePress = function(button) {
      if ($scope.ConfigureMode) {
        $scope.EditButton(button);
      } else {
        button.Actuate();
      }
    };

    // Watch for changes to the Buttons array
    $scope.$watch('UserStore.Data.Buttons', function() {
      $scope.Buttons = UserStore.GetButtons();
      // console.log('UserStore.Data.Buttons: changed', $scope.Buttons);
    });

    // Watch the Button array
    $scope.$watch('Buttons', function() {
      if ($scope.Buttons.length === 0) {
        $scope.$broadcast(UIEvents.SetConfigureMode, true);
      }
    });

    $scope.$on(UIEvents.SetConfigureMode, function(event, modeSwitch) {
      $scope.ConfigureMode = modeSwitch;
    });

    $rootScope.$on(UIEvents.ButtonRemoved, function(event, removedButton) {
      $scope.Buttons = UserStore.GetButtons();
      // console.log("Post-Removed", $scope.Buttons);
    });


    $rootScope.$on(UIEvents.UserStoreLoaded, function(event) {
      $scope.$apply();
    });

}]);