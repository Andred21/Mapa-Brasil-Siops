<?php

namespace App\Repositories\Ente;
use App\Models\lista\ListaMunicipio;

/* Repositório sobre lista de Municipíos */

class ListaMunicipioRepository
{

    /**
     * 
     * Retorna todos os Municipios
     * 
     */
    public function getAll()
    {
        return ListaMunicipio::all();
    }

    /**
     * 
     * Retorna o municipio de acordo com o id do estado 
     * 
     */
    public function findByUf(int $estadoId)
    {
        return ListaMunicipio::where('estado_id', $estadoId)
            ->orderBy('no_municipio')
            ->get();
    }

    /**
     * 
     * Retorna o municipio de acordo com o co_municipio (código IBGE)
     * 
     */
    public function findByCod(string $codMunicipio)
    {
        return ListaMunicipio::where('co_municipio', $codMunicipio)->first();

    }

    /**
     * 
     * Retorna o municipio de acordo com o ID 
     * 
     */
    public function findById(int $id)
    {
        return ListaMunicipio::with('estado')->find($id);
    }

    public function getEstadoByMunicipioCod(string $coMunicipio)
    {
        $municipio = ListaMunicipio::with('estado')
            ->where('co_municipio', $coMunicipio)
            ->first();

            return $municipio->estado;
    }


}