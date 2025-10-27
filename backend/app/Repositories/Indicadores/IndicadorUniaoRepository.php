<?php

namespace App\Repositories\Indicadores;

use App\Models\Indicador\IndicadorUniao;

class IndicadorUniaoRepository
{

    /*
     * 
     * Retorna todos os indicadores da União
     * 
     */
    public function getAll()
    {
        return IndicadorUniao::all();
    }

    /*
     * 
     * Retorna os indicadores por ano especificado
     * 
     */
    public function findByAno(string $ano)
    {
        return IndicadorUniao::where('ano', $ano)->get();

    }

    /**
     * 
     * Retorna o indicador especificado (todos os anos)
     * 
     */
    public function findByNumeroIndicador(string $numero)
    {
        return IndicadorUniao::where('numero_indicador', $numero)->get();
    }

    /**
     * 
     * Retorna o indicador especificado pelo ano especificado
     * 
     */
    public function findByAnoAndNumero(string $ano, string $numero)
    {
        return IndicadorUniao::where('ano', $ano)
            ->where('numero_indicador', $numero)
            ->first();
    }
}