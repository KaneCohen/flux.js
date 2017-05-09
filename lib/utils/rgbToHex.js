/**
 * Returns hex code for a color given in RGB format.
 * @param  {integer} red
 * @param  {integer} green
 * @param  {integer} blue
 * @return {string}
 */
export default function rgbToHex(red, green, blue) {
  const isPercent = red.toString().includes('%');

  if (typeof red === 'string') {
    const res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
    [red, green, blue] = res;
  } else if (Array.isArray(red)) {
    [red, green, blue] = red;
  } else if (typeof red === 'object') {
    if (typeof red.red !== 'undefined') {
      ({red, green, blue} = red);
    } else {
      let temp = red;
      red = temp.r;
      green = temp.g;
      blue = temp.b;
    }
  }

  if (typeof red !== 'number' ||
      typeof green !== 'number' ||
      typeof blue !== 'number' ||
      red > 255 ||
      green > 255 ||
      blue > 255
  ) {
    throw new TypeError('Expected three numbers below 256');
  }

  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
}
