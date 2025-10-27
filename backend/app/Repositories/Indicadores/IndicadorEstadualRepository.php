<?php

namespace App\Repositories\Indicadores;

use App\Models\Indicador\IndicadorEstadual;

class IndicadorEstadualRepository
{

    /**
     * 
     * Retorna todos os indicadores  
     * 
     */
    public function getAll()
    {
        return IndicadorEstadual::all();
    }

    /**
     * 
     * Busca um Indicador específico pelo ID
     * 
     */
    public function findById(int $id)
    {
        return IndicadorEstadual::find($id);
    }

    /**
     * 
     * Retorna todos os indicadores do estado 
     * 
     */
    public function findByEstadoId(int $estadoId)
    {
        return IndicadorEstadual::where('estado_id', $estadoId)->get();
    }

    /**
     * 
     * Indicadores de um estado por ano específico 
     * 
     */
    public function findByEstadoAno(int $estadoId, string $ano)
    {
        return IndicadorEstadual::where('estado_id', $estadoId)
            ->where('ano', $ano)
            ->get();
    }


    /**
     * 
     * Busca por número do indicador 
     * Retorna indicador especificado de todos os estados.
     * 
     */
    public function findByNumeroIndicador(string $numeroIndicador)
    {
        return IndicadorEstadual::where('numero_indicador', $numeroIndicador)->get();
    }

    

}