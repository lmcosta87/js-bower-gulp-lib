(function (JsLibrary, factory) {
  "use strict";

  if (!JsLibrary) {
    throw new Error('JsLibrary not defined');
  }

  JsLibrary.JsLibraryClass = factory();
})(window.JsLibrary, function () {

  function JsLibraryClass(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }

  /**
   * Get arg1
   * @returns {*} arg1
   */
  JsLibraryClass.prototype.getArg1 = function () {
    return this.arg1;
  };

  /**
   * Get arg2
   * @returns {*} arg2
   */
  JsLibraryClass.prototype.getArg2 = function () {
    return this.arg2;
  };

  /** return JsLibraryClass */
  return JsLibraryClass;
});
