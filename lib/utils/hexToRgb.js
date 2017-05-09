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
export default function hexToRgba(hex) {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  hex = hex.toUpperCase();

  let arr = [];
  for (let i = 0; i < 6; i++) {
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
