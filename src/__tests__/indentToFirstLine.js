import indentToFirstLine from '../index'

describe(`indent-to-first-line`, () => {
  it(`strips indents to first line`, () => {
    const value = `
            one
              two
              two
                three
              two
                three
                  four
              two
            one`

    const expected = `one
  two
  two
    three
  two
    three
      four
  two
one`

    const result = indentToFirstLine(value)

    expect(result).toEqual(expected)
  })

  it(`strips ignores trailing whitespace`, () => {
    const value = `
            one
              two
            `

    const expected = `one
  two`

    const result = indentToFirstLine(value)

    expect(result).toEqual(expected)
  })
})
