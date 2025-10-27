import api from "./api";

import type {
    
    indicadorDf,
    indicadorEstadual,
    indicadorMunicipio,
    indicadorUniao

} from "@/types";


const indicadorService = {

    // Estadual

    async getIndicadorEstadual(coUf: string): Promise<indicadorEstadual[]> {
        const response = await api.get(`/indicador/estadual/${coUf}`);
        return response.data;
    },

    async buscarIndicadorEstadualANo(coUf: string, ano: string): Promise<indicadorEstadual[]> {
        const response = await api.get(`/indicador/estadual/${coUf}/${ano}`);
        return response.data;
    },

    // Municipal

    async getIndicadorMunicipal(coMunicipio: string): Promise<indicadorMunicipio[]> {
        const response = await api.get(`/indicador/municipal/${coMunicipio}`);
        return response.data;
    },

    async buscarIndicadorMunicipalAno(coMunicipio: string, ano: string): Promise<indicadorMunicipio[]> {
        const response = await api.get(`/indicador/municipal/${coMunicipio}/${ano}`);
        return response.data;
    },

    // DF (Distrito Federal)

    async getIndicadorDf(): Promise<indicadorDf[]> {
        const response = await api.get('/indicador/df');
        return response.data;
    },

    async buscarIndicadorDfAno(ano: string): Promise<indicadorDf[]> {
        const response = await api.get(`/indicador/df/${ano}`);
        return response.data;
    },

    // União 

    async getIndicadorUniao(): Promise<indicadorUniao[]> {
        const response = await api.get('/indicador/uniao');
        return response.data;
    },

    async buscarIndicadorUniaoAno(ano: string): Promise<indicadorDf[]> {
        const response = await api.get(`/indicador/uniao/${ano}`);
        return response.data;
    }

}

export default indicadorService;