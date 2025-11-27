<?php

namespace Database\Seeders\Populacao;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsPopulationEstadualSeeder extends Seeder
{

    /* Seeder para armazenar a população de todos os estados  */

    public function run(): void
    {
        $siops = app(SiopsService::class);
        DB::beginTransaction();

        try {
            $anosPeriodos = DB::table('ano_periodo')
                ->where('nu_periodo', '1')
                ->get();

            $estados = db::table('lista_estado')->get();

            if ($anosPeriodos->isEmpty() || $estados->isEmpty()) {
                throw new \Exception('Os dados necessários não estão disponíveis para importar os indicadores Siops.');
            }

            foreach ($anosPeriodos as $anoPeriodo) {
                $ano = $anoPeriodo->ds_ano;
                $periodo = $anoPeriodo->nu_periodo;
                
                if ($ano < 2025) {
                    continue;
                }



                $this->command->info("Importando população para o ano: {$ano}, período: {$periodo}");

                /* População Estadual */

                foreach ($estados as $estado) {
                    try {
                        $populacaoEstadual = $siops->getPopulacaoEstado($estado->co_uf, $ano, $periodo);

                        if (!empty($populacaoEstadual) && is_array($populacaoEstadual)) {
                            foreach ($populacaoEstadual as $populacaoEstado) {
                                DB::table('populacao_estadual_retorno')->updateOrInsert(
                                    [
                                        'estado_id' => $estado->id,
                                        'anoValido' => $ano,
                                        'periodoValido' => $periodo,



                                    ],
                                    [
                                        'populacao' => (string) $populacaoEstadual['populacao'],
                                        'created_at' => now(),
                                        'updated_at' => now(),
                                    ]
                                );
                            }
                        }
                    } catch (\Throwable $e) {
                        $this->command->error("Erro ao importar população estadual para o estado {$estado->co_uf}, ano {$ano}, período {$periodo}: " . $e->getMessage());
                    }
                }
            }

            DB::commit();
            $this->command->info('Importação de população estadual concluída com sucesso.');
        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Erro durante a importação de população estadual: ' . $e->getMessage());
        }
    }
}