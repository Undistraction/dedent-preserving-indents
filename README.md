# dedent-preserving-indents

[![NPM Version](https://img.shields.io/npm/v/dedent-preserving-indents.svg)](https://www.npmjs.com/package/dedent-preserving-indents)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/dedent-preserving-indents.svg)](https://codecov.io/gh/Undistraction/dedent-preserving-indents)
[![Build Status](https://img.shields.io/travis/Undistraction/dedent-preserving-indents.svg)](https://travis-ci.org/Undistraction/dedent-preserving-indents)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)
[![Node Security](https://nodesecurity.io/orgs/dwyl/projects/b14b4e9c-faf5-46b7-b8aa-9b1c026c4b51/badge)](https://nodesecurity.io/orgs/dwyl/projects/b14b4e9c-faf5-46b7-b8aa-9b1c026c4b51)

A simple utility function to make working with multiline strings defined in template strings much easier.

There is already a library called [dedent](https://www.npmjs.com/package/dedent) which strips leading whitespace, but it doesn't preserve indentation relative to the line with the least leading whitespace, but this one does. 
 
## Install

```
yarn add dedent-preserving-indents
```

or

```
npm install dedent-preserving-indents
```

## Usage

Template strings are great because you can easily define multiline strings and format them in a visually pleasing way. The problem comes when you want to work with them, for example you want to declare an expected string and test it for equality:

```javascript
const example = `This is a string
                  - here is an indented line
                  - here is another
                    - and here is a doubly indented line`
```

Although this string looks like the string you might be expecting, when you try and compare it, you will realise that there are lots of additional spaces within the string from the indentation which includes both the indentation to get the lines to line up and any deliberate indentation included in your string. If you were to replace each space with a `•` you would see:

```text
This is a string
••••••••••••••••••- here is an indented line
••••••••••••••••••- here is another
••••••••••••••••••••- and here is a doubly indented line
```

Which is probably not what you want.

This lib helps you solve this problem by trimming the leading spaces of a string away so the string is how you expect. This library will check all lines and find the line(s) with the least leading spaces. It will then remove that many spaces from all lines. This results in the line(s) with the least leading whitespace having no leading whitespace, and any other indented lines being indented relative to this/these line(s)s

```javascript
const example = dedent(
                  `This is a string
                    - here is an indented line
                    - here is another
                      - and here is a doubly indented line`
)
```

This will give you a string like this:

```text
This is a string
  - here is an indented line
  - here is another
    - and here is a doubly indented line
```

### Important Caveats

You will probably have noticed that the first line is empty in the examples above. If you don't put the first line of chars on a new line, the function will have no effect as there will be no leading whitespace for that line, meaning no leading whitespace will be removed from the other lines. **Always put the first line on a newline**.

This first empty line will be removed, as will any trailing lines that consist only of whitespace, so the following will result in exactly the same string:

```javascript
const example = dedent(
                  `This is a string
                    - here is an indented line
                    - here is another
                      - and here is a doubly indented line
                `)
```

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
