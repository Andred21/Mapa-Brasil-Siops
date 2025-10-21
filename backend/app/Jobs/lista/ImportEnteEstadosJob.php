<?php

namespace App\Jobs\lista;

use App\Jobs\AbstractSiopsJob;
class ImportEnteEstadosJob extends AbstractSiopsJob
{

   protected function processEntity($entidade = null): void
{
    $dados = $this->callApi('getEstados', $entidade = null);

    \Log::info('Retorno da API getEstados', [
        'total' => is_array($dados) ? count($dados) : 'não é array',
        'conteudo' => $dados,
    ]);

    foreach ($dados as $dado) {
        $this->saveData('lista_ente_estados', [
            'co_uf' => $dado['co_uf'] ?? null,
            'no_uf' => $dado['ds_uf'] ?? null,
            'sg_uf' => $dado['sg_uf'] ?? null,
        ], []);
    }

    \Log::info('Importando estados:', ['total' => count($dados ?? [])]);
}


}