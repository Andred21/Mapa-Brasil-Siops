<?php
namespace App\Jobs\Population;

use App\Jobs\AbstractSiopsJob;

class ImportPopulacaMunicipalJob extends AbstractSiopsJob
{
    protected function processEntity($municipio): void
    {
        $dados = $this->callApi('getPopulacaoMunicipio', $municipio->co_municipio, $this->ano, $this->periodo);

        if (!empty($dados)) {
            $this->saveData('populacao_municipal', [
                'municipio_id' => $municipio->id,
                'ano' => $this->ano,
                'periodo' => $this->periodo,
            ], [
                'populacao' => $dados['populacao'] ?? null,
            ]);
        }
    }
}
