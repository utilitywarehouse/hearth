const addReactNativePrefix = (url: string) => {
  if (!url.startsWith('/?path=/docs/')) return url;
  return url.replace(/(\/\?path=\/docs\/)([^/]+)/, (full, prefix, slug) => {
    if (slug.startsWith('react-native_')) return full; // already prefixed
    return `${prefix}react-native_${slug}`;
  });
};
export default addReactNativePrefix;
