const calcPercDiff = (initial, newVal) => {
    return {
        diffPerc: -100 * ((newVal - initial) / initial),
        rawDiff: newVal - initial,
        newPrice: newVal
    }
}

module.exports = {
    calcPercDiff: calcPercDiff
}