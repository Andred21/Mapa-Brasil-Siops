<?php

namespace Database\Seeders\Subfuncao;

use App\Services\SiopsService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiopsSubfuncaoEstadoSeeder extends Seeder
{
    public function run(): void
    {
        $siops = app(SiopsService::class);

        $anosPeriodos = DB::table('ano_periodo')
            ->where('nu_periodo', 2)
            ->where('ds_ano', '>=', 2021) // só busca anos compatíveis
            ->get();

        if ($anosPeriodos->isEmpty()) {
            $this->command->error('Nenhum ano/período encontrado para importar.');
            return;
        }

        $estados = DB::table('lista_estado')->get();

        foreach ($anosPeriodos as $anoPeriodo) {
            $ano = (int) $anoPeriodo->ds_ano;
            $periodo = (int) $anoPeriodo->nu_periodo;

            $this->command->info("Iniciando importação: Ano {$ano} / Período {$periodo}");

            foreach ($estados as $estado) {
                try {
                    $dados = $siops->getDespesaTotalSaudeEstadual($estado->co_uf, $ano, $periodo);

                    if (empty($dados)) {
                        $this->command->warn("Nenhum dado para {$estado->no_uf} ({$estado->co_uf})");
                        continue;
                    }

                    // Remove registros antigos
                    DB::table('subfuncao_estado')
                        ->where('estado_id', $estado->id)
                        ->where('ano', $ano)
                        ->where('periodo', $periodo)
                        ->delete();

                    $lote = [];

                    foreach ($dados as $item) {
                        $lote[] = [
                            'estado_id' => $estado->id,
                            'ano' => $ano,
                            'periodo' => $periodo,
                            'descricao' => $item['descricao'] ?? '',
                            'grupo' => $item['grupo'] ?? '',
                            'item' => $item['item'] ?? '',
                            'ordem' => $item['ordem'] ?? '',
                            'quadro' => $item['quadro'] ?? '',
                            'valor1' => $item['valor1'] ?? 0,
                            'valor2' => $item['valor2'] ?? 0,
                            'valor3' => $item['valor3'] ?? 0,
                            'valor4' => $item['valor4'] ?? 0,
                            'valor5' => $item['valor5'] ?? 0,
                            'valor6' => $item['valor6'] ?? 0,
                            'valor7' => $item['valor7'] ?? 0,
                            'valor8' => $item['valor8'] ?? 0,
                            'valor9' => $item['valor9'] ?? 0,
                            'valor10' => $item['valor10'] ?? 0,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    if (!empty($lote)) {
                        DB::table('subfuncao_estado')->insert($lote);
                        $this->command->line("{$estado->no_uf} — Registros: " . count($lote));
                    }

                } catch (\Throwable $e) {
                    $this->command->error("Erro em {$estado->no_uf} ({$estado->co_uf}): " . $e->getMessage());
                }
            }

            $this->command->info("Finalizado ano/período: {$ano}/{$periodo}");
        }

        $this->command->info("Subfunções estaduais importadas com sucesso.");
    }
}
