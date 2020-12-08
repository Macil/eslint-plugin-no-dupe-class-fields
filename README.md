# eslint-plugin-no-dupe-class-fields

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/eslint-plugin-no-dupe-class-fields/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/eslint-plugin-no-dupe-class-fields.svg?style=flat)](https://www.npmjs.com/package/eslint-plugin-no-dupe-class-fields) [![CircleCI Status](https://circleci.com/gh/Macil/eslint-plugin-no-dupe-class-fields.svg?style=shield)](https://circleci.com/gh/Macil/eslint-plugin-no-dupe-class-fields) [![Greenkeeper badge](https://badges.greenkeeper.io/Macil/eslint-plugin-no-dupe-class-fields.svg)](https://greenkeeper.io/)

This project is an ESLint plugin which detects when classes have duplicate
fields, including methods and properties.

```js
class Foo {
  bar = 5;
  bar() {
    console.log('hello');
  }
}

let foo = new Foo();
foo.bar(); // Error because bar is 5. Whoops
```

This plugin will detect if there are multiple methods or properties with the
same name on a single class. This plugin is an upgraded version of the
built-in [no-dupe-class-members](https://eslint.org/docs/rules/no-dupe-class-members)
rule, which does not detect class properties. When you use this plugin's
recommended config, the built-in no-dupe-class-members rule will be disabled.

Class properties are currently an ECMAScript proposal, and are only supported
with [a babel plugin](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties).
ESLint does not support class properties by default, so you must currently use
the [babel-eslint](https://www.npmjs.com/package/babel-eslint) parser with ESLint
for this plugin to detect class properties.

This plugin is not recommended for use with Typescript because Typescript already does this check itself, and this plugin will incorrectly flag method overloads in type definitions.

## Configuration

1. Install babel-eslint and this plugin: `npm install --save-dev babel-eslint eslint-plugin-no-dupe-class-fields` or `yarn add --dev babel-eslint eslint-plugin-no-dupe-class-fields`.
2. Set the ESLint config's `parser` property to `babel-eslint`.
3. Add `plugin:no-dupe-class-fields/recommended` to the ESLint config's `extends` list.

Example:

```json
{
  "root": true,
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:no-dupe-class-fields/recommended"],
  "plugins": [],
  "rules": {
    "indent": ["error", 2]
  }
}
```
