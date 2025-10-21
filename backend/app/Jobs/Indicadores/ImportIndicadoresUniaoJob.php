<?php

namespace App\Jobs\Indicadores; 

use App\Jobs\AbstractSiopsJob;
use Illuminate\Support\Facades\DB;

class ImportIndicadoresUniaoJob extends AbstractSiopsJob
{
    protected function processEntity($entidade = null): void
    {
        
      $dados = $this->callApi('getIndicadorUniao', $this->ano, $this->periodo);
        foreach ($dados as $dado) {
        

            $this->saveData('indicador_uniao', [
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
