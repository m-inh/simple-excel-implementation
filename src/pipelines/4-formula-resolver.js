function resolveAllFormula(cells, cb) {
    cb(cells.map((c) => {
        return {
            ...c,
            value: c.has_formula ? resolveFormula(c.content, cells) : parseFloat(c.content)
        }
    }))
}

function resolveCellValue(name, cells) {
    const cell = cells.find(c => c.name === name)
    return cell.has_formula ? resolveFormula(cell.content, cells) : parseFloat(cell.content)
}

function isCellName(text) {
    const pattern = /[a-zA-Z]/g
    return pattern.test(text)
}

function resolveFormula(formula, cells) {
    const e = formula.split(' ')
    const s = []
    for (let i in e) {
        let t = e[i]
        if (isCellName(t)) {
            t = resolveCellValue(t, cells)
        }

        let n = parseFloat(t)

        if (!isNaN(n))
            s.push(n)
        else {
            const o2 = s.pop()
            const o1 = s.pop()

            switch (t) {
                case '+':
                    s.push(o1 + o2);
                    break;
                case '-':
                    s.push(o1 - o2);
                    break;
                case '*':
                    s.push(o1 * o2);
                    break;
                case '/':
                    s.push(o1 / o2);
                    break;
                case '^':
                    s.push(Math.pow(o1, o2));
                    break;
            }
        }
    }

    return s.pop()
}

module.exports = {
    resolveAllFormula,
    resolveFormula
}