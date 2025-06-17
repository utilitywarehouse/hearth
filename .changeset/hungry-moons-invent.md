---
'@utilitywarehouse/hearth-tokens': patch
---

- **Automated Index File Generation**:

  - **CSS Index**: The `create_css_index` action was implemented to automatically generate an `index.css` file. This action reads all CSS files in the build directory, filters out `index.css` itself, and creates `@import` statements for each CSS file, ensuring that all styles are included in the main CSS file.
  - **JavaScript Index**: The `create_browser_index` action was similarly implemented to generate an `index.js` file. This action reads all JavaScript files in the build directory, filters out `index.js` itself, and creates export statements for each JavaScript file, ensuring that all modules are accessible through the main JavaScript file.

These changes streamline the process of maintaining the index files, reducing the need for manual updates and ensuring that all generated files are correctly included in the respective index files.
