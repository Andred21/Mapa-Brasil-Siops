import {
    useIndicadoEstadoEspecificoAno,
    useIndicadoMunicipioEspecificoAno,
    useIndicadorUniaoEspecificoAno,
} from "@/hook";

type TipoEntidade = "estado" | "municipio" | "uniao";

interface IndicadorItem {
    loading: boolean;
    numerador: number | null;
    denominador: number | null;
    indicador: string | null;

    numeradorFmt: string;
    denominadorFmt: string;
    indicadorFmt: string;
    indicadorNumberFmt?: number | null;

    raw: any;
}

type IndicadoresMap = Record<string, IndicadorItem>;

export function parseIndicadorToNumber(value: any): number | null {
    if (!value && value !== 0) return null;

    if (typeof value === "number") return value;

    if (typeof value === "string") {
        const cleaned = value
            .trim()
            .replace("%", "")       // remove porcentagem
            .replace(/\./g, "")     // remove pontos de milhar
            .replace(",", ".");     // vírgula → ponto decimal

        const num = Number(cleaned);

        return isNaN(num) ? null : num;
    }

    return null;
}


function fmt(
    value: number | string | null,
    prefix = "",
    suffix = ""
): string {
    if (value === null || value === undefined || value === "" || isNaN(Number(value))) {
        return "—";
    }

    const num = Number(value);

    return `${prefix}${num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}${suffix}`;
}
/**
 * Hook genérico para buscar múltiplos indicadores de uma vez.
 */
export function useIndicadoresPanel(
    type: TipoEntidade,
    codigo: string,
    ano: string,
    lista: string[] // ex: ["1.1", "1.2", "1.6"]
) {
    // Seleciona qual hook usar com base na entidade
    const hookSelector = (numero: string) => {
        if (type === "estado") {
            return useIndicadoEstadoEspecificoAno(codigo, numero, ano);
        }
        if (type === "municipio") {
            return useIndicadoMunicipioEspecificoAno(codigo, numero, ano);
        }
        return useIndicadorUniaoEspecificoAno(numero, ano);
    };

    // Executa todos os hooks
    const results = lista.map((num) => hookSelector(num));

    // Monta o mapa de indicadores
    const indicadores: IndicadoresMap = {};

    results.forEach((res, index) => {
        const numero = lista[index];

        // pega o primeiro item do array retornado pelo backend
        const raw = Array.isArray(res.data) ? res.data[0] : res.data;

        const numerador = raw?.numerador ?? null;
        const denominador = raw?.denominador ?? null;
        const indicador = raw?.indicador_calculado ?? null;
        const indicadorNumberFmt = parseIndicadorToNumber(raw?.indicador_calculado);

        indicadores[numero] = {
            loading: res.isLoading,

            numerador,
            denominador,
            indicador,

            numeradorFmt: fmt(numerador, "R$ "),
            denominadorFmt: fmt(denominador, "R$ "),
            indicadorFmt: fmt(indicador, "", "%"),
            indicadorNumberFmt,
            raw,
        };
    });

    const loading = results.some((r) => r.isLoading);

    return {
        indicadores,
        loading,
    };
}
