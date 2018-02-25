import {
  complement,
  converge,
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
  reduce,
  min,
} from 'ramda'
import { isNonEmptyString } from 'ramda-adjunct'

const RE_LINE = /^[^\n]+/gm
const RE_EMPTY_LINE = /^\s+$/
const RE_LEADING_WHITESPACE = /\s+/
const NEWLINE = `\n`

const joinWithNewline = join(NEWLINE)

const trimLinesToRoot = (numberOfSpaces, lines) =>
  map(replace(new RegExp(` {${numberOfSpaces}}`), ``))(lines)

const isLastLineOnlyWhitespace = compose(
  complement(isEmpty),
  match(RE_EMPTY_LINE),
  last
)

const leadingSpaces = match(RE_LEADING_WHITESPACE)

const leadingSpaceCount = compose(length, head, leadingSpaces)

const minList = converge(reduce(min), [head, identity])

const splitIntoLines = match(RE_LINE)

const removeLastLineIfWhitespace = when(isLastLineOnlyWhitespace, init)

const countSpacesForLineWithLeastLeadingWhitespace = compose(
  minList,
  map(leadingSpaceCount)
)

const detectAndTrimLinesToRoot = converge(trimLinesToRoot, [
  countSpacesForLineWithLeastLeadingWhitespace,
  identity,
])

const dedent = when(
  isNonEmptyString,
  compose(
    joinWithNewline,
    detectAndTrimLinesToRoot,
    removeLastLineIfWhitespace,
    splitIntoLines
  )
)

export default dedent
