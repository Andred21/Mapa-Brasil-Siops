<?php

namespace Database\Seeders\Subfuncao;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsSubfuncaoMunicipioSeeder extends Seeder
{

    /* Seeder para armazenar a função e subfunção da saúde de todos os municipios  */
    public function run(): void
    {
        $siops = app(SiopsService::class);

        $anosPeriodos = DB::table('ano_periodo')
            ->where('nu_periodo', 2)
            ->where('ds_ano', '>=', 2020)
            ->get();

        if ($anosPeriodos->isEmpty()) {
            $this->command->error('Nenhum ano/período válido encontrado.');
            return;
        }

        foreach ($anosPeriodos as $anoPeriodo) {
            $ano = (int) $anoPeriodo->ds_ano;
            $periodo = (int) $anoPeriodo->nu_periodo;

            $this->command->info("Importando Subfunção Municipal — Ano: {$ano}, Período: {$periodo}");

            // Join para trazer co_uf da lista_estado
            DB::table('lista_municipio')
                ->join('lista_estado', 'lista_municipio.estado_id', '=', 'lista_estado.id')
                ->select(
                    'lista_municipio.id as municipio_id',
                    'lista_municipio.no_municipio',
                    'lista_municipio.co_municipio',
                    'lista_estado.co_uf'
                )
                ->orderBy('lista_municipio.id')
                ->chunk(100, function ($municipios) use ($siops, $ano, $periodo) {
                    $lote = [];
                    $municipiosIds = [];

                    foreach ($municipios as $municipio) {
                        try {
                            $coMunicipio = $municipio->co_municipio;
                            $coUf = $municipio->co_uf;

                            $dados = $siops->getDespesaTotalSaudeMunicipal($coUf, $coMunicipio, $ano, $periodo);

                            if (empty($dados)) continue;

                            foreach ($dados as $item) {
                                if (!isset($item['coItem'], $item['dsItem'])) continue;

                                $lote[] = [
                                    'municipio_id' => $municipio->municipio_id,
                                    'ano' => $ano,
                                    'periodo' => $periodo,
                                    'coItem' => $item['coItem'],
                                    'dsItem' => $item['dsItem'],
                                    'grupo' => $item['grupo'] ?? '',
                                    'ordem' => $item['ordem'] ?? '',
                                    'quadro' => $item['quadro'] ?? '',
                                    'vl_coluna1' => $item['vl_coluna1'] ?? 0,
                                    'vl_coluna2' => $item['vl_coluna2'] ?? 0,
                                    'vl_coluna3' => $item['vl_coluna3'] ?? 0,
                                    'vl_coluna4' => $item['vl_coluna4'] ?? 0,
                                    'vl_coluna5' => $item['vl_coluna5'] ?? 0,
                                    'vl_coluna6' => $item['vl_coluna6'] ?? 0,
                                    'vl_coluna7' => $item['vl_coluna7'] ?? 0,
                                    'vl_coluna8' => $item['vl_coluna8'] ?? 0,
                                    'vl_coluna9' => $item['vl_coluna9'] ?? 0,
                                    'vl_coluna10' => $item['vl_coluna10'] ?? 0,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ];
                            }

                            $municipiosIds[] = $municipio->municipio_id;
                            $this->command->line("{$municipio->no_municipio} ({$municipio->co_municipio}) — " . count($dados) . " registros");

                        } catch (\Throwable $e) {
                            $this->command->warn("Erro em {$municipio->no_municipio} ({$municipio->co_municipio}): " . $e->getMessage());
                        }
                    }

                    if (!empty($lote)) {
                        // Limpa dados antigos
                        DB::table('subfuncao_municipio')
                            ->whereIn('municipio_id', $municipiosIds)
                            ->where('ano', $ano)
                            ->where('periodo', $periodo)
                            ->delete();

                        // Insere lote
                        DB::table('subfuncao_municipio')->insert($lote);
                        $this->command->info("Inseridos " . count($lote) . " registros.");
                    }
                });

            $this->command->info("Concluído para {$ano}/{$periodo}");
        }

        $this->command->info("Importação de subfunção municipal finalizada.");
    }
}
