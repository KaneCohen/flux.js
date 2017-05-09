/**
 * Available under BSD-3-Clause license
 * Copyright 2017 Kane Cohen <https://github.com/KaneCohen>
 */
import rgbToHex from './utils/rgbToHex';
import hexToRgb from './utils/hexToRgb';
import SolarCalc from './utils/solarCalc';
import kelvinToRgb from './utils/kelvinToRgb';
import interopColor from './utils/interopColor';

const STYLES = [
  'backgroundColor', 'borderTopColor', 'borderLeftColor',
  'borderRightColor', 'borderBottomColor', 'color'
];

const STYLE_CHECKS = {
  'borderTopColor': {
    prop: 'borderTopWidth',
    validate: (v) => { return parseInt(v, 10) > 0; }
  },
  'borderLeftColor': {
    prop: 'borderLeftWidth',
    validate: (v) => { return parseInt(v, 10) > 0; }
  },
  'borderRightColor': {
    prop: 'borderRightWidth',
    validate: (v) => { return parseInt(v, 10) > 0; }
  },
  'borderBottomColor': {
    prop: 'borderBottomWidth',
    validate: (v) => { return parseInt(v, 10) > 0; }
  }
};

const DEFAULTS = {
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
  if (! STYLE_CHECKS[style]) {
    return true;
  }

  let rules = STYLE_CHECKS[style];
  return rules.validate(styles[rules.prop]);
}

class Flux {
  /**
   * Constructor.
   * @param  {object} options
   * @return {undefined}
   */
  constructor(options = {}) {
    Object.assign(this, {}, DEFAULTS, options);
    if (this.location) {
      this._saveUserLocation(this.location);
    }
  }

  _saveUserLocation(coords) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(coords));
  }

  /**
   * Initializes SolarCal instance based on a given Date and location coordinates.
   * @param  {object} location    Object containing latitude and longitude params.
   * @param  {Date}
   * @return {SolarCalc}
   */
  _initSolarCalc(coords, date) {
    return new SolarCalc(date, coords.latitude, coords.longitude);
  }

  /**
   * Returns an array of DOM nodes that belong to a given parent node.
   * @param  {Element} node Parent node.
   * @return {array}
   */
  _getDOMNodes(el) {
    let node = el;

    if (el.nodeName) {
      node = el;
    } else if (typeof node == 'string') {
      let el = document.querySelector(el);
      if (! el) {
        throw new Error(`FluxJS: Failed to find element with selector ${el}.`);
      }
      node = el;
    } else {
      throw new Error(`FluxJS: Given element could not be found on the page.`);
    }


    let nodes = [];
    let loop = function(node) {
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

  _normalizeStyle(style) {
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
  _fixBodyBackground(node) {
    if (node.nodeName === 'BODY') {
      let styles = window.getComputedStyle(node);
      let bg = this._normalizeStyle(styles.backgroundColor);
      let res = bg.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
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
  _changeNodesColor(nodes, temperature) {
    const brightness = this.brightness;
    const amount = this.colorMixAmount;
    const color = kelvinToRgb(temperature);

    this._fixBodyBackground(nodes[0]);
    nodes.forEach(node => {
      this._changeNodeColor(node, temperature, amount, brightness, color);
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
  _changeNodeColor(node, temperature, amount, brightness, color) {
    let styles = window.getComputedStyle(node);
    STYLES.forEach(style => {
      if (! validateStyle(styles, style)) {
        return false;
      }

      const styleKey = this.styleKey + style;

      if (temperature === this.dayTemperature && typeof node[styleKey] !== 'undefined') {
        node.style[style] = node[styleKey];
        delete node[styleKey];
      } else if (temperature !== this.dayTemperature && typeof node[styleKey] === 'undefined') {
        const styleVal = this._normalizeStyle(node[styleKey] || styles[style]);
        node[styleKey] = node.style[style] || null;
        const res = styleVal.match(/(0?\.?\d{1,3})%?\b/g).map(Number);

        if (res[0] > brightness || res[1] > brightness || res[2] > brightness) {
          node.style[style] = interopColor(color, res, amount);
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
  setNodeTemperature(node, temperature) {
    let nodes = this._getDOMNodes(node);
    this._changeNodesColor(nodes, temperature);
    return this;
  }

  /**
   * Apply color temperature to the whole page.
   * @param {integer} temperature]
   * @return {Flux}
   */
  setPageTemperature(temperature) {
    this.setNodeTemperature(document.body, temperature);
    return this;
  }

  /**
   * Requests user location from the browser.
   * @param  {function} [cb=null]
   * @return {Flux}
   */
  requestUserLocation(cb) {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        cb(coords);
      }, (error) => {
        cb(null);
        throw new Error(`FluxJS: Error fetching user location.`, error);
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
  updateUserLocation(cb = null) {
    this.requestUserLocation((coords) => {
      if (coords) {
        this.location = coords;
        this._saveUserLocation(coords);
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
  getUserLocation(cb = null) {
    if (this.location) {
      if (cb) cb(this.location);
      return this;
    }

    let ls = localStorage.getItem(this.localStorageKey);
    if (ls) {
      let coords = JSON.parse(ls);
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
  adjustTemperature(target = null) {
    this.getUserLocation((coords) => {
      if (coords) {
        let temp = this.getTemperature();
        if (target) {
          this.setNodeTemperature(target, temp);
        } else {
          this.setPageTemperature(temp);
        }
      }
    });
    return this;
  }

  /**
   * Applies color temperature to the target based on the user location.
   * @param {Element} [target=null]
   */
  disable(target = null) {
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
  getTemperature() {
    if (this.isDark()) {
      return this.nightTemperature;
    }
    return this.dayTemperature;
  }

  /**
   * Sets new date for the instance.
   * @return {Flux}
   */
  setDate(date) {
    this.date = date;
    return this;
  }

  /**
   * Returns indicator whether it is currently dark or not.
   * @return {boolean}
   */
  isDark() {
    if (this.location) {
      const date = this.date || new Date();
      let solarCalc = this._initSolarCalc(this.location, date);
      let sunrise = solarCalc.sunriseEnd;
      let sunset = solarCalc.sunsetStart;
      return date > sunset || date < sunrise;
    }
    return null;
  }
}

export default Flux;
