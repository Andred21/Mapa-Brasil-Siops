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


export const useIndicadoEstadoEspecificoAno = (coUf: string, numeroIndicador: string, ano: string) => {

    return useQuery({
        queryKey: ['estadoIndicadorEspecificoAno', coUf, numeroIndicador, ano],
        queryFn: () => indicadorService.buscarIndicadorEstadualEspecificoAno(coUf, numeroIndicador, ano),
        enabled: !!coUf && !!numeroIndicador && !!ano,
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

export const useIndicadoMunicipioEspecificoAno = (coMunicipio: string, numeroIndicador: string, ano: string) => {

    return useQuery({
        queryKey: ['municipioIndicadorEspecificoAno', coMunicipio, numeroIndicador, ano],
        queryFn: () => indicadorService.buscarIndicadorMunicipalEspecificoAno(coMunicipio, numeroIndicador, ano),
        enabled: !!coMunicipio && !!numeroIndicador && !!ano,
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

export const useIndicadorDfEspecificoAno = (numeroIndicador: string, ano: string) => {

    return useQuery({   
        queryKey: ['dfIndicadorEspecificoAno', numeroIndicador, ano],
        queryFn: () => indicadorService.buscarIndicadorDfEspecificoAno(numeroIndicador, ano),
        enabled: !!numeroIndicador && !!ano,
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

export const useIndicadorUniaoEspecificoAno = (numeroIndicador: string, ano: string) => {

    return useQuery({
        queryKey: ['uniaoIndicadorEspecificoAno', numeroIndicador, ano],
        queryFn: () => indicadorService.buscarIndicadorUniaoEspecificoAno(numeroIndicador, ano),
        enabled: !!numeroIndicador && !!ano,
    });

};