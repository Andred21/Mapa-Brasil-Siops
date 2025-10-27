<?php

namespace App\Repositories\Ente;
use App\Models\lista\ListaEstado;

/* Repositório sobre lista de Estados*/

class ListaEstadoRepository
{

    /**
     * 
     * Retorna todos os estados
     * 
     */
    public function getAll()
    {
        return ListaEstado::all();
    }

    /**
     * 
     * Retorna o estado de acordo com seu co_uf (código IBGE)
     * 
     */
    public function findByCodUf(string $uf)
    {
        return ListaEstado::where('co_uf', $uf)->first();
    }

    /**
     * 
     * Retorna o estado de acordo com seu ID
     * 
     */
    public function findById($id)
    {
        return ListaEstado::find($id);
    }


}
