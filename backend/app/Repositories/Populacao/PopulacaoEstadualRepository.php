<?php

namespace App\Repositories\Populacao;

use App\Models\Population\PopulacaoEstadualRetorno;



class PopulacaoEstadualRepository
{
    public function getAll()
    {
        return PopulacaoEstadualRetorno::all();
    }

    public function findByEstadoId(int $estadoId)
    {
        return PopulacaoEstadualRetorno::where('estado_id', $estadoId)
            ->orderBy('anoValido', 'desc')
            ->get();

    }

    public function findByAno(string $ano)
    {
        return PopulacaoEstadualRetorno::where('anoValido', $ano)->get();
    }

    public function findByAnoAndEstado(string $ano, int $estadoId)
    {
        return PopulacaoEstadualRetorno::where('estado_id', $estadoId)
            ->where('anoValido', $ano)
            ->first();
    }



}
