import { useQuery } from "@tanstack/react-query";
import indicadorService from "@/services/indicadorService";

{/* Estadual */ }

export const useIndicadoEstado = (coUf: string) => {

    return useQuery({
        queryKey: ['estadoIndicador', coUf],
        queryFn: () => indicadorService.getIndicadorEstadual(coUf),
        enabled: !!coUf,
    });

};
export const useIndicadoEstadoAno = (coUf: string, ano: string) => {

    return useQuery({
        queryKey: ['estadoIndicadorAno', coUf, ano],
        queryFn: () => indicadorService.buscarIndicadorEstadualANo(coUf, ano),
        enabled: !!coUf && !!ano,
    });

};

{/* Municipal */ }

export const useIndicadoMunicipio = (coMunicipio: string) => {

    return useQuery({
        queryKey: ['municipioIndicador', coMunicipio],
        queryFn: () => indicadorService.getIndicadorMunicipal(coMunicipio),
        enabled: !!coMunicipio,
    });

};

export const useIndicadoMunicipioAno = (coMunicipio: string, ano: string) => {

    return useQuery({
        queryKey: ['municipioIndicadorAno', coMunicipio, ano],
        queryFn: () => indicadorService.buscarIndicadorMunicipalAno(coMunicipio, ano),
        enabled: !!coMunicipio && !!ano,
    });

};

{/* DF (Distrito Federal) */ }

export const useIndicadorDf = () => {
    return useQuery({
        queryKey: ['dfIndicador'],
        queryFn: indicadorService.getIndicadorDf,
    });
};


export const useIndicadorDfAno = (ano: string) => {

    return useQuery({
        queryKey: ['dfIndicadorAno', ano],
        queryFn: () => indicadorService.buscarIndicadorDfAno(ano),
        enabled: !!ano,
    });

};

{/* União */ }

export const useIndicadorUniao = () => {
    return useQuery({
        queryKey: ['uniaoIndicador'],
        queryFn: indicadorService.getIndicadorUniao,
    });
};

export const useIndicadorUniaoAno = (ano: string) => {

    return useQuery({
        queryKey: ['uniaoIndicadorAno', ano],
        queryFn: () => indicadorService.buscarIndicadorUniaoAno(ano),
        enabled: !!ano,
    });

};

