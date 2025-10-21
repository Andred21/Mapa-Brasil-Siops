<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsIndicadorMunicipalSeeder extends Seeder
{
    public function run(): void
    {
        $siops = app(SiopsService::class);

        DB::beginTransaction();
        try {
            $anosPeriodos = DB::table('ano_periodo')->get();
            $municipios = DB::table('lista_municipio')->get();

            if ($anosPeriodos->isEmpty() || $municipios->isEmpty()) {
                throw new \Exception('Os dados necessários não estão disponíveis para importar os indicadores municipais SIOPS.');
            }

            // ✅ Filtra apenas anos >= 2013 e período == 2
            $anosPeriodos = $anosPeriodos->filter(fn($a) => (int)$a->ds_ano >= 2013 && (int)$a->nu_periodo === 2);

            foreach ($anosPeriodos as $anoPeriodo) {
                $ano = (int) $anoPeriodo->ds_ano;
                $periodo = (int) $anoPeriodo->nu_periodo;

                $this->command->info("🏙️ Importando indicadores municipais — Ano {$ano}, Período {$periodo}");

                foreach ($municipios as $municipio) {
                    try {
                        $indicadoresMunicipais = $siops->getIndicadorMunicipal($municipio->co_municipio, $ano, $periodo);

                        if (!empty($indicadoresMunicipais) && is_array($indicadoresMunicipais)) {
                            foreach ($indicadoresMunicipais as $indicador) {
                                DB::table('indicador_municipal')->updateOrInsert(
                                    [
                                        'municipio_id' => $municipio->id,
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
                        $this->command->warn("⚠️ Falha ao importar indicador municipal ({$municipio->no_municipio}) — {$ano}/{$periodo}: {$e->getMessage()}");
                    }
                }

                $this->command->info("✅ Indicadores municipais importados — {$ano}/{$periodo}");
            }

            DB::commit();
            $this->command->info("🎯 Indicadores municipais importados com sucesso (a partir de 2013 / período 2).");

        } catch (\Throwable $e) {
            DB::rollBack();
            $this->command->error("❌ Erro ao importar indicadores municipais: " . $e->getMessage());
        }
    }
}
