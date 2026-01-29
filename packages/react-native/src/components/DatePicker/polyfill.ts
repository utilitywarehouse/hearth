// @ts-expect-error - Polyfill for Date.toLocaleString to support timeZone option in React Native environment.
Date.prototype._toLocaleString = Date.prototype.toLocaleString;
// @ts-expect-error - Polyfill for Date.toLocaleString to support timeZone option in React Native environment.
Date.prototype.toLocaleString = function (a, b) {
  if (b && Object.keys(b).length === 1 && 'timeZone' in b && a === 'en-US') {
    return Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: b.timeZone,
    })
      .format(this)
      .replace(/(\d{2})\/(\d{2})\/(\d{4}),/g, '$3-$1-$2');
  }
  // @ts-expect-error - Polyfill for Date.toLocaleString to support timeZone option in React Native environment.
  return this._toLocaleString(a, b);
};
