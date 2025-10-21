<?php

namespace App\Jobs\Population;

use App\Jobs\AbstractSiopsJob;

class ImportPopulacaoEstadualJob extends AbstractSiopsJob
{
    protected function processEntity($estado): void
    {
        $dados = $this->callApi('getPopulacaoEstado', $estado->co_uf, $this->ano, $this->periodo);

        if (!empty($dados)) {
            $this->saveData('populacao_estadual', [
                'estado_id' => $estado->id,
                'ano' => $this->ano,
                'periodo' => $this->periodo,
            ], [
                'populacao' => $dados['populacao'] ?? null,
            ]);
        }
    }
}
