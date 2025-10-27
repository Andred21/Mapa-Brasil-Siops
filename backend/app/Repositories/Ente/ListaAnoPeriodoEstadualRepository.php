<?php


namespace App\Repositories\Ente;

use App\Models\lista\ListaAnoPeriodoEstadual;

/* Repositório sobre lista de Ano Periodo */

class ListaAnoPeriodoEstadualRepository
{
    /**
     * 
     * Retorna todos os Anos com seus Periodos
     * 
     */
    public function getAll()
    {
        return ListaAnoPeriodoEstadual::all();
    }

    /**
     * 
     * Retorna o anoPeriodo de acordo com ano e periodo parametrizados
     * 
     */
    public function findByYearAndPeriod(string $year, string $period)
    {
        return ListaAnoPeriodoEstadual::where('ds_ano', $year)
            ->where('ds_periodo', $period)
            ->first();
    }

    /**
     * 
     * Retorna de os anosPeriodos pelo Id
     * 
     */
    public function findById($id)
    {
        return ListaAnoPeriodoEstadual::find($id);
    }




}