<?php

namespace App\Jobs\lista;

use App\Jobs\AbstractSiopsJob;

class importEnteAnosJob extends AbstractSiopsJob
{
    protected function processEntity($entidade = null): void
    {
        $dados = $this->callApi('getAnos', $entidade->co_entidade);

        foreach ($dados as $dado) {
            $this->saveData('lista_ano_periodo_estadual', [
                'ente_id' => $entidade->id,
                'ano' => $dado['ano'] ?? null,
                'periodo' => $dado['periodo'] ?? null,
            ], []);
        }
    }
}