---
'@utilitywarehouse/hearth-react-native-icons': patch
---

🌟 [ENHANCEMENT]: Ships a `hearth-manifest.json` listing every icon with how to use it from React Native

The package now includes `hearth-manifest.json`, which lists each icon's name, size, SVG
file and component name, with a `usage` block for React Native. Tools can read it from
`node_modules` to look up which icons exist in the installed version. The same list is
shipped in the SVG, React and React Native icon packages.
