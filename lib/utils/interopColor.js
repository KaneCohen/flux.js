import toHex from './toHex';
import rgbToHex from './rgbToHex';
import hexToRgb from './hexToRgb';

/**
 * Returns object representing colors in RGB format.
 * @param  {mixed} color Color either as object, string or an array.
 * @return {object}
 */
function getRgb(color) {
  let red, green, blue, alpha;
  if (typeof color === 'string') {
    return hexToRgb(color);
  } else if (Array.isArray(color)) {
    [red, green, blue, alpha] = color;
    return {
      red,
      green,
      blue,
      alpha: alpha || 1
    };
  } else if (typeof color === 'object') {
    if (typeof color.red !== 'undefined') {
      let temp = Object.assign({}, color);
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
export default function interopColor(a, b, amount = 1) {
  a = getRgb(a);
  b = getRgb(b);

  let red = Math.round(a.red + amount * (b.red - a.red));
  let green = Math.round(a.green + amount * (b.green - a.green));
  let blue = Math.round(a.blue + amount * (b.blue - a.blue));

  return '#' + toHex(red) + toHex(green) + toHex(blue);
}
