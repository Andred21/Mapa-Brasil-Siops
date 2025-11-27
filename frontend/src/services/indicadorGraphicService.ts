import api from "./api";

import type {

    GraficoComposicao,
    GraficoFontesSaude,
    GraficoDespesaSaude,
    GraficoLc141,
    GraficoSerieTemporal,
    GraficoSerieEstatisticas,

} from "@/types";


const indicadorGraphicService = {


    // Composição da Receita
    async getComposicaoReceita(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        ano: number
    ): Promise<GraficoComposicao> {
        const { data } = await api.get(`/graficos/composicao-receita/${tipo}/${codigo}/${ano}`);
        return data;
    },

    async getComposicaoReceitaPeriodo(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        anos: number[]
    ): Promise<GraficoComposicao> {
        const { data } = await api.get(`/graficos/composicao-receita-periodo/${tipo}/${codigo}`, {
            params: {
                anos: anos.join(",") // ex: "2020,2021,2022"
            }
        });
        return data;
    },

    // Fontes indicadores da Sáude 
    async getFontesSaude(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        ano: number
    ): Promise<GraficoFontesSaude> {
        const { data } = await api.get(`/graficos/fontes-saude/${tipo}/${codigo}/${ano}`);
        return data;
    },

    // Despesa com Saúde
    async getDespesaSaude(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        ano: number
    ): Promise<GraficoDespesaSaude> {
        const { data } = await api.get(`/graficos/despesa-saude/${tipo}/${codigo}/${ano}`);
        return data;
    },

    // Indicador LC 141

    async getLc141(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        ano: number
    ): Promise<GraficoLc141> {
        const { data } = await api.get(`/graficos/lc141/${tipo}/${codigo}/${ano}`);
        return data;
    },

    // Série Temporal

    async getSerieTemporal(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        indicadores: string,
        inicio: number,
        fim: number
    ): Promise<GraficoSerieTemporal> {
        const { data } = await api.get(`/graficos/serie-temporal/${tipo}/${codigo}`, {
            params: { indicadores, inicio, fim },
        });
        return data;
    },
    async getEstatisticasSerieTemporal(
        tipo: "estado" | "municipio" | "uniao" | "df",
        codigo: string,
        indicadores: string,
        inicio: number,
        fim: number
    ): Promise<GraficoSerieEstatisticas> {
        const { data } = await api.get(
            `/graficos/estatisticas/serie/${tipo}/${codigo}`,
            {
                params: { indicadores, inicio, fim },
            }
        );

        return data;
    },

};




export default indicadorGraphicService;