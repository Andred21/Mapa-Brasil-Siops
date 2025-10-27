<?php

namespace App\Repositories\Populacao;

use App\Models\Population\PopulacaoMunicipalRetorno;



class PopulacaoMunicipalRepository
{
    public function getAll()
    {
        return PopulacaoMunicipalRetorno::all();
    }

    public function findByMunicipioId(int $estadoId)
    {
        return PopulacaoMunicipalRetorno::where('municipio_id', $estadoId)
            ->orderBy('anoValido', 'desc')
            ->get();

    }

    public function findByAno(string $ano)
    {
        return PopulacaoMunicipalRetorno::where('anoValido', $ano)->get();
    }

    public function findByAnoAndMunicipio(string $ano, int $municipioId)
    {
        return PopulacaoMunicipalRetorno::where('municipio_id', $municipioId)
            ->where('anoValido', $ano)
            ->first();
    }



}
