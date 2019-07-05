const {format} = require('../../src/pipelines/5-output-formater')

function testFormat(cb) {
    const input = [
        {name: 'A1', content: '5', circular_with: null, has_formula: false, value: 5},
        {name: 'A2', content: 'A1 5 * B1 +', circular_with: null, has_formula: true, value: 31},
        {name: 'B1', content: '6', circular_with: null, has_formula: false, value: 6}
    ]

    const expected = 'A1\n5\nA2\n31\nB1\n6'

    const output = format(input)

    cb(output === expected)
}

function testFormatWithCircular(cb) {
    const input = [
        {name: 'A1', content: 'A2', circular_with: 'A2', has_formula: true, value: null},
        {name: 'A2', content: 'A1', circular_with: 'A1', has_formula: true, value: null}
    ]

    const expected = 'Circular dependency between A1 and A2 detected'

    const output = format(input)

    cb(output === expected)
}

module.exports = {
    testFormat,
    testFormatWithCircular
}