/**
 * Returns hex code for a given number.
 * @param  {integer} n
 * @return {string}
 */
export default function toHex(n) {
  n = parseInt(Math.round(n), 10);
  if (isNaN(n)) return '00';
  n = Math.max(0, Math.min(n, 255));

  return `0123456789ABCDEF`.charAt((n - n % 16) / 16) +
    `0123456789ABCDEF`.charAt(n % 16);
}
