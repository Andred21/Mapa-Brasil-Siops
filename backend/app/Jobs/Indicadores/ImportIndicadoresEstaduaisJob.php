<?php
namespace App\Jobs\indicadores;

use App\Jobs\AbstractSiopsJob;


class ImportIndicadoresEstaduaisJob extends AbstractSiopsJob
{
    protected function processEntity($estado): void
    {
        // Ignora o DF (53)
        if ((int) $estado->co_uf === 53) {
            return;
        }

        $dados = $this->callApi('getIndicadorEstadual', $estado->co_uf, $this->ano, $this->periodo);
        foreach ($dados as $dado) {

            $this->saveData('indicador_estadual', [
                'estado_id' => $estado->id,
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
