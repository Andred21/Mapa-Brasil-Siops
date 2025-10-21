<?php

namespace App\Jobs\indicadores;

use App\Jobs\AbstractSiopsJob;


class ImportIndicadoresDfJob extends AbstractSiopsJob
{
    protected function processEntity($entidade = null ): void
    {
        $dados = $this->callApi('getIndicadorDf', $this->ano, $this->periodo);
        foreach ($dados as $dado) {
            if(!isset($dado['numero_indicador'])) continue;

            $this ->saveData('indicador_df', [
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
