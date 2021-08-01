const calcPercDiff = (initial, newVal) => {
    return {
        diffPerc: -100 * ((newVal - initial) / initial),
        rawDiff: newVal - initial,
        newPrice: newVal
    }
}
const roundTo = (n, digits) => {
    let negative = false;
    if (digits === undefined) digits = 0;

    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    const multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) 
        n = (n * -1).toFixed(2);
    return n;
}

module.exports = {
    calcPercDiff,
    roundTo
}