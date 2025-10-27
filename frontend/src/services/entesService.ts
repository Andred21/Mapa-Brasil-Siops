import api from './api';

import type {

    listaAnoPeriodo,
    listaEstados,
    listaMunicipios,

} from '@/types';



const entesService = {

    // Anos e Períodos

    async getAnosPeriodos(): Promise<listaAnoPeriodo[]> {
        const response = await api.get('/entes/anosPeriodos');
        return response.data;
    },

    async buscarAnoPeriodo(ano: string, periodo: string): Promise<listaAnoPeriodo> {
        const response = await api.get(`/entes/buscar/anosPeriodos/${ano}/${periodo}`);
        return response.data;
    },

    // Estados

    async getEstados(): Promise<listaEstados[]> {
        const response = await api.get('/entes/estado');
        return response.data;
    },

    async buscarEstado(codUf: string): Promise<listaEstados> {
        const response = await api.get(`/entes/buscar/estado/${codUf}`)
        return response.data;
    },

    // Municipios

    async getMunicipios(): Promise<listaMunicipios[]> {
        const response = await api.get('/entes/municipios');
        return response.data;
    },

    async buscarMunicipio(codMunicipio: string): Promise<listaMunicipios> {
        const response = await api.get(`/entes/buscar/municipio/${codMunicipio}`);
        return response.data;
    },

    async getMunicipiosPorEstado(codUf: string): Promise<listaMunicipios[]> {
        const response = await api.get(`/entes/estado/${codUf}/municipio`);
        return response.data;
    },

    async getEstadoMunicipio(coMunicipio: string): Promise<listaEstados> {
        const response = await api.get(`/entes/municipios/${coMunicipio}/estado`);
        return response.data;
    }

}

export default entesService;
