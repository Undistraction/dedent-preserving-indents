import dedent from '../index'

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

    const result = dedent(value)

    expect(result).toEqual(expected)
  })

  it(`strips indents to shortest line`, () => {
    const value = `
              two
              two
                three
            one
                three
                  four
              two`

    const expected = `  two
  two
    three
one
    three
      four
  two`

    const result = dedent(value)

    expect(result).toEqual(expected)
  })

  it(`strips trailing whitespace`, () => {
    const value = `
            one
              two
            `

    const expected = `one
  two`

    const result = dedent(value)

    expect(result).toEqual(expected)
  })

  it(`works with single line empty string`, () => {
    const value = ``

    const expected = ``

    const result = dedent(value)

    expect(result).toEqual(expected)
  })

  it(`single line of whitespace will become empty string`, () => {
    const value = `     `

    const expected = ``

    const result = dedent(value)

    expect(result).toEqual(expected)
  })

  it(`multiple lines of whitespace will become empty string`, () => {
    const value = `


    `

    const expected = ``

    const result = dedent(value)

    expect(result).toEqual(expected)
  })
})
