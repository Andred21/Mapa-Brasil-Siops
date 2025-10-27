<?php

namespace App\Repositories\Subfuncao;

use App\Models\Subfuncao\despesasSubfuncaoEstadual;

class SubfuncaoEstadoRepository
{
    public function getAll()
    {
        return despesasSubfuncaoEstadual::all();
    }

    public function findByid(int $id)
    {
        return despesasSubfuncaoEstadual::find($id);
    }

    public function findByEstadoId(int $estadoId)
    {
        return despesasSubfuncaoEstadual::where('estado_id', $estadoId)
            ->orderBy('ano', 'desc')
            ->get();
    }

    public function findByEstadoAndAno(int $estadoId, string $ano)
    {
        return despesasSubfuncaoEstadual::where('estado_id', $estadoId)
            ->where('ano', $ano)
            ->orderBy('ordem')
            ->get();
    }
    public function getGrupoDescriçãoEstado(?string $item = null)
    {
        $query = despesasSubfuncaoEstadual::select('item', 'descricao')
            ->distinct()
            ->orderBy('item');

        if (!empty($item)) {
            $query->where('item', $item);
        }

        return $query->get();
    }



}
