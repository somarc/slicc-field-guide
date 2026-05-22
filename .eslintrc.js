module.exports = {
root: true,
extends: 'airbnb-base',
env: {
browser: true,
},
parser: '@babel/eslint-parser',
parserOptions: {
allowImportExportEverywhere: true,
sourceType: 'module',
requireConfigFile: false,
},
rules: {
'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
'linebreak-style': 0, // disabled: GitHub web editor always commits CRLF
'max-len': 0, // disabled: boilerplate and custom code have long lines
'no-param-reassign': [2, { props: false }], // allow modifying properties of param
},
};
