function StoredImage(storeKey) {
  'use strict';
  this.isStored = function () {
    return !!localStorage[storeKey];
  };

  this.transformDataToUrl = function (data) {
    return "data:image/jpeg;base64," + data;
  };

  this.getDataUrl = function () {
    if (this.isStored()) {
      return this.transformDataToUrl(localStorage[storeKey]);
    } else {
      return null;
    }
  };

  this.store = function (data) {
    localStorage[storeKey] = data;
  };
}
