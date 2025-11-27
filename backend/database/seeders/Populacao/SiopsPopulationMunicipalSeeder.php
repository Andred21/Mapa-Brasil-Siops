<?php

namespace Database\Seeders\Populacao;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsPopulationMunicipalSeeder extends Seeder
{

    /* Seeder para armazenar a população de todos os municipios  */

    public function run(): void
    {
        $siops = app(SiopsService::class);

        // Filtra apenas ano/periodo válidos
        $anosPeriodos = DB::table('ano_periodo')
            ->where('nu_periodo', '1')
            ->get();

        $estados = DB::table('lista_estado')->get();

        if ($anosPeriodos->isEmpty() || $estados->isEmpty()) {
            $this->command->error("❌ Dados insuficientes para importar população municipal.");
            return;
        }

        foreach ($anosPeriodos as $anoPeriodo) {
            $ano = $anoPeriodo->ds_ano;
            $periodo = $anoPeriodo->nu_periodo;

            if ($ano < 2025) {
                continue;
            }


            $this->command->info("📊 Importando população municipal para o ano: {$ano}, período: {$periodo}");

            // Processa os municípios em blocos de 100
            DB::table('lista_municipio')->orderBy('id')->chunk(100, function ($municipios) use ($siops, $estados, $ano, $periodo) {
                $loteInsert = [];

                foreach ($municipios as $municipio) {
                    try {
                        $estado = $estados->firstWhere('id', $municipio->estado_id);
                        $uf = $estado?->co_uf;

                        if (!$uf)
                            continue;

                        $pop = $siops->getPopulacaoMunicipio($uf, $municipio->co_municipio, $ano, $periodo);

                        if (!empty($pop) && isset($pop['populacao'])) {
                            // Deleta dados antigos
                            DB::table('populacao_municipal_retorno')
                                ->where('municipio_id', $municipio->id)
                                ->where('anoValido', $ano)
                                ->where('periodoValido', $periodo)
                                ->delete();

                            // Adiciona ao lote
                            $loteInsert[] = [
                                'municipio_id' => $municipio->id,
                                'anoValido' => $ano,
                                'periodoValido' => $periodo,
                                'populacao' => (string) $pop['populacao'],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            $this->command->line("✔️ Município {$municipio->no_municipio} ({$municipio->co_municipio}) — População: {$pop['populacao']}");
                        }
                    } catch (\Throwable $e) {
                        $this->command->warn("⚠️ Erro no município {$municipio->no_municipio} ({$municipio->co_municipio}): " . $e->getMessage());
                    }
                }

                // 🔥 Insere em lote
                if (!empty($loteInsert)) {
                    DB::table('populacao_municipal_retorno')->insert($loteInsert);
                }
            });

            $this->command->info("✅ População municipal finalizada para o ano {$ano} / período {$periodo}");
        }

        $this->command->info("🎉 Importação de população MUNICIPAL concluída com sucesso.");
    }
}
