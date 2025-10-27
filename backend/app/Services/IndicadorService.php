<?php

namespace App\Services;

use App\Repositories\Indicadores\IndicadorDfRepository;
use App\Repositories\Indicadores\IndicadorEstadualRepository;
use App\Repositories\Indicadores\IndicadorMunicipalRepository;

use App\Repositories\Indicadores\IndicadorUniaoRepository;
use App\Repositories\Ente\ListaEstadoRepository;
use App\Repositories\Ente\ListaMunicipioRepository;

class IndicadorService
{
    public function __construct(
        protected IndicadorEstadualRepository $indiEstadualRepository,
        protected IndicadorMunicipalRepository $indiMunicipalRepository,
        protected IndicadorUniaoRepository $indiUniaoRepository,
        protected IndicadorDfRepository $indiDfRepository,
        protected ListaEstadoRepository $listaEstadoRepository,
        protected ListaMunicipioRepository $listaMunicipioRepository
    ) {
    }

    // Indicadores dos Estados

    /* 
     *
     * Buscar Indicador pelo Id do Estado
     *
     */
    public function getIndicadorEstadoId(int $estadoId)
    {
        return $this->indiEstadualRepository->findByEstadoId($estadoId);
    }

    /**
     * 
     * Buscar Indicadores do Estado pelo Código (IBGE)
     * 
     */
    public function getIndicadorEstadualCodUf(string $coUf)
    {
        $estado = $this->listaEstadoRepository->findByCodUf($coUf);

        if (!$estado) {
            throw new \Exception("Estado com código {$coUf} não encontrado");
        }

        return $this->getIndicadorEstadoId($estado->id);
    }

    /**
     * 
     * Indicadores do estado por Ano especificado
     * 
     */
    public function getIndicadorEstadualAno(string $coUf, string $ano)
    {
        $estado = $this->listaEstadoRepository->findByCodUf($coUf);

        if (!$estado) {
            throw new \Exception("Estado com código {$coUf} não encontrado");
        }


        return $this->indiEstadualRepository->findByEstadoAno($estado->id, $ano);
    }

    // Indicadores dos Municípios

    /**
     * 
     * Buscar Indicador pelo Id do Municipio
     * 
     */
    public function getIndicadorMunicipioId(int $municipioId)
    {
        return $this->indiMunicipalRepository->findByMunicipioId($municipioId);
    }

    /**
     * 
     * Buscar Indicador pelo código do Município 
     *
     */
    public function getIndicadorMunicipalCodMunicipio(string $coMunicipio)
    {
        $municipio = $this->listaMunicipioRepository->findByCod($coMunicipio);

        if (!$municipio) {
            throw new \Exception("Município com código {$coMunicipio} não encontrado.");
        }

        return $this->getIndicadorMunicipioId($municipio->id);
    }

    /**
     * 
     * Indicadores do Municipio por Ano especificado
     * 
     */
    public function getIndicadorMunicipalAno(string $coMunicipio, string $ano)
    {
        $municipios = $this->listaMunicipioRepository->findByCod($coMunicipio);

        if (!$municipios) {
            throw new \Exception("Código do Município {$coMunicipio} não encontrado");
        }

        return $this->indiMunicipalRepository->findByMunicipioAno($municipios->id, $ano);
    }

    // Indicadores do DF (Distrito Federal)
      /**
     * 
     * Todos os indicadores do DF
     * 
     */
    public function getIndicadoresDf()
    {
        return $this->indiDfRepository->getAll();
    }

    /**
     * 
     * Indicadores do DF Por Ano especificado
     * 
     */
    public function getIndicadoresDFAno(string $ano)
    {
        return $this->indiDfRepository->findByAno($ano);
    }


    // Indicadores da União

    /**
     * 
     * Todos os indicadores da União
     * 
     */
    public function getIndicadoresUniao()
    {
        return $this->indiUniaoRepository->getAll();
    }

    /**
     * 
     * Indicadores da União Por Ano especificado
     * 
     */
    public function getIndicadoresUniaoAno(string $ano)
    {
        return $this->indiUniaoRepository->findByAno($ano);
    }



}