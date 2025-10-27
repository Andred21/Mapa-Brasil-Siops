import { useQuery } from "@tanstack/react-query";
import indicadorGraphicService from "@/services/indicadorGraphicService";

// Composição receita
export const useGraficoComposicaoReceita = (
    tipo: "estado" | "municipio" | "uniao" | "df",
    codigo: string,
    ano: number
) => {
    return useQuery({
        queryKey: ["graficoComposicaoReceita", tipo, codigo, ano],
        queryFn: () => indicadorGraphicService.getComposicaoReceita(tipo, codigo, ano),
        enabled: !!tipo && !!codigo && !!ano,
    });
};

// Fontes da Saúde
export const useGraficoFontesSaude = (
    tipo: "estado" | "municipio" | "uniao" | "df",
    codigo: string,
    ano: number
) => {
    return useQuery({
        queryKey: ["graficoFontesSaude", tipo, codigo, ano],
        queryFn: () => indicadorGraphicService.getFontesSaude(tipo, codigo, ano),
        enabled: !!tipo && !!codigo && !!ano,
    });
};

// Despesas da Saúde 
export const useGraficoDespesaSaude = (
    tipo: "estado" | "municipio" | "uniao" | "df",
    codigo: string,
    ano: number
) => {
    return useQuery({
        queryKey: ["graficoDespesaSaude", tipo, codigo, ano],
        queryFn: () => indicadorGraphicService.getDespesaSaude(tipo, codigo, ano),
        enabled: !!tipo && !!codigo && !!ano,
    });
};

// Aplicação miníma LC 141
export const useGraficoLc141 = (
    tipo: "estado" | "municipio" | "uniao" | "df",
    codigo: string,
    ano: number
) => {
    return useQuery({
        queryKey: ["graficoLc141", tipo, codigo, ano],
        queryFn: () => indicadorGraphicService.getLc141(tipo, codigo, ano),
        enabled: !!tipo && !!codigo && !!ano,
    });
};

// Série temporal 
export const useGraficoSerieTemporal = (
    tipo: "estado" | "municipio" | "uniao" | "df",
    codigo: string,
    indicadores: string,
    inicio: number,
    fim: number
) => {
    return useQuery({
        queryKey: ["graficoSerieTemporal", tipo, codigo, indicadores, inicio, fim],
        queryFn: () =>
            indicadorGraphicService.getSerieTemporal(tipo, codigo, indicadores, inicio, fim),
        enabled: !!tipo && !!codigo && !!indicadores && !!inicio && !!fim,
    });
};
