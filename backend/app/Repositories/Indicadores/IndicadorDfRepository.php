<?php

namespace App\Repositories\Indicadores;

use App\Models\Indicador\IndicadorDf;

class IndicadorDfRepository
{

    public function getAll()
    {
        return IndicadorDf::all();
    }

    public function findByAno(string $ano)
    {
        return IndicadorDf::where('ano', $ano)->get();
    }

    public function findByNumeroIndicador(string $numero)
    {
        return IndicadorDf::where('numero_indicador', $numero)->get();
    }

    public function findByAnoAndNumero(string $ano, string $numero)
    {
        return IndicadorDf::where('ano', $ano)
            ->where('numero_indicador', $numero)
            ->first();
    }

    public function  findByDfIndicadorAno(string $numeroIndicador, string $ano)
    {
        return IndicadorDf::where('numero_indicador', $numeroIndicador)
            ->where('ano', $ano)
            ->first();
    }
}