<?php

namespace App\Jobs\Population;

use App\Jobs\AbstractSiopsJob;

class ImportPopulacaUniaoJob extends AbstractSiopsJob
{
    protected function processEntity($entidade = null): void
    {
        $dados = $this->callApi('getPopulacaoUniao', $this->ano, $this->periodo);

        if (!empty($dados)) {
            $this->saveData('populacao_uniao', [
                'ano' => $this->ano,
                'periodo' => $this->periodo,
            ], [
                'populacao' => $dados['populacao'] ?? null,
            ]);
        }
    }
}