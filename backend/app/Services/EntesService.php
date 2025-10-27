<?php

namespace App\Services;

use App\Models\lista\ListaAnoPeriodoEstadual;

use App\Models\lista\ListaMunicipio;
use App\Repositories\Ente\ListaEstadoRepository;
use App\Repositories\Ente\ListaAnoPeriodoEstadualRepository;
use App\Repositories\Ente\ListaMunicipioRepository;

class EntesService
{
    public function __construct(
        protected ListaEstadoRepository $lisaEstadoRepository,
        protected ListaAnoPeriodoEstadualRepository $listaAnoPeriodoEstadual,
        protected ListaMunicipioRepository $listaMunicipioRepository
    ) {
    }

    /* Anos e Periodos */

    public function listaAnosPeriodos()
    {
        return $this->listaAnoPeriodoEstadual->getAll();
    }

    public function buscarAnoPerido(string $ano, string $periodo)
    {
        return $this->listaAnoPeriodoEstadual->findByYearAndPeriod($ano, $periodo);
    }

    /* Estados */

    public function listarEstado()
    {
        return $this->lisaEstadoRepository->getAll();
    }

    public function buscarEstadoPorCod(string $codEstado)
    {
        return $this->lisaEstadoRepository->findByCodUf($codEstado);
    }

    /* Municipios */

    public function listarMunicipios()
    {
        return $this->listaMunicipioRepository->getAll();
    }

    public function listarMunicipiosPorUf(string $coUf)
    {
        $estado = $this->buscarEstadoPorCod($coUf);

        if (!$estado) {
            throw new \Exception("Estado com código Uf {$coUf} não encontrado.");
        }

        return $this->listaMunicipioRepository->findByUf($estado->id);
    }

    public function buscarMunicipioPorCod(string $coMunicipio)
    {
        return $this->listaMunicipioRepository->findByCod($coMunicipio);
    }


    public function buscarEstadoPorMunicipioCod(string $coMunicipio)
    {
        return $this->listaMunicipioRepository->getEstadoByMunicipioCod($coMunicipio);
    }





}


