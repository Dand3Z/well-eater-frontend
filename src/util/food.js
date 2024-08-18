export function calculateMacro(macroValue, amount) {
    const value = macroValue * amount / 100.00;
    return roundResult(value);
}

function roundResult(value) {
    return Math.round(value * 100) / 100.0;
}

export function calculateMean(values) {
    const divider = values.length;
    let result = 0.0;
    values.map(value => result += value);
    return roundResult(result / divider);
}