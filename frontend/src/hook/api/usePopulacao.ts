import { useQuery } from "@tanstack/react-query";
import populacaoService from "@/services/populacaoService";

{/* Estadual */ }

// Busca a População do Estado Especificado (todos os anos)
export const usePopulacaoEstado = (coUf: string) => {

    return useQuery({
        queryKey: ['estadoPop', coUf],
        queryFn: () => populacaoService.getPopulacaoEstadual(coUf),
        enabled: !!coUf,
    });

};

// Busca a População do Estado Especificado e Ano
export const usePopulacaoEstadoPorAno = (coUf: string, anoValido: string) => {

    return useQuery({
        queryKey: ['estadoPopAno', coUf, anoValido],
        queryFn: () => populacaoService.getPopulacaoEstadualAno(coUf, anoValido),
        enabled: !!coUf && !!anoValido,
    });

};


// Retorna o crescimento da populacao estadual em um determinado intervalo de tempo
export const useCrescimentoPopulacaoEstadual = (coUf: string, anoInicio: string, anoFinal: string) => {
    return useQuery({
        queryKey: ['estadoCrescimentoPop', coUf, anoInicio, anoFinal],
        queryFn: () => populacaoService.getCrescimentoPopulacaoEstadual(coUf, anoInicio, anoFinal),
        enabled: !!coUf && !!anoInicio && !!anoFinal,
    });
};

// Retorna os indicadores populacionais estaduais
export const useIndicadoresPopulacaoEstadual = (coUf: string, anoInicio: string, anoFinal: string) => {
    return useQuery({
        queryKey: ['estadoIndicadoresPop', coUf, anoInicio, anoFinal],
        queryFn: () => populacaoService.getIndicadoresPopulacaoEstadual(coUf, anoInicio, anoFinal),
        enabled: !!coUf && !!anoInicio && !!anoFinal,
    });
};

{/* Municipal */ }

// Busca a População do Município Especificado (todos os anos)

export const usePopulacaoMunicipio = (coMunicipio: string) => {

    return useQuery({
        queryKey: ['municipioPop', coMunicipio],
        queryFn: () => populacaoService.getPopulacaoMunicipal(coMunicipio),
        enabled: !!coMunicipio,

    });
};

// Busca a População do Município Especificado e Ano

export const usePopulacaoMunicipioPorAno = (coMunicipio: string, anoValido: string) => {

    return useQuery({
        queryKey: ['municipioPopAno', coMunicipio, anoValido],
        queryFn: () => populacaoService.getPopulacaoMunicipalAno(coMunicipio, anoValido),
        enabled: !!coMunicipio && !!anoValido,
    });

};

// Retorna o crescimento da populacao municipal em um determinado intervalo de tempo
export const useCrescimentoPopulacaoMunicipal = (coMunicipio: string, anoInicio: string, anoFinal: string) => {
    return useQuery({
        queryKey: ['municipioCrescimentoPop', coMunicipio, anoInicio, anoFinal],
        queryFn: () => populacaoService.getCrescimentoPopulacaoMunicipal(coMunicipio, anoInicio, anoFinal),
        enabled: !!coMunicipio && !!anoInicio && !!anoFinal,
    });
};

// Retorna os indicadores populacionais municipais
export const useIndicadoresPopulacaoMunicipal = (coMunicipio: string, anoInicio: string, anoFinal: string) => {
    return useQuery({
        queryKey: ['municipioIndicadoresPop', coMunicipio, anoInicio, anoFinal],
        queryFn: () => populacaoService.getIndicadoresPopulacaoMunicipal(coMunicipio, anoInicio, anoFinal),
        enabled: !!coMunicipio && !!anoInicio && !!anoFinal,
    });
};

{/* União */ }


// Busca a População da União (Todos os anos)
export const usePopulacaoUniao = () => {

    return useQuery({
        queryKey: ['uniaoPop'],
        queryFn: populacaoService.getPopulacaoUniao,
    });

};

// Busca a População da União por Ano.

export const usePopulacaoUniaoPorAno = (ano: string) => {

    return useQuery({
        queryKey: ['uniaoPopAno', ano],
        queryFn: () => populacaoService.getPopulacaoUniaoAno(ano),
        enabled: !!ano
    });
};


export const useCrescimentoPopulacaoUniao = (anoInicio: string, anoFinal: string) => {
    return useQuery({
        queryKey: ['UniaoCrescimentoPop', anoInicio, anoFinal],
        queryFn: () => populacaoService.getCrescimentoPopulacaoUniao(anoInicio, anoFinal),
        enabled: !!anoInicio && !!anoFinal,
    });
};

// Retorna os indicadores populacionais da União
export const useIndicadoresPopulacaoUniao = (anoInicio: string, anoFinal: string) => {
    return useQuery({
        queryKey: ['uniaoIndicadoresPop', anoInicio, anoFinal],
        queryFn: () => populacaoService.getIndicadoresPopulacaoUniao(anoInicio, anoFinal),
        enabled: !!anoInicio && !!anoFinal,
    });
};




