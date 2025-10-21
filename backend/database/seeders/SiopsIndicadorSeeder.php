<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsIndicadorSeeder extends Seeder
{
    public function run(): void
    {
        $siops = app(SiopsService::class);

        DB::beginTransaction();
        try {
            $anosPeriodos = DB::table('ano_periodo')->get();
            $estados = DB::table('lista_estado')->get();

            if ($anosPeriodos->isEmpty() || $estados->isEmpty()) {
                throw new \Exception('Os dados necessários não estão disponíveis para importar os indicadores SIOPS.');
            }

            // ✅ Filtra apenas anos >= 2013 e período == 2
            $anosPeriodos = $anosPeriodos->filter(fn($a) => (int)$a->ds_ano >= 2013 && (int)$a->nu_periodo === 2);

            foreach ($anosPeriodos as $anoPeriodo) {
                $ano = (int) $anoPeriodo->ds_ano;
                $periodo = (int) $anoPeriodo->nu_periodo;

                $this->command->info("📅 Importando indicadores do SIOPS — Ano {$ano}, Período {$periodo}");

                /**
                 * ===============================
                 *  INDICADORES ESTADUAIS
                 * ===============================
                 */
                foreach ($estados as $estado) {
                    if ((int) $estado->co_uf === 53) {
                        continue; // Ignora o DF aqui
                    }

                    try {
                        $indicadoresEstaduais = $siops->getIndicadorEstadual($estado->co_uf, $ano, $periodo);

                        if (!empty($indicadoresEstaduais) && is_array($indicadoresEstaduais)) {
                            foreach ($indicadoresEstaduais as $indicador) {
                                DB::table('indicador_estadual')->updateOrInsert(
                                    [
                                        'estado_id' => $estado->id,
                                        'ano' => $ano,
                                        'periodo' => $periodo,
                                        'numero_indicador' => $indicador['numero_indicador'] ?? null,
                                    ],
                                    [
                                        'ds_indicador' => $indicador['ds_indicador'] ?? null,
                                        'denominador' => $indicador['denominador'] ?? null,
                                        'numerador' => $indicador['numerador'] ?? null,
                                        'indicador_calculado' => $indicador['indicador_calculado'] ?? null,
                                        'created_at' => now(),
                                        'updated_at' => now(),
                                    ]
                                );
                            }
                        }
                    } catch (\Throwable $e) {
                        $this->command->warn("⚠️ Falha ao importar indicador estadual (UF {$estado->co_uf}) — {$ano}/{$periodo}: {$e->getMessage()}");
                    }
                }

                $this->command->info("✅ Indicadores estaduais importados — {$ano}/{$periodo}");

                /**
                 * ===============================
                 *  INDICADORES DF
                 * ===============================
                 */
                try {
                    $indicadoresDf = $siops->getIndicadorDf($ano, $periodo);

                    if (!empty($indicadoresDf) && is_array($indicadoresDf)) {
                        foreach ($indicadoresDf as $indicador) {
                            DB::table('indicador_df')->updateOrInsert(
                                [
                                    'ano' => $ano,
                                    'periodo' => $periodo,
                                    'numero_indicador' => $indicador['numero_indicador'] ?? null,
                                ],
                                [
                                    'ds_indicador' => $indicador['ds_indicador'] ?? null,
                                    'denominador' => $indicador['denominador'] ?? null,
                                    'numerador' => $indicador['numerador'] ?? null,
                                    'indicador_calculado' => $indicador['indicador_calculado'] ?? null,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]
                            );
                        }
                    }
                } catch (\Throwable $e) {
                    $this->command->warn("⚠️ Falha ao importar indicador DF — {$ano}/{$periodo}: {$e->getMessage()}");
                }

                $this->command->info("✅ Indicadores DF importados — {$ano}/{$periodo}");

                /**
                 * ===============================
                 *  INDICADORES UNIÃO
                 * ===============================
                 */
                try {
                    $indicadoresUniao = $siops->getIndicadorUniao($ano, $periodo);

                    if (!empty($indicadoresUniao) && is_array($indicadoresUniao)) {
                        foreach ($indicadoresUniao as $indicador) {
                            DB::table('indicador_uniao')->updateOrInsert(
                                [
                                    'ano' => $ano,
                                    'periodo' => $periodo,
                                    'numero_indicador' => $indicador['numero_indicador'] ?? null,
                                ],
                                [
                                    'ds_indicador' => $indicador['ds_indicador'] ?? null,
                                    'denominador' => $indicador['denominador'] ?? null,
                                    'numerador' => $indicador['numerador'] ?? null,
                                    'indicador_calculado' => $indicador['indicador_calculado'] ?? null,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]
                            );
                        }
                    }
                } catch (\Throwable $e) {
                    $this->command->warn("⚠️ Falha ao importar indicador da União — {$ano}/{$periodo}: {$e->getMessage()}");
                }

                $this->command->info("✅ Indicadores da União importados — {$ano}/{$periodo}");
            }

            DB::commit();
            $this->command->info("🎯 Indicadores (Estados, DF e União) importados com sucesso (a partir de 2013 / período 2).");

        } catch (\Throwable $e) {
            DB::rollBack();
            $this->command->error("❌ Erro ao importar indicadores do SIOPS: " . $e->getMessage());
        }
    }
}
