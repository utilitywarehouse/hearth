export default function recursiveCamelCase(obj) {
  if (Array.isArray(obj)) return obj.map(recursiveCamelCase);
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[camelCase(key)] = recursiveCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}
