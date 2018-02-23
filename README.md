# indent-to-first-line

[![NPM Version](https://img.shields.io/npm/v/indent-to-first-line.svg)](https://www.npmjs.com/package/indent-to-first-line)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/indent-to-first-line.svg)](https://codecov.io/gh/Undistraction/indent-to-first-line)
[![Build Status](https://img.shields.io/travis/Undistraction/indent-to-first-line.svg)](https://travis-ci.org/Undistraction/indent-to-first-line)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)
[![Node Security](https://nodesecurity.io/orgs/dwyl/projects/1047e39b-0d4a-45ff-af65-c04afc41fc20/badge)](https://nodesecurity.io/orgs/dwyl/projects/1047e39b-0d4a-45ff-af65-c04afc41fc20)

A simple utility function to make working with multiline strings defined in template strings much easier.

## Install

```
yarn add indent-to-first-line
```

or

```
npm install indent-to-first-line
```

## Usage

Template strings are great because you can easily define multiline strings and format them in a visually pleasing way. The problem comes when you want to work with them, for example you want to declare an expected string and test it for equality:

```javascript
const example = `This is a string
                  - here is an indented line
                  - here is another
                    - and here is a doubly indented line`
```

Although this string looks like the string you might be expecting, when you try and compare it, you will realise that there are lots of additional spaces within the string. If you were to replace each space with an underscore you would see:

```javascript
;`This is a string
__________________- here is an indented line
__________________- here is another
____________________- and here is a doubly indented line`
```

Which is probably not what you want.

`indent-to-first-line` helps you solve this problem by trimming the leading spaces of a string away so the string is how you expect. To do this it needs you to do one critical thing - you need to start the first line of the string on a new line so that it can detect the number of spaces before the first line and adjust the others accordingly:

```javascript
const example = indentToFirstLine(
  `This is a string
                  - here is an indented line
                  - here is another
                    - and here is a doubly indented line`
)
```

This will give you a string like this:

```javascript
;`This is a string
  - here is an indented line
  - here is another
    - and here is a doubly indented line`
```

This first empty line will be removed, as will any trailing lines that consist only of whitespace, so the following will result in exactly the same string:

```javascript
const example = indentToFirstLine(
  `This is a string
                  - here is an indented line
                  - here is another
                    - and here is a doubly indented line
                `
)
```

Note: If you don't put the first line of chars on a new line, the function will have no effect as there will be no leading whitespace there, meaning it cannot decide how much whitespace to remove from subsequent lines.

## Maintainance

### Release

```bash
yarn run publish:patch
```

or

```bash
yarn run publish:minor
```

or

```bash
yarn run publish:major
```
