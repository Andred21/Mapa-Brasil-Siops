<?php

namespace App\Jobs\lista;

use App\Jobs\AbstractSiopsJob;

class importEnteMunicipiosJob extends AbstractSiopsJob
{
    protected function processEntity($estado): void
    {
        $coUf = $estado->co_uf;
         $estadoId = $estado->id;

        $dados = $this->callApi('getMunicipios', $coUf );
        foreach ($dados as $dado) {
            $this->saveData('lista_ente_municipios', [
                'co_municipio' => $dado['co_municipio'] ?? null,
                'no_municipio' => $dado['ds_municipio'] ?? null,
                'estado_id' => $estadoId,
            ], []);
        }
    }
}