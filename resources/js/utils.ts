export const hasValue = (value: any): boolean => {
  if (Array.isArray(value)) {
      return 0 < value.length;
  }
  else {
      return ['', null, undefined, NaN, false].indexOf(value) === -1;
  }
}