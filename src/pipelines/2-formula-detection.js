function detectFormula(cells, cb) {
    cb(cells.map((c) => {
        return {
            ...c,
            has_formula: isFormula(c.content)
        }
    }))
}

function isFormula(line) {
    const pattern = /[a-zA-Z]/g
    return pattern.test(line)
}

module.exports = {
    detectFormula,
    isFormula
}