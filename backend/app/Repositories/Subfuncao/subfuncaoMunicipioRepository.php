<?php

namespace App\Repositories\Subfuncao;

use App\Models\Subfuncao\despesasSubfuncaoMunicipal;

class SubfuncaoMunicipioRepository
{

    public function getAll()
    {
        return despesasSubfuncaoMunicipal::all();
    }

    public function findByid(int $id)
    {
        return despesasSubfuncaoMunicipal::find($id);
    }

    public function findByMunicipioId(int $municipioId)
    {
        return despesasSubfuncaoMunicipal::where('municipio_id', $municipioId)
            ->orderBy('ano', 'desc')
            ->get();
    }

    public function findByMunicipioAndAno(int $municipioId, string $ano)
    {
        return despesasSubfuncaoMunicipal::where('municipio_id', $municipioId)
            ->where('ano', $ano)
            ->orderBy('ordem')
            ->get();
    }

    public function getGrupoDescricaoMunicipio(?string $coItem = null)
    {
        $query = despesasSubfuncaoMunicipal::select('coItem', 'dsItem')
            ->distinct()
            ->orderBy('coItem');

        if (!empty($coItem)) {
            $query->where('coItem', $coItem);
        }

        return $query->get();
    }


}
