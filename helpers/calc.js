const calcDiff = (initial, newVal) => {
    return -100 * ((newVal - initial) / initial)
}

module.exports = {
    calcDiff: calcDiff
}