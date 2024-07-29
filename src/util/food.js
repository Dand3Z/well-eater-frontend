export function calculateMacro(macroValue, amount) {
    const value = macroValue * amount / 100.00;
    return Math.round(value * 100) / 100.0;
}