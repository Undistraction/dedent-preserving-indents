import {
  complement,
  when,
  last,
  init,
  match,
  compose,
  join,
  replace,
  map,
  length,
  head,
  isEmpty,
  identity,
  converge,
} from 'ramda'

const RE_LINE = /^[^\n]+/gm
const RE_EMPTY_LINE = /^\s+$/
const NEWLINE = `\n`

const joinWithNewline = join(NEWLINE)

const trimLinesToRoot = (numberOfSpaces, lines) =>
  map(replace(new RegExp(` {${numberOfSpaces}}`), ``))(lines)

const isLastLineOnlyWhitespace = compose(
  complement(isEmpty),
  match(RE_EMPTY_LINE),
  last
)

const leadingSpaces = compose(match(/\s+/), head)

const splitIntoLines = match(RE_LINE)

const removeLastLineIfWhitespace = when(isLastLineOnlyWhitespace, init)

const countLeadingSpacesOfFirstLine = compose(length, head, leadingSpaces)

const detectAndTrimLinesToRoot = converge(trimLinesToRoot, [
  countLeadingSpacesOfFirstLine,
  identity,
])

const indentToFirstLine = compose(
  joinWithNewline,
  detectAndTrimLinesToRoot,
  removeLastLineIfWhitespace,
  splitIntoLines
)

export default indentToFirstLine
