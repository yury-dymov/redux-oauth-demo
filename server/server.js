require('babel-core/register');
['.css', '.ttf', '.woff', '.woff2'].forEach((ext) => { require.extensions[ext] = () => {}; });
require('babel-polyfill');
require('../src/server.js');
