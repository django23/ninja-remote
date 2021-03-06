yeomanApp.factory('Button',
  [ '$rootScope', 'NinjaService', 'NinjaUtilities', 'UIEvents'
  , function($rootScope, NinjaService, NinjaUtilities, UIEvents) {
    return function(options) {

      this.Options = {
        name: '',
        color: '',
        device: null,
        value1: null,
        value2: null,
        states: 1
      };
      this.Options = NinjaUtilities.ObjectMerge(this.Options, options);

      this.Construct = function() {
        if (this.Options.hasOwnProperty('deviceGuid')) {
          var device = new NinjaService.Device({ guid: this.Options.deviceGuid });
          this.Options.device = device;
        }
      };

      /**
       * Gets the associated device for this button
       */
      this.GetDevice = function() {
        return this.Options.device;
      }.bind(this);


      /**
       * Sets the associated device for this button
       * @param {Device} device Device to use for this button
       */
      this.SetDevice = function(device) {
        this.Options.device = device;
        return true;
      }.bind(this);


      this.HasValue = function(valueIndex) {
        var value = (this.Options['value' + valueIndex]);
        if (value && value.toString() === "0") return true;
        else return (value) ? true : false;
      };

      /**
       * Deletes this Button
       */
      this.Delete = function() {
        $rootScope.$broadcast(UIEvents.ButtonRemoving, this);
      };

      /**
       * Actuate the Button. Abstracts the value switching if more than 1 value is applied
       */
      this.Actuate = function() {
        this.Options.device.Emit(GetActuateValue.call(this));
      };

      this.ActuateOn = function() {
        this.Options.device.Emit(this.Options.value1);
      };

      this.ActuateOff = function() {
        this.Options.device.Emit(this.Options.value2);
      };

      var nextValue = 'value1';

      /**
       * Determines which value to actuate to
       */
      var GetActuateValue = function() {
        if (this.IsTwoState()) {
          // Toggle between the two values
          var value = this.Options[nextValue];
          if (nextValue == 'value1') {
            nextValue = 'value2';
          } else {
            nextValue = 'value1';
          }
          return value;

        } else {
          return this.Options.value1;
        }
      };

      /**
       * Determines if the button has two states
       */
      this.IsTwoState = function() {
        return (this.Options.value1 && this.Options.value2);
      };


      /**
       * Determines if the button is 'On'
       */
      this.IsOn = function() {
        var isOn = (nextValue === 'value2');
        console.log("IsOn", isOn);
        return isOn;
      };

      this.Construct();
    };
  }]);