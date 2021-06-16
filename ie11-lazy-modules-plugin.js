'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const replace = require('replace-in-file');
exports.default = {
  pre(options) {},
  config(cfg) {
    return cfg;
  },
  post(options) {
    const newVersion = 'es2015';
    const oldVersion = 'es5';

    const result = replace.sync({
      files: `dist/**/main-${oldVersion}*.js`,
      from: new RegExp(`\\+"-${newVersion}\\.`, 'i'),
      to: `+"-${oldVersion}.`,
      countMatches: true
    });

    console.info();
    console.info('********** ie11-lazy-modules-plugin *********************************************************');
    console.info(`This plugin repairs the "${oldVersion}" build for older browsers.`);
    console.info(`Replace "${newVersion}" through "${oldVersion}" in the "${oldVersion}" build...`);
    let hasError = false;
    result.forEach((entry) => {
      if (entry.hasChanged === true) {
        if (entry.numMatches === 1 && entry.numReplacements === 1) {
          console.info(`"${entry.file}"... ok!`);
        } else {
          hasError = true;
          console.error(`"${entry.file}"... Error!`);
        }
      }
    });

    if (!hasError) {
      console.info(`Success!`);
    } else {
      console.error('Maybe the lazy modules does not work in older browsers!');
    }
    console.info('*********************************************************************************************');
    console.info();
  }
};
//# sourceMappingURL=ie-lazy-bundle-plugin.js.map
