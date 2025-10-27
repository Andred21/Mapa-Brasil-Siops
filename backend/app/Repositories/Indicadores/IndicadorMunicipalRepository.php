<?php

namespace App\Repositories\Indicadores;

use App\Models\Indicador\IndicadorMunicipal;

class IndicadorMunicipalRepository
{
    /**
     * 
     * Retorna todos os indicadores do Município
     * 
     */
    public function getAll()
    {
        return IndicadorMunicipal::all();
    }

    /**
     * 
     * Busca um Indicador específico pelo ID
     * 
     */
    public function findById(int $id)
    {
        return IndicadorMunicipal::find($id);
    }

    /**
     * 
     * Retorna todos os indicadores de um município
     * 
     */
    public function findByMunicipioId(int $municipioId)
    {
        return IndicadorMunicipal::where('municipio_id', $municipioId)->get();
    }

    /**
     * 
     * Indicadores de um município por ano específico 
     * 
     */
    public function findByMunicipioAno(int $municipioId, string $ano)
    {
        return IndicadorMunicipal::where('municipio_id', $municipioId)
            ->where('ano', $ano)
            ->get();
    }


    /**
     * 
     * Busca por número do indicador 
     * 
     */
    public function findByNumeroIndicador(string $numeroIndicador)
    {
        return IndicadorMunicipal::where('numero_indicador', $numeroIndicador)->get();
    }

}