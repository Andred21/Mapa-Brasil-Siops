import { useIndicadoresPanel } from "@/hook/components/useIndicadoresPanel";


interface Params {
    type: "estado" | "municipio" | "uniao";
    codigo: string;
    anoInicio: number;
    anoFim: number;
}

export function useIndicadoresPerCapitaPorAno({ type, codigo, anoInicio, anoFim }: Params) {

    const anos = Array.from({ length: anoFim - anoInicio + 1 }, (_, i) => anoInicio + i);

    const resultados = anos.map(ano => 
        useIndicadoresPanel(type, codigo, String(ano), ["2.1"])
    );

    const populacao = resultados.map(r => Number(r.indicadores["2.1"]?.denominador ?? 0));
    const perCapita = resultados.map(r => Number(r.indicadores["2.1"]?.indicadorNumberFmt ?? 0));

    return {
        anos,
        populacao,
        perCapita,
        loading: resultados.some(r => r.loading)
    };
}
