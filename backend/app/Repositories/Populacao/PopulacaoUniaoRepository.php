<?php

namespace App\Repositories\Populacao;

use App\Models\Population\PopulacaoUniao;



class PopulacaoUniaoRepository
{
    public function getAll()
    {
        return PopulacaoUniao::all();
    }

    public function findByAno(string $ano)
    {
        return PopulacaoUniao::where('ano', $ano)->get();
    }

    public function getAllOrdered()
    {
        return PopulacaoUniao::orderBy('ano', 'desc')->get();
    }


}
