(function (global, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.JsLibrary = factory();
  }
})(window, function () {

  /** Variables */

  var VERSION = '1.0.0';
  // var defaults = {};
  var options = {};

  /** Constructors */

  // JsLibrary prototype object
  function JsLibrary(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = new JsLibrary.JsLibraryClass(3, 4);
  }

  /**
   * Get arg1
   * @returns {*} arg1
   */
  JsLibrary.prototype.getArg1 = function () {
    return this.arg1;
  };

  /** Static Variables / Methods */

  // version number
  JsLibrary.version = VERSION;

  // compare JsLibrary object
  JsLibrary.isJsLibrary = function (obj) {
    return obj instanceof JsLibrary;
  };

  // avaliable options
  JsLibrary.options = options;

  /** return library */
  return JsLibrary;
});
