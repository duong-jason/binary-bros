# binary-bros

![Build Status](https://github.com/duong-jason/binary-bros/workflows/Unit%20Tests/badge.svg)
![Build Status](https://github.com/duong-jason/binary-bros/workflows/Format/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```bash
npm install jest jest-environment-jsdom
npm i browserify -g
```

## Using Browsify

```bash
browserify js/max-sum.js js/sort.js js/third-max.js -o js/bundle.js
```

## Tests

```bash
npm test  # unit-tests
npx prettier --check .  # format-check
```
