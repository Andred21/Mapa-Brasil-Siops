<?php

namespace App\Jobs\lista;

use App\Jobs\AbstractSiopsJob;

class ImportAnoPeriodoJob extends AbstractSiopsJob
{
    protected function processEntity($entity = null): void
    {
        $dados = $this->callApi('getAnoPeriodo');
        foreach ($dados as $dado) {
            $this->saveData('ano_periodo', [
                'ano' => $dado['ano'] ?? null,
                'ds_periodo' => $dado['ds_periodo'] ?? null,
                'periodo' => $dado['periodo'] ?? null,
            ], []);
        }

    }
}