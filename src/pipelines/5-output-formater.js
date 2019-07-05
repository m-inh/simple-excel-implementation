function format(cells) {
    const circularDependency = cells.find(c => c.circular_with !== null)
    if (circularDependency) {
        return `Circular dependency between ${circularDependency.name} and ${circularDependency.circular_with} detected`
    }

    const sorted = cells.sort((a, b) => a.name - b.name)
    return sorted.reduce((acc, c, i) => {
        return acc.concat(`${c.name}\n${c.value}${sorted.length - 1 === i ? '' : '\n'}`)
    }, '')
}

module.exports = {
    format
}