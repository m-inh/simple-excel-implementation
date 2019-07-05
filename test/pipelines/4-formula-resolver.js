const {resolveAllFormula, resolveFormula} = require('../../src/pipelines/4-formula-resolver')

function testResolveAllFormula(cb) {
    const input = [
        {name: 'A1', content: '5', has_formula: false},
        {name: 'A2', content: 'A1 5 * B1 +', has_formula: true},
        {name: 'B1', content: '6', has_formula: false}
    ]

    const expected = [
        {name: 'A1', content: '5', has_formula: false, value: 5},
        {name: 'A2', content: 'A1 5 * B1 +', has_formula: true, value: 31},
        {name: 'B1', content: '6', has_formula: false, value: 6}
    ]

    resolveAllFormula(input, (output) => {
        const success = expected.reduce((rs, c) => {
            return rs && (output.find((o) => o.name === c.name).value === c.value)
        }, true)

        cb(success)
    })
}

function testResolveFormula(cb) {
    const inputCells = [
        {name: 'A1', content: '5', has_formula: false},
        {name: 'A2', content: 'A1 5 * B1 +', has_formula: true},
        {name: 'B1', content: '6', has_formula: false}
    ]

    const input = 'A1 5 * B1 +'
    const expected = 31

    const output = resolveFormula(input, inputCells)

    cb(output === expected)
}

module.exports = {
    testResolveAllFormula,
    testResolveFormula
}