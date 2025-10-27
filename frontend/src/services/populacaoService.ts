import api from "./api";

import type {

    populacaoEstadual,
    populacaoMunicipal,
    populacaoUniao

} from "@/types";


const populacaoService = {

    // Estadual 

    async getPopulacaoEstadual(coUf: string): Promise<populacaoEstadual[]> {
        const response = await api.get(`/populacao/estadual/${coUf}`);
        return response.data;
    },

    async getPopulacaoEstadualAno(coUf: string, anoValido: string): Promise<populacaoEstadual> {
        const response = await api.get(`/populacao/estadual/${coUf}/${anoValido}`);
        return response.data;
    },

    async getCrescimentoPopulacaoEstadual(coUf: string, anoInicio: string, anoFinal: string): Promise<populacaoEstadual[]> {
        const response = await api.get(`/populacao/estadual/crescimento/${coUf}/${anoInicio}/${anoFinal}`);
        return response.data;
    },

    async getIndicadoresPopulacaoEstadual(coUf: string, anoInicio: string, anoFinal: string) {
        const response = await api.get(`/populacao/estadual/indicadores/${coUf}/${anoInicio}/${anoFinal}`);
        return response.data;
    },

    // Municipal

    async getPopulacaoMunicipal(coMunicipio: string): Promise<populacaoMunicipal[]> {
        const response = await api.get(`/populacao/municipal/${coMunicipio}`);
        return response.data;
    },

    async getPopulacaoMunicipalAno(coMunicipio: string, anoValido: string): Promise<populacaoMunicipal> {
        const response = await api.get(`/populacao/municipal/${coMunicipio}/${anoValido}`);
        return response.data;
    },

    async getCrescimentoPopulacaoMunicipal(coMuncipal: string, anoInicio: string, anoFinal: string): Promise<populacaoMunicipal[]> {
        const response = await api.get(`/populacao/municipal/crescimento/${coMuncipal}/${anoInicio}/${anoFinal}`);
        return response.data;
    },
    async getIndicadoresPopulacaoMunicipal(coMunicipio: string, anoInicio: string, anoFinal: string) {
        const response = await api.get(`/populacao/municipal/indicadores/${coMunicipio}/${anoInicio}/${anoFinal}`);
        return response.data;
    },


    // União

    async getPopulacaoUniao(): Promise<populacaoUniao[]> {
        const response = await api.get(`/populacao/uniao`);
        return response.data;
    },

    async getPopulacaoUniaoAno(ano: string): Promise<populacaoUniao> {
        const response = await api.get(`/populacao/uniao/${ano}`);
        return response.data;
    },

    async getCrescimentoPopulacaoUniao(anoInicio: string, anoFinal: string): Promise<populacaoUniao[]> {
        const response = await api.get(`/populacao/uniao/crescimento/${anoInicio}/${anoFinal}`);
        return response.data;
    },

    async getIndicadoresPopulacaoUniao(anoInicio: string, anoFinal: string) {
        const response = await api.get(`/populacao/uniao/indicadores/${anoInicio}/${anoFinal}`);
        return response.data;
    },

}

export default populacaoService;