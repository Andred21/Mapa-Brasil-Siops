import api from "./api";

import type {

    subfuncaoEstado,
    subfuncaoMunicipio

} from "@/types";


const subfuncaoService = {

    //Estado

    async getSubFuncaoCodUf(coUf: string): Promise<subfuncaoEstado[]> {

        const response = await api.get(`/subfuncao/estado/cod/${coUf}`);
        return response.data;

    },

    async getEstadoGrupoDescricao(): Promise<subfuncaoEstado[]> {

        const response = await api.get('/subfuncao/estado/grupoDescricao');
        return response.data;

    },

    async getSubFuncaoEstadoCodAno(coUf: string, ano: string): Promise<subfuncaoEstado[]> {

        const response = await api.get(`/subfuncao/estado/cod/${coUf}/${ano}`);
        return response.data;

    },


    //Município

    async getSubFuncaoCodMunicipio(coMunicipio: string): Promise<subfuncaoMunicipio[]> {

        const response = await api.get(`/subfuncao/municipio/cod/${coMunicipio}`);
        return response.data;

    },

    async getMunicipioGrupoDescricao(): Promise<subfuncaoMunicipio[]> {

        const response = await api.get('/subfuncao/municipio/grupoDescricao');
        return response.data;

    },

    async getSubFuncaoMunicipioCodAno(coMunicipio: string, ano: string): Promise<subfuncaoMunicipio[]> {

        const response = await api.get(`/subfucao/municipio/cod/${coMunicipio}/${ano}`);
        return response.data;

    }

}

export default subfuncaoService;