<?php

namespace Database\Seeders\Indicador;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsIndicadorMunicipalSeeder extends Seeder
{

    /* Seeder para armazenar os indicadores de todos os municipios  */

    
    public function run(): void
    {
        $siops = app(SiopsService::class);

        $anosPeriodos = DB::table('ano_periodo')
            ->where('nu_periodo', 1)
            ->where('ds_ano', '>=', 2025)
            ->get();

        if ($anosPeriodos->isEmpty()) {
            $this->command->error('Nenhum ano/período válido encontrado.');
            return;
        }

        foreach ($anosPeriodos as $anoPeriodo) {
            $ano = (int) $anoPeriodo->ds_ano;
            $periodo = (int) $anoPeriodo->nu_periodo;

            $this->command->info("Importando indicadores municipais — Ano: {$ano}, Período: {$periodo}");

            // Processa em blocos de 100 municípios
            DB::table('lista_municipio')->orderBy('id')->chunk(100, function ($municipios) use ($siops, $ano, $periodo) {
                $lote = [];
                $municipiosIds = [];

                foreach ($municipios as $municipio) {
                    try {
                        $dados = $siops->getIndicadorMunicipal($municipio->co_municipio, $ano, $periodo);

                        if (empty($dados))
                            continue;

                        foreach ($dados as $item) {

                            if (!isset($item['numero_indicador'], $item['ds_indicador'], $item['denominador'])) {
                                continue; // Pula esse item se faltar algo crítico
                            }

                            $lote[] = [
                                'municipio_id' => $municipio->id,
                                'ano' => $ano,
                                'periodo' => $periodo,
                                'numero_indicador' => $item['numero_indicador'] ?? null,
                                'ds_indicador' => $item['ds_indicador'] ?? null,
                                'denominador' => $item['denominador'] ?? 0,
                                'numerador' => $item['numerador'] ?? 0,
                                'indicador_calculado' => $item['indicador_calculado'] ?? null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }

                        $municipiosIds[] = $municipio->id;

                        $this->command->line("{$municipio->no_municipio} ({$municipio->co_municipio}) — Total: " . count($dados));

                    } catch (\Throwable $e) {
                        $this->command->warn("Erro em {$municipio->no_municipio} ({$municipio->co_municipio}): " . $e->getMessage());
                    }
                }

                if (!empty($lote)) {

                    // Apaga dados antigos apenas dos municípios desse chunk
                    DB::table('indicador_municipal')
                        ->whereIn('municipio_id', $municipiosIds)
                        ->where('ano', $ano)
                        ->where('periodo', $periodo)
                        ->delete();

                    // Insere lote
                    DB::table('indicador_municipal')->insert($lote);

                    $this->command->info("Inserido bloco com " . count($lote) . " indicadores.");
                }
            });

            $this->command->info("Importação finalizada para o ano {$ano}/{$periodo}");
        }

        $this->command->info("Indicadores municipais importados com sucesso.");
    }
}
