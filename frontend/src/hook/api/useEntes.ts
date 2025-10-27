import { useQuery } from "@tanstack/react-query";
import entesService from "@/services/entesService";


// Busca todos os estados
export const useEstados = () => {
    return useQuery({
        queryKey: ['estados'],
        queryFn: entesService.getEstados,
    });
};

// Busca estado pelo código do IBGE
export const useEstadoByCodUf = (codUf: string) => {
    return useQuery({
        queryKey: ['estado', codUf],
        queryFn: () => entesService.buscarEstado(codUf),
        enabled: !!codUf,
    });
};

// Busca todos os municípios 

export const useMunicipios = () => {
    return useQuery({
        queryKey: ['municipios'],
        queryFn: entesService.getMunicipios,
    });
};

// Buscar Municipio por código (IBGE)

export const useMunicipioByCod = (codMunicipio: string) => {
    return useQuery({
        queryKey: ['municipio', codMunicipio],
        queryFn: () => entesService.buscarMunicipio(codMunicipio),
        enabled: !!codMunicipio,
    });
};

// Buscar Municípios por código do UF (IBGE)

export const useMunicipiosPorUf = (codUf: string) => {
    return useQuery({
        queryKey: ['municipiosPorEstado', codUf],
        queryFn: () => entesService.getMunicipiosPorEstado(codUf),
        enabled: !!codUf,
    });
};



// Retorna todos os anos e períodos

export const useAnosPeriodos = () => {
    return useQuery({
        queryKey: ['anoPeriodos'],
        queryFn: entesService.getAnosPeriodos,
    });

};

// Buscar ano e período

export const buscarAnoPeriodo = (ano: string, periodo: string) => {
    return useQuery({
        queryKey: ['anoPeriodo', ano, periodo],
        queryFn: () => entesService.buscarAnoPeriodo(ano, periodo),
        enabled: !!ano && !!periodo,
    });
};

// Dados do Uf de determinado municipio

export const useEstadoByMunicipio = (coMunicipio: string) => {
    return useQuery({
        queryKey: ['estadoPorMunicipio', coMunicipio],
        queryFn: () => entesService.getEstadoMunicipio(coMunicipio),
        enabled: !!coMunicipio,
    });
};