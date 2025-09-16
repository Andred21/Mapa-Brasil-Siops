
// Limite territorial aproximados do Brasil
export const BR_BOUNDS: [[number, number], [number, number]] = [
    [-33.75, -73.99],
    [5.27, -34.79],
];

// Mapa de fallback para código IBGE da UF
export const UF_CODE: Record<string, number> = {
    AC: 12, AL: 27, AM: 13, AP: 16, BA: 29, CE: 23, DF: 53, ES: 32, GO: 52, MA: 21,
    MG: 31, MS: 50, MT: 51, PA: 15, PB: 25, PE: 26, PI: 22, PR: 41, RJ: 33, RN: 24,
    RO: 11, RR: 14, RS: 43, SC: 42, SE: 28, SP: 35, TO: 17
};
