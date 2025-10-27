<?php

namespace Database\Seeders\Populacao;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsPopulationUniaoSeeder extends Seeder
{

    /* Importar da Api Siops e popular o banco com População da União*/

    public function run(): void
    {
        $siops = app(SiopsService::class);
        DB::beginTransaction();

        try {

            $anosPeriodos = DB::table('ano_periodo')->get();

            if ($anosPeriodos->isEmpty()) {
                throw new \Exception('Os dados necessários não estão disponíveis para importar os indicadores Siops.');
            }

            foreach ($anosPeriodos as $anoPeriodo) {
                $ano = $anoPeriodo->ds_ano;
                $periodo = $anoPeriodo->nu_periodo;

                $this->command->info("Importando população para o ano: {$ano}, período: {$periodo}");

                /* População União */

                try {
                    $populacaoUniao = $siops->getPopulacaoUniao($ano);

                    if (!empty($populacaoUniao)) {

                        foreach ($populacaoUniao as $populacaoU) {
                            
                            DB::table('populacao_uniao')->updateOrInsert(
                                [

                                    'ano' => $ano,
                                    'populacao' => is_array($populacaoU)
                                        ? ($populacaoU['populacao'] ?? null)
                                        : $populacaoU,
                                ],
                                [

                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]
                            );
                        }
                    }
                } catch (\Throwable $e) {
                    $this->command->warn("Erro ao importar população da União para o ano {$ano}: " . $e->getMessage());              
                }                
            }

            $this->command->info("População da União importada com sucesso para o ano: {$ano}");
            
            DB::commit();

            $this->command->info("Dados de população do SIOPS importados com sucesso.");
            
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->command->error("Erro ao importar dados de população do SIOPS: " . $e->getMessage());
            return;
        }
    }
}
