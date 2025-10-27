import { useQuery } from "@tanstack/react-query";
import subfuncaoService from "@/services/subfuncaoService";

{/* Estado */ }

export const useSubfuncaoEstado = (coUf: string) => {
    return useQuery({
        queryKey: ['estadoSubfuncao', coUf],
        queryFn: () => subfuncaoService.getSubFuncaoCodUf(coUf),
        enabled: !!coUf,
    });
};

export const useEstadoGrupoDescricao = () => {
    return useQuery({
        queryKey: ['estadoGrupoDescricao'],
        queryFn: subfuncaoService.getEstadoGrupoDescricao,
    });
};

export const useSubfuncaoEstadoAno = (coUf: string, ano: string) => {
    return useQuery({
        queryKey: ['estadoSubfuncaoAno', coUf, ano],
        queryFn: () => subfuncaoService.getSubFuncaoEstadoCodAno(coUf, ano),
        enabled: !!coUf && !!ano,
    });
};


{/* Município */ }

export const useSubfuncaoMunicipio = (coMunicipio: string) => {
    return useQuery({
        queryKey: ['municipioSubfuncao', coMunicipio],
        queryFn: () => subfuncaoService.getSubFuncaoCodMunicipio(coMunicipio),
        enabled: !!coMunicipio,
    });
};

export const useMunicipioGrupoDescricao = () => {
    return useQuery({
        queryKey: ['municipioGrupoDescricao'],
        queryFn: subfuncaoService.getMunicipioGrupoDescricao,
    });
};

export const useSubfuncaoMunicipioAno = (coMunicipio: string, ano: string) => {
    return useQuery({
        queryKey: ['municipioSubFuncaoAno', coMunicipio, ano],
        queryFn: () => subfuncaoService.getSubFuncaoMunicipioCodAno(coMunicipio, ano),
        enabled: !!coMunicipio && !!ano,
    });
};