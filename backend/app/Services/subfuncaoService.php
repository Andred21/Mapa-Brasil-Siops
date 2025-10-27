<?php

namespace App\Services;

use App\Repositories\Ente\ListaEstadoRepository;
use App\Repositories\Ente\ListaMunicipioRepository;
use App\Repositories\Subfuncao\SubfuncaoEstadoRepository;
use App\Repositories\Subfuncao\SubfuncaoMunicipioRepository;


class SubfuncaoService
{
    public function __construct(
        protected SubfuncaoEstadoRepository $subfuncaoEstadoRepository,
        protected SubfuncaoMunicipioRepository $subfuncaoMunicipioRepository,
        protected ListaEstadoRepository $listaEstadoRepository,
        protected ListaMunicipioRepository $listaMunicipioRepository,
    ) {
    }

    // Estados

    public function subfuncaoEstadoAll()
    {
        return $this->subfuncaoEstadoRepository->getAll();
    }

    public function getSubfuncaoEstadoId(int $estadoId)
    {
        return $this->subfuncaoEstadoRepository->findByEstadoId($estadoId);
    }

    public function getSubfuncaoEstadoCodUf(string $coUf)
    {
        $estado = $this->listaEstadoRepository->findByCodUf($coUf);

        if (!$estado) {
            throw new \Exception("Estado com código {$coUf} não encontrado");
        }

        return $this->getSubfuncaoEstadoId($estado->id);
    }

    public function getGrupoDescricaoEstado(?string $item)
    {
        return $this->subfuncaoEstadoRepository->getGrupoDescriçãoEstado($item);
    }

    public function getSubfuncaoEstadoPorAno(string $coUf, string $ano)
    {
        $estado = $this->listaEstadoRepository->findByCodUf($coUf);

        if (!$estado) {
            throw new \Exception("Estado com código {$coUf} não encontrado");
        }

        return $this->subfuncaoEstadoRepository->findByEstadoAndAno($estado->id, $ano);
    }


    // Municipios
    public function subFuncaoMunicipalAll()
    {
        return $this->subfuncaoMunicipioRepository->getAll();
    }

    public function getSubfuncaoMunicipioId(int $municipioId)
    {
        return $this->subfuncaoMunicipioRepository->findByMunicipioId($municipioId);
    }

    public function getSubfuncaoMunicipioCod(string $coMunicipio)
    {
        $municipio = $this->listaMunicipioRepository->findByCod($coMunicipio);

        if (!$municipio) {
            throw new \Exception("Município com código {$coMunicipio} não encontrado");
        }
        return $this->subfuncaoMunicipioRepository->findByMunicipioId($municipio->id);
    }

    public function getGrupoDescricaoMunicipio(?string $coItem)
    {
        return $this->subfuncaoMunicipioRepository->getGrupoDescricaoMunicipio($coItem);
    }

    public function getSubfuncaoMunicipioPorAno(string $coMunicipio, string $ano)
    {
        $municipio = $this->listaMunicipioRepository->findByCod($coMunicipio);

        if (!$municipio) {
            throw new \Exception("Município com código {$coMunicipio} não encontrado");
        }

        return $this->subfuncaoMunicipioRepository->findByMunicipioAndAno($municipio->id, $ano);
    }


}