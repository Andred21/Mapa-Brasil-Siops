<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\SiopsService;

class TestSiopsServiceCommand extends Command
{
    protected $signature = 'siops:test';
    protected $description = 'Testa todos os métodos do SiopsService';

    public function handle(SiopsService $siops)
    {
        try {
            // 1️⃣ Ano e período
            $anosPeriodos = $siops->getAnoPeriodo();
            $this->info("✅ Ano/Período:");
            $this->line(json_encode($anosPeriodos, JSON_PRETTY_PRINT));

            // 2️⃣ Estados
            $estados = $siops->getEstados();
            $this->info("✅ Estados:");
            $this->line(json_encode($estados, JSON_PRETTY_PRINT));

            // Pegamos o primeiro UF só para teste
            $uf = $estados[0]['uf'] ?? '33';

            // 3️⃣ Municípios por Estado
            $municipios = $siops->getMunicipiosPorEstado($uf);
            $this->info("✅ Municípios de {$uf}:");
            $this->line(json_encode(array_slice($municipios, 0, 3), JSON_PRETTY_PRINT));

            // 4️⃣ Indicadores
            $ano = $anosPeriodos[0]['ano'] ?? '2024';
            $periodo = $anosPeriodos[0]['periodo'] ?? '2';

            $indicadorEstadual = $siops->getIndicadorEstadual($uf, $ano, $periodo);
            $this->info("✅ Indicadores Estaduais ({$uf}, {$ano}/{$periodo}):");
            $this->line(json_encode(array_slice($indicadorEstadual, 0, 3), JSON_PRETTY_PRINT));

            // 5️⃣ População Estadual
            $populacao = $siops->getPopulacaoEstado($uf, $ano, $periodo);
            $this->info("✅ População do Estado {$uf} ({$ano}/{$periodo}):");
            $this->line(json_encode($populacao, JSON_PRETTY_PRINT));

            // 6️⃣ RREO Estadual
            $rreo = $siops->getRreoEstadual($uf, $ano, $periodo);
            $this->info("✅ RREO Estadual ({$uf}, {$ano}/{$periodo}):");
            $this->line(json_encode(array_slice($rreo, 0, 3), JSON_PRETTY_PRINT));

            // 7️⃣ Despesa total em saúde estadual
            $despesa = $siops->getDespesaTotalSaudeEstadual($uf, $ano, $periodo);
            $this->info("✅ Despesa Total em Saúde Estadual ({$uf}, {$ano}/{$periodo}):");
            $this->line(json_encode(array_slice($despesa, 0, 3), JSON_PRETTY_PRINT));

            $this->info("🎉 Todos os testes executados com sucesso!");
        } catch (\Throwable $e) {
            $this->error("Erro: " . $e->getMessage());
        }
    }
}
