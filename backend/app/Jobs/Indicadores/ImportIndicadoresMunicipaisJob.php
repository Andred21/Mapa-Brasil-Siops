<?php

namespace App\Jobs\indicadores;

use App\Jobs\AbstractSiopsJob;
use Illuminate\Support\Facades\DB;

class ImportIndicadoresMunicipaisJob extends AbstractSiopsJob
{
    protected function processEntity($municipio): void
    {
        $dados = $this->callApi('getIndicadorMunicipal', $municipio->co_municipio, $this->ano, $this->periodo);
        foreach ($dados as $dado) {

            $this->saveData('indicador_municipal', [
                'municipio_id' => $municipio->id,
                'ano' => $this->ano,
                'periodo' => $this->periodo,
                'numero_indicador' => $dado['numero_indicador'],

            ], [
                'ds_indicador' => $dado['ds_indicador'] ?? null,
                'denominador' => $dado['denominador'] ?? null,
                'numerador' => $dado['numerador'] ?? null,
                'indicador_calculado' => $dado['indicador_calculado'] ?? null,
            ]);
        }
    }
}
