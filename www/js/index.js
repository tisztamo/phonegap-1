/*jslint sloppy: true vars:true*/
/*global device, Camera, StoredImage*/
var app = {
  // Application Constructor
  initialize: function () {
    this.avgZ = 0;
    this.profile = new StoredImage('profile');
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    window.addEventListener('push', this.onPush);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    document.getElementById('deviceready').innerText = "Device is Ready";
  },

  //Handles the event from push.js - new page is loaded
  onPush: function (e) {
    if (!e.detail) {
      return;
    }
    if (e.detail.state.url.match(/profile/)) {
      setTimeout(function () {
        app.displayProfilePicture();
      }, 10);
    }
    if (e.detail.state.url.match(/acceleration/)) {
      app.startAccelWatch();
    } else {
      app.stopAccelWatch();
    }
  },

  isIOS: function () {
    var p = device.platform;
    return p === "iOS";
  },

  testVibrate: function () {
    var pause = 200;
    if (this.isIOS()) {
      navigator.notification.vibrate(200);
    } else {
      navigator.notification.vibrateWithPattern([0, 500, pause,
               500, pause,
               500, pause,
               1500, pause,
               1500, pause,
               1500, pause,
               500, pause,
               500, pause,
               500, pause]);
    }
  },

  error: function (errorMessage) {
    window.alert(errorMessage);
  },

  /** Displays the currently saved profile image or the optional given one in the placeholder img.
   */
  displayProfilePicture: function (imageData) {
    var img = document.getElementById('profileimage');
    var profileDataUrl = imageData ? app.profile.transformDataToUrl(imageData) : app.profile.getDataUrl();
    img.setAttribute("src", profileDataUrl || "img/defaultprofile.png");
  },

  changeProfilePicture: function () {
    var cameraSuccess = function (imageData) {
        app.displayProfilePicture(imageData);
        app.profile.store(imageData);
      },
      cameraFail = function () {
        app.error("Camera problem.");
      };
    navigator.camera.getPicture(cameraSuccess, cameraFail, {
      quality: 5,
      destinationType: Camera.DestinationType.DATA_URL
    });
  },

  onDropDetected: function () {
    var el = document.getElementById("dropdisplay");
    if (el) {
      el.style.display = 'block';
      setTimeout(function () {
        el.style.display = 'none';
      }, 400);
    }
  },

  detectDrop: function (acceleration) {
    var alpha = 0.1,
      z = acceleration.z;
    this.avgZ = (1 - alpha) * this.avgZ + alpha * z;
    if (z < 5 && this.avgZ > 8 && Math.abs(acceleration.x) + Math.abs(acceleration.y) < 6) {
      this.onDropDetected();
    }
  },

  accelerationReceived: function (acceleration) {
//TODO
    app.detectDrop(acceleration);
  },

  accelerationError: function (e) {
    this.error("Acceleration error: " + e);
  },

  startAccelWatch: function () {
    //TODO
  },

  stopAccelWatch: function () {
    //TODO
  }
};
