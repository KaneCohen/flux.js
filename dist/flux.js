module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hexToRgba;
/**
 * Returns integer that was produced after converting character from base16 encoding.
 * @param  {string} c
 * @return {integer}
 */
function numChar(c) {
  return '0123456789ABCDEF'.indexOf(c);
}

/**
 * Returns object representing colors in RGB format for a color in HEX format.
 * @param  {string} hex
 * @return {obect}
 */
function hexToRgba(hex) {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  hex = hex.toUpperCase();

  var arr = [];
  for (var i = 0; i < 6; i++) {
    arr[i] = numChar(hex.charAt(i));
    if (arr[i] === -1) return null;
  }

  return {
    red: arr[0] * 16 + arr[1],
    green: arr[2] * 16 + arr[3],
    blue: arr[4] * 16 + arr[5],
    alpha: 1
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = rgbToHex;
/**
 * Returns hex code for a color given in RGB format.
 * @param  {integer} red
 * @param  {integer} green
 * @param  {integer} blue
 * @return {string}
 */
function rgbToHex(red, green, blue) {
  var isPercent = red.toString().includes('%');

  if (typeof red === 'string') {
    var res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);

    var _res = _slicedToArray(res, 3);

    red = _res[0];
    green = _res[1];
    blue = _res[2];
  } else if (Array.isArray(red)) {
    var _red = red;

    var _red2 = _slicedToArray(_red, 3);

    red = _red2[0];
    green = _red2[1];
    blue = _red2[2];
  } else if ((typeof red === 'undefined' ? 'undefined' : _typeof(red)) === 'object') {
    if (typeof red.red !== 'undefined') {
      var _red3 = red;
      red = _red3.red;
      green = _red3.green;
      blue = _red3.blue;
    } else {
      var temp = red;
      red = temp.r;
      green = temp.g;
      blue = temp.b;
    }
  }

  if (typeof red !== 'number' || typeof green !== 'number' || typeof blue !== 'number' || red > 255 || green > 255 || blue > 255) {
    throw new TypeError('Expected three numbers below 256');
  }

  return (blue | green << 8 | red << 16 | 1 << 24).toString(16).slice(1);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Available under BSD-3-Clause license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2017 Kane Cohen <https://github.com/KaneCohen>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _rgbToHex = __webpack_require__(1);

var _rgbToHex2 = _interopRequireDefault(_rgbToHex);

var _hexToRgb = __webpack_require__(0);

var _hexToRgb2 = _interopRequireDefault(_hexToRgb);

var _solarCalc = __webpack_require__(6);

var _solarCalc2 = _interopRequireDefault(_solarCalc);

var _kelvinToRgb = __webpack_require__(5);

var _kelvinToRgb2 = _interopRequireDefault(_kelvinToRgb);

var _interopColor = __webpack_require__(4);

var _interopColor2 = _interopRequireDefault(_interopColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STYLES = ['backgroundColor', 'borderTopColor', 'borderLeftColor', 'borderRightColor', 'borderBottomColor', 'color'];

var STYLE_CHECKS = {
  'borderTopColor': {
    prop: 'borderTopWidth',
    validate: function validate(v) {
      return parseInt(v, 10) > 0;
    }
  },
  'borderLeftColor': {
    prop: 'borderLeftWidth',
    validate: function validate(v) {
      return parseInt(v, 10) > 0;
    }
  },
  'borderRightColor': {
    prop: 'borderRightWidth',
    validate: function validate(v) {
      return parseInt(v, 10) > 0;
    }
  },
  'borderBottomColor': {
    prop: 'borderBottomWidth',
    validate: function validate(v) {
      return parseInt(v, 10) > 0;
    }
  }
};

var DEFAULTS = {
  localStorageKey: 'fluxjs-location',
  styleKey: 'fluxjs-',
  nightTemperature: 4400,
  dayTemperature: 6500,
  colorMixAmount: 0.8,
  brightness: 127,
  interval: 60000,
  location: null,
  date: null,
  el: null
};

function validateStyle(styles, style) {
  if (!STYLE_CHECKS[style]) {
    return true;
  }

  var rules = STYLE_CHECKS[style];
  return rules.validate(styles[rules.prop]);
}

var Flux = function () {
  /**
   * Constructor.
   * @param  {object} options
   * @return {undefined}
   */
  function Flux() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Flux);

    Object.assign(this, {}, DEFAULTS, options);
    if (this.location) {
      this._saveUserLocation(this.location);
    }
  }

  _createClass(Flux, [{
    key: '_saveUserLocation',
    value: function _saveUserLocation(coords) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(coords));
    }

    /**
     * Initializes SolarCal instance based on a given Date and location coordinates.
     * @param  {object} location    Object containing latitude and longitude params.
     * @param  {Date}
     * @return {SolarCalc}
     */

  }, {
    key: '_initSolarCalc',
    value: function _initSolarCalc(coords, date) {
      return new _solarCalc2.default(date, coords.latitude, coords.longitude);
    }

    /**
     * Returns an array of DOM nodes that belong to a given parent node.
     * @param  {Element} node Parent node.
     * @return {array}
     */

  }, {
    key: '_getDOMNodes',
    value: function _getDOMNodes(el) {
      var node = el;

      if (el.nodeName) {
        node = el;
      } else if (typeof node == 'string') {
        var _el = document.querySelector(_el);
        if (!_el) {
          throw new Error('FluxJS: Failed to find element with selector ' + _el + '.');
        }
        node = _el;
      } else {
        throw new Error('FluxJS: Given element could not be found on the page.');
      }

      var nodes = [];
      var loop = function loop(node) {
        do {
          if (node.nodeType === 1) {
            nodes.push(node);
          }
          if (node.hasChildNodes()) {
            loop(node.firstChild);
          }
        } while (node = node.nextSibling);
      };
      loop(node);
      return nodes;
    }
  }, {
    key: '_normalizeStyle',
    value: function _normalizeStyle(style) {
      if (style === 'transparent') {
        return 'rgba(0,0,0,0)';
      }
      return style;
    }

    /**
     * Sets RGB background to body if base value has unexpected value.
     * @param  {array}   nodes
     * @param  {integer} temperature
     * @return {undefined}
     */

  }, {
    key: '_fixBodyBackground',
    value: function _fixBodyBackground(node) {
      if (node.nodeName === 'BODY') {
        var styles = window.getComputedStyle(node);
        var bg = this._normalizeStyle(styles.backgroundColor);
        var res = bg.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
        if (res[3] === 0) {
          node.style.backgroundColor = 'rgb(255,255,255)';
        }
      }
    }

    /**
     * Applies given color temperature to an array of DOM nodes.
     * @param  {array}   nodes
     * @param  {integer} temperature
     * @return {undefined}
     */

  }, {
    key: '_changeNodesColor',
    value: function _changeNodesColor(nodes, temperature) {
      var _this = this;

      var brightness = this.brightness;
      var amount = this.colorMixAmount;
      var color = (0, _kelvinToRgb2.default)(temperature);

      this._fixBodyBackground(nodes[0]);
      nodes.forEach(function (node) {
        _this._changeNodeColor(node, temperature, amount, brightness, color);
      });
    }

    /**
     * Applies given color temperature to one DOM node.
     * @param  {integer} temperature
     * @param  {array}   node
     * @param  {float}   amount
     * @param  {integer} brightness
     * @param  {object}  color
     * @return {undefined}
     */

  }, {
    key: '_changeNodeColor',
    value: function _changeNodeColor(node, temperature, amount, brightness, color) {
      var _this2 = this;

      var styles = window.getComputedStyle(node);
      STYLES.forEach(function (style) {
        if (!validateStyle(styles, style)) {
          return false;
        }

        var styleKey = _this2.styleKey + style;

        if (temperature === _this2.dayTemperature && typeof node[styleKey] !== 'undefined') {
          node.style[style] = node[styleKey];
          delete node[styleKey];
        } else if (temperature !== _this2.dayTemperature && typeof node[styleKey] === 'undefined') {
          var styleVal = _this2._normalizeStyle(node[styleKey] || styles[style]);
          node[styleKey] = node.style[style] || null;
          var res = styleVal.match(/(0?\.?\d{1,3})%?\b/g).map(Number);

          if (res[0] > brightness || res[1] > brightness || res[2] > brightness) {
            node.style[style] = (0, _interopColor2.default)(color, res, amount);
          }
        }
      });
    }

    /**
     * Applies color temperature to a certain node and its descendants.
     * @param {Element} node
     * @param {integer} temperature
     * @return {Flux}
     */

  }, {
    key: 'setNodeTemperature',
    value: function setNodeTemperature(node, temperature) {
      var nodes = this._getDOMNodes(node);
      this._changeNodesColor(nodes, temperature);
      return this;
    }

    /**
     * Apply color temperature to the whole page.
     * @param {integer} temperature]
     * @return {Flux}
     */

  }, {
    key: 'setPageTemperature',
    value: function setPageTemperature(temperature) {
      this.setNodeTemperature(document.body, temperature);
      return this;
    }

    /**
     * Requests user location from the browser.
     * @param  {function} [cb=null]
     * @return {Flux}
     */

  }, {
    key: 'requestUserLocation',
    value: function requestUserLocation(cb) {
      if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          cb(coords);
        }, function (error) {
          cb(null);
          throw new Error('FluxJS: Error fetching user location.', error);
        });
      } else {
        cb(null);
      }
      return this;
    }

    /**
     * Updates instance location data.
     * @param  {function} [cb=null]
     * @return {Flux}
     */

  }, {
    key: 'updateUserLocation',
    value: function updateUserLocation() {
      var _this3 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.requestUserLocation(function (coords) {
        if (coords) {
          _this3.location = coords;
          _this3._saveUserLocation(coords);
          if (cb) cb(coords);
        } else {
          if (cb) cb(null);
        }
      });
    }

    /**
     * Returns user location if browser supports it.
     * @param  {function} [cb=null]
     * @return {Flux}
     */

  }, {
    key: 'getUserLocation',
    value: function getUserLocation() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.location) {
        if (cb) cb(this.location);
        return this;
      }

      var ls = localStorage.getItem(this.localStorageKey);
      if (ls) {
        var coords = JSON.parse(ls);
        if (coords.latitude && coords.longitude) {
          this.location = coords;
          cb(coords);
          return this;
        }
      }

      this.updateUserLocation(cb);
      return this;
    }

    /**
     * Applies color temperature to the target based on the user location.
     * @param {Element} [target=null]
     */

  }, {
    key: 'adjustTemperature',
    value: function adjustTemperature() {
      var _this4 = this;

      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.getUserLocation(function (coords) {
        if (coords) {
          var temp = _this4.getTemperature();
          if (target) {
            _this4.setNodeTemperature(target, temp);
          } else {
            _this4.setPageTemperature(temp);
          }
        }
      });
      return this;
    }

    /**
     * Applies color temperature to the target based on the user location.
     * @param {Element} [target=null]
     */

  }, {
    key: 'disable',
    value: function disable() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (target) {
        this.setNodeTemperature(target, this.dayTemperature);
      } else {
        this.setPageTemperature(this.dayTemperature);
      }
      return this;
    }

    /**
     * Returns temperature for current time.
     * @return {integer}
     */

  }, {
    key: 'getTemperature',
    value: function getTemperature() {
      if (this.isDark()) {
        return this.nightTemperature;
      }
      return this.dayTemperature;
    }

    /**
     * Sets new date for the instance.
     * @return {Flux}
     */

  }, {
    key: 'setDate',
    value: function setDate(date) {
      this.date = date;
      return this;
    }

    /**
     * Returns indicator whether it is currently dark or not.
     * @return {boolean}
     */

  }, {
    key: 'isDark',
    value: function isDark() {
      if (this.location) {
        var date = this.date || new Date();
        var solarCalc = this._initSolarCalc(this.location, date);
        var sunrise = solarCalc.sunriseEnd;
        var sunset = solarCalc.sunsetStart;
        return date > sunset || date < sunrise;
      }
      return null;
    }
  }]);

  return Flux;
}();

exports.default = Flux;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).default;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = interopColor;

var _toHex = __webpack_require__(8);

var _toHex2 = _interopRequireDefault(_toHex);

var _rgbToHex = __webpack_require__(1);

var _rgbToHex2 = _interopRequireDefault(_rgbToHex);

var _hexToRgb = __webpack_require__(0);

var _hexToRgb2 = _interopRequireDefault(_hexToRgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns object representing colors in RGB format.
 * @param  {mixed} color Color either as object, string or an array.
 * @return {object}
 */
function getRgb(color) {
  var red = void 0,
      green = void 0,
      blue = void 0,
      alpha = void 0;
  if (typeof color === 'string') {
    return (0, _hexToRgb2.default)(color);
  } else if (Array.isArray(color)) {
    var _color = _slicedToArray(color, 4);

    red = _color[0];
    green = _color[1];
    blue = _color[2];
    alpha = _color[3];

    return {
      red: red,
      green: green,
      blue: blue,
      alpha: alpha || 1
    };
  } else if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
    if (typeof color.red !== 'undefined') {
      var temp = Object.assign({}, color);
      temp.alpha = color.alpha || 1;
      return temp;
    } else {
      return {
        red: color.r,
        green: color.g,
        blue: color.b,
        alpha: color.alpha || 1
      };
    }
  }
}

/**
 * Returns color achieved by mixing two given colors and a strengths with which
 * one color affects the other.
 * @param  {mixed} a           First color.
 * @param  {mixed} b           Second color
 * @param  {Number} [amount=1] Strength at which colors mix.
 * @return {string}            Resulting color as a HEX string.
 */
function interopColor(a, b) {
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  a = getRgb(a);
  b = getRgb(b);

  var red = Math.round(a.red + amount * (b.red - a.red));
  var green = Math.round(a.green + amount * (b.green - a.green));
  var blue = Math.round(a.blue + amount * (b.blue - a.blue));

  return '#' + (0, _toHex2.default)(red) + (0, _toHex2.default)(green) + (0, _toHex2.default)(blue);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = kelvinToRgb;
/**
 * Returns object representing colors in RGB format for a given color
 * temperature in Kelvin.
 * @param  {float} kelvin
 * @return {object}
 */
function kelvinToRgb(kelvin) {
  var red = void 0,
      green = void 0,
      blue = void 0;
  var temperature = kelvin / 100.0;

  // Calculate red.
  if (temperature <= 66.0) {
    red = 255;
  } else {
    red = temperature - 60.0;
    red = 329.698727446 * Math.pow(red, -0.1332047592);
    if (red < 0) red = 0;
    if (red > 255) red = 255;
  }

  // Calculate green.
  if (temperature <= 66.0) {
    green = temperature;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;
    if (green < 0) green = 0;
    if (green > 255) green = 255;
  } else {
    green = temperature - 60.0;
    green = 288.1221695283 * Math.pow(green, -0.0755148492);
    if (green < 0) green = 0;
    if (green > 255) green = 255;
  }

  // Calculate blue.
  if (temperature >= 66.0) {
    blue = 255;
  } else {

    if (temperature <= 19.0) {
      blue = 0;
    } else {
      blue = temperature - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }
  }

  return { red: Math.round(red), green: Math.round(green), blue: Math.round(blue) };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sun = __webpack_require__(7);

var _sun2 = _interopRequireDefault(_sun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var degreesBelowHorizon = {
  sunrise: 0.833,
  sunriseEnd: 0.3,
  twilight: 6,
  nauticalTwilight: 12,
  night: 18,
  goldenHour: -6
};

var SolarCalc = function () {
  function SolarCalc(date, latitude, longitude) {
    _classCallCheck(this, SolarCalc);

    this.date = date;
    this.lat = latitude;
    this.longitude = longitude;

    this.sun = new _sun2.default(date, latitude, longitude);
  }

  _createClass(SolarCalc, [{
    key: 'solarNoon',
    get: function get() {
      return this.sun.solarNoon;
    }
  }, {
    key: 'sunrise',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.sunrise, true);
    }
  }, {
    key: 'sunset',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.sunrise);
    }
  }, {
    key: 'sunriseEnd',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.sunriseEnd, true);
    }
  }, {
    key: 'sunsetStart',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.sunriseEnd, false);
    }
  }, {
    key: 'civilDawn',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.twilight, true);
    }
  }, {
    key: 'dawn',
    get: function get() {
      return this.civilDawn;
    }
  }, {
    key: 'civilDusk',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.twilight, false);
    }
  }, {
    key: 'dusk',
    get: function get() {
      return this.civilDusk;
    }
  }, {
    key: 'nauticalDawn',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.nauticalTwilight, true);
    }
  }, {
    key: 'nauticalDusk',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.nauticalTwilight, false);
    }
  }, {
    key: 'nightStart',
    get: function get() {
      return this.astronomicalDusk();
    }
  }, {
    key: 'astronomicalDusk',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.night, false);
    }
  }, {
    key: 'astronomicalDawn',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.night, true);
    }
  }, {
    key: 'nightEnd',
    get: function get() {
      return this.astronomicalDawn;
    }
  }, {
    key: 'goldenHourStart',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.goldenHour, false);
    }
  }, {
    key: 'goldenHourEnd',
    get: function get() {
      return this.sun.timeAtAngle(degreesBelowHorizon.goldenHour, true);
    }
  }]);

  return SolarCalc;
}();

exports.default = SolarCalc;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns UTC formatted date.
 * @param  {Date}    date
 * @param  {integer} minutes
 * @return {Date}
 */
function formatDate(date, minutes) {
  var seconds = (minutes - Math.floor(minutes)) * 60;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, minutes, seconds));
}

/**
 * Returns Julian century since J2000.0.
 * @param  {float} jd
 * @return {float}
 */
function calcTimeJulianCent(jd) {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Determines whether given year is a leap year.
 * @param  {integer}  yr
 * @return {boolean}
 */
function isLeapYear(yr) {
  return yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0;
}

/**
 * Returns day of year from JD2000.0.
 * @param  {float} jd
 * @return {float}
 */
function calcDoyFromJD(jd) {
  var z = Math.floor(jd + 0.5);
  var f = jd + 0.5 - z;
  var A = z;

  if (z >= 2299161) {
    var alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }

  var B = A + 1524;
  var C = Math.floor((B - 122.1) / 365.25);
  var D = Math.floor(365.25 * C);
  var E = Math.floor((B - D) / 30.6001);
  var day = B - D - Math.floor(30.6001 * E) + f;
  var month = E < 14 ? E - 1 : E - 13;
  var year = month > 2 ? C - 4716 : C - 4715;

  var k = isLeapYear(year) ? 1 : 2;
  var doy = Math.floor(275 * month / 9) - k * Math.floor((month + 9) / 12) + day - 30;
  return doy;
}

/**
 * Returns degrees based on given radians.
 * @param  {float} angleRad Angle in radians.
 * @return {float}
 */
function radToDeg(angleRad) {
  return 180.0 * angleRad / Math.PI;
}

/**
 * Returns radians based on given degrees.
 * @param  {float} angleDeg Andle in degrees.
 * @return {float}
 */
function degToRad(angleDeg) {
  return Math.PI * angleDeg / 180.0;
}

/**
 * Returns the Geometric Mean Longitude of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Geometric Mean Longitude of the Sun in degrees.
 */
function calcGeomMeanLongSun(t) {
  var L0 = 280.46646 + t * (36000.76983 + t * 0.0003032);

  while (L0 > 360.0) {
    L0 -= 360.0;
  }

  while (L0 < 0.0) {
    L0 += 360.0;
  }

  return L0;
}

/**
 * Returns Geometric Mean Anomaly of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Geometric Mean Anomaly of the Sun in degrees.
 */
function calcGeomMeanAnomalySun(t) {
  return 357.52911 + t * (35999.05029 - 0.0001537 * t);
}

/**
 * Returns eccentricity of Earth's orbit.
 * @param  {float} t Numer of Julian centuries since J2000.0.
 * @return {float}
 */
function calcEccentricityEarthOrbit(t) {
  return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
}
/**
 * Returns equation of center for the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Center for the Sun in degrees.
 */
function calcSunEqOfCenter(t) {
  var m = calcGeomMeanAnomalySun(t);
  var mrad = degToRad(m);
  var sinm = Math.sin(mrad);
  var sin2m = Math.sin(mrad + mrad);
  var sin3m = Math.sin(mrad + mrad + mrad);
  return sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
}

/**
 * Returns true longitude of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}  Longitude in degrees.
 */
function calcSunTrueLong(t) {
  var l0 = calcGeomMeanLongSun(t);
  var c = calcSunEqOfCenter(t);
  var O = l0 + c;
  return O;
}

/**
 * Returns apparent longitude of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}  Longitude in degrees.
 */
function calcSunApparentLong(t) {
  var o = calcSunTrueLong(t);
  var omega = 125.04 - 1934.136 * t;
  var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
  return lambda;
}

/**
 * Returns mean obliquity of the ecliptic.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Mean obliquity in defrees.
 */
function calcMeanObliquityOfEcliptic(t) {
  var seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * 0.001813));
  var e0 = 23.0 + (26.0 + seconds / 60.0) / 60.0;
  return e0;
}

/**
 * Returns corrected obliquity of the ecliptic.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Corrected obliquity in defrees.
 */
function calcObliquityCorrection(t) {
  var e0 = calcMeanObliquityOfEcliptic(t);
  var omega = 125.04 - 1934.136 * t;
  var e = e0 + 0.00256 * Math.cos(degToRad(omega));
  return e;
}

/**
 * Returns declination of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Declination of the Sun in degrees.
 */
function calcSunDeclination(t) {
  var e = calcObliquityCorrection(t);
  var lambda = calcSunApparentLong(t);

  var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
  var theta = radToDeg(Math.asin(sint));
  return theta;
}

/**
 * Returns difference between true solar time and mean time.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Difference in minutes.
 */
function calcEquationOfTime(t) {
  var epsilon = calcObliquityCorrection(t);
  var l0 = calcGeomMeanLongSun(t);
  var e = calcEccentricityEarthOrbit(t);
  var m = calcGeomMeanAnomalySun(t);

  var y = Math.pow(Math.tan(degToRad(epsilon) / 2.0), 2);

  var sin2l0 = Math.sin(2.0 * degToRad(l0));
  var sinm = Math.sin(degToRad(m));
  var cos2l0 = Math.cos(2.0 * degToRad(l0));
  var sin4l0 = Math.sin(4.0 * degToRad(l0));
  var sin2m = Math.sin(2.0 * degToRad(m));

  var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
  return radToDeg(Etime) * 4.0;
}

/**
 * Returns the hour angle of the Sun at sunrize for the latitude.
 * @param  {float} angle
 * @param  {float} lat      Latitude of the observer in degrees.
 * @param  {float} solarDec Declination angle of the Sun in degrees.
 * @return {float}
 */
function calcHourAngle(angle, lat, solarDec) {
  var latRad = degToRad(lat);
  var sdRad = degToRad(solarDec);
  var HAarg = Math.cos(degToRad(90 + angle)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad);
  var HA = Math.acos(HAarg);
  return HA;
}

/**
 * Checks whether given input is a number.
 * @param  {string}  inputVal
 * @return {boolean}
 */
function isNumber(inputVal) {
  var oneDecimal = false;
  var inputStr = '' + inputVal;
  for (var i = 0; i < inputStr.length; i++) {
    var oneChar = inputStr.charAt(i);
    if (i === 0 && (oneChar === '-' || oneChar === '+')) {
      continue;
    }
    if (oneChar === '.' && !oneDecimal) {
      oneDecimal = true;
      continue;
    }
    if (oneChar < '0' || oneChar > '9') {
      return false;
    }
  }
  return true;
}

function getJD(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var A = Math.floor(year / 100);
  var B = 2 - A + Math.floor(A / 4);
  var JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JD;
}

/**
 * Returns Date of the solar noon for a given day at the given location.
 * @param  {flaot} jd         Number of Julian centuries since J2000.0.
 * @param  {float} longitude
 * @param  {Date}  date
 * @return {Date}
 */
function calcSolNoon(jd, longitude, date) {
  var tnoon = calcTimeJulianCent(jd - longitude / 360.0);
  var eqTime = calcEquationOfTime(tnoon);
  var solNoonOffset = 720.0 - longitude * 4 - eqTime; // In minutes.
  var newt = calcTimeJulianCent(jd + solNoonOffset / 1440.0);
  eqTime = calcEquationOfTime(newt);
  var solNoonLocal = 720 - longitude * 4 - eqTime; // In minutes.

  while (solNoonLocal < 0.0) {
    solNoonLocal += 1440.0;
  }

  while (solNoonLocal >= 1440.0) {
    solNoonLocal -= 1440.0;
  }

  return formatDate(date, solNoonLocal);
}

/**
 * Returns Date based on a given julian date input.
 * @param  {float} jd
 * @return {Date}
 */
function dayString(jd) {
  if (jd < 900000 || jd > 2817000) {
    return 'error';
  } else {
    var z = Math.floor(jd + 0.5);
    var f = jd + 0.5 - z;
    var A = void 0;
    if (z < 2299161) {
      A = z;
    } else {
      var alpha = Math.floor((z - 1867216.25) / 36524.25);
      A = z + 1 + alpha - Math.floor(alpha / 4);
    }
    var B = A + 1524;
    var C = Math.floor((B - 122.1) / 365.25);
    var D = Math.floor(365.25 * C);
    var E = Math.floor((B - D) / 30.6001);
    var day = B - D - Math.floor(30.6001 * E) + f;
    var month = E < 14 ? E - 1 : E - 13;
    var year = month > 2 ? C - 4716 : C - 4715;
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  }
}

/**
 * Returs time in minutes of UTC for a sunrise or sunset at a given day and location.
 * @param  {integer} rise     1 - sunrise, 0 - sunset.
 * @param  {float}   angle
 * @param  {float}   JD
 * @param  {float}   latitude
 * @param  {float}   longitude
 * @return {float}
 */
function calcSunriseSetUTC(rise, angle, JD, latitude, longitude) {
  var t = calcTimeJulianCent(JD);
  var eqTime = calcEquationOfTime(t);
  var solarDec = calcSunDeclination(t);
  var hourAngle = calcHourAngle(angle, latitude, solarDec);
  if (!rise) hourAngle = -hourAngle;
  var delta = longitude + radToDeg(hourAngle);
  var timeUTC = 720 - 4.0 * delta - eqTime;
  return timeUTC;
}

/**
 * Returs time in minutes  for a sunrise or sunset at a given day and location.
 * @param  {integer} rise     1 - sunrise, 0 - sunset.
 * @param  {float}   angle
 * @param  {float}   JD
 * @param  {float}   latitude
 * @param  {float}   longitude
 * @return {float}
 */
function calcSunriseSet(rise, angle, JD, date, latitude, longitude) {
  var timeUTC = calcSunriseSetUTC(rise, angle, JD, latitude, longitude);
  var newTimeUTC = calcSunriseSetUTC(rise, angle, JD + timeUTC / 1440.0, latitude, longitude);
  if (isNumber(newTimeUTC)) {
    return formatDate(date, newTimeUTC);
  } else {
    var doy = calcDoyFromJD(JD);
    // No sunrise/set found.

    if (latitude > 66.4 && doy > 79 && doy < 267 || latitude < -66.4 && (doy < 83 || doy > 263)) {
      // Previous sunrise/next sunset.
      var jdy = calcJDofNextPrevRiseSet(!rise, rise, angle, JD, latitude, longitude);
      return dayString(jdy);
    } else {
      // Previous sunset/next sunrise.
      var _jdy = calcJDofNextPrevRiseSet(rise, rise, angle, JD, latitude, longitude);
      return dayString(_jdy);
    }
  }
}

/**
 * Calculate julian day of the next or previous sunrise or sunset.
 * @param  {integer} next      Indicator of next or previous day.
 * @param  {integer} rise      indicator of sunrise or sunset we are interested in.
 * @param  {float}   angle
 * @param  {float}   JD
 * @param  {float}   latitude
 * @param  {float}   longitude
 * @return {float}
 */
function calcJDofNextPrevRiseSet(next, rise, angle, JD, latitude, longitude) {
  var julianday = JD;
  var increment = next ? 1.0 : -1.0;

  var time = calcSunriseSetUTC(rise, angle, julianday, latitude, longitude);

  while (!isNumber(time)) {
    julianday += increment;
    time = calcSunriseSetUTC(rise, angle, julianday, latitude, longitude);
  }

  return julianday;
}

/**
 * Sun with helper functions helping us determine various details about Sun
 * position in the sky at a given time, date and location.
 * @type {class}
 */

var Sun = function () {
  /**
   * Initializes class instance with a given date and location.
   * @param  {Date} date
   * @param  {float} latitude
   * @param  {float} longitude
   * @return {undefined}
   */
  function Sun(date, latitude, longitude) {
    _classCallCheck(this, Sun);

    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.julianDate = getJD(date);
  }

  /**
   * Returns time where current Sun object will be at the highest point (noon).
   * @return {Date}
   */


  _createClass(Sun, [{
    key: 'timeAtAngle',


    /**
     * Returns time when current Sun object reaches given angle.
     * @param  {float}   angle
     * @param  {integer} rising
     * @return {Date}
     */
    value: function timeAtAngle(angle, rising) {
      return calcSunriseSet(rising, angle, this.julianDate, this.date, this.latitude, this.longitude);
    }
  }, {
    key: 'solarNoon',
    get: function get() {
      return calcSolNoon(this.julianDate, this.longitude, this.date);
    }
  }]);

  return Sun;
}();

exports.default = Sun;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toHex;
/**
 * Returns hex code for a given number.
 * @param  {integer} n
 * @return {string}
 */
function toHex(n) {
  n = parseInt(Math.round(n), 10);
  if (isNaN(n)) return '00';
  n = Math.max(0, Math.min(n, 255));

  return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
}

/***/ })
/******/ ]);