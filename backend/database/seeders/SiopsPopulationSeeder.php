<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;

class SiopsPopulationSeeder extends Seeder
{

    /* Importar da Api Siops e popu,lar o banco com População */

    public function run(): void
    {
        $siops = app(SiopsService::class);
        DB::beginTransaction();
        try {
            $anosPeriodos = DB::table('ano_periodo')->get();
            $estados = db::table('lista_estado')->get();
            $municipios = db::table('lista_municipio')->get();
            
            
            if ($anosPeriodos->isEmpty() || $estados->isEmpty() || $municipios->isEmpty()) {
                throw new \Exception('Os dados necessários não estão disponíveis para importar os indicadores Siops.');
            }

            foreach ($anosPeriodos as $anoPeriodo) {
                $ano = $anoPeriodo->ds_ano;
                $periodo = $anoPeriodo->nu_periodo;

                $this->command->info("Importando população para o ano: {$ano}, período: {$periodo}");   

                /* População Estadual */

                foreach ($estados as $estado) {
                    try {
                        $populacaoEstadual = $siops->getPopulacaoEstado($estado->co_uf, $ano, $periodo);    

                       if(!empty($populacaoEstadual)) {
                        foreach ($populacaoEstadual as $populacaoEstado) {
                            DB::table('populacao_estadual_retorno')->updateOrInsert(
                                [
                                    'estado_id' => $estado->id,
                                    'anoValido' => $ano,
                                    'periodoValido' => $periodo,
                                    'populacao' => $populacaoEstado['populacao'],
                                ],
                                [
                                 
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]
                            );
                        }
                       }
                    } catch (\Throwable $e) {
                        $this->command->warn("Erro ao importar população estadual para o estado {$estado->co_uf}, ano {$ano}, período {$periodo}: " . $e->getMessage());  
                    }   
                }  
                $this->command->info("População estadual importada com sucesso para o ano: {$ano}, período: {$periodo}");   

                /* População Municipal */
                foreach ($municipios as $municipio) {
                    try {
                        $populacaoMunicipal = $siops->getPopulacaoMunicipio($estado->co_uf,$municipio->co_municipio, $ano, $periodo);    

                       if(!empty($populacaoMunicipal)) {
                        foreach ($populacaoMunicipal as $populacaoMun) {
                            DB::table('populacao_municipal_retorno')->updateOrInsert(
                                [
                                    'municipio_id' => $municipio->id,
                                    'anoValido' => $ano,
                                    'periodoValido' => $periodo,
                                   
                                ],
                                [
                                 'populacao' => $populacaoMun['populacao'],
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]
                            );
                        }
                       }
                    } catch (\Throwable $e) {
                        $this->command->warn("Erro ao importar população municipal para o município {$municipio->co_municipio}, ano {$ano}, período {$periodo}: " . $e->getMessage());  
                    }   

                }
                $this->command->info("População municipal importada com sucesso para o ano: {$ano}, período: {$periodo}");  

                /* População União */
                try {
                    $populacaoUniao = $siops->getPopulacaoUniao($ano);    

                   if(!empty($populacaoUniao)) {
                    foreach ($populacaoUniao as $populacaoU) {
                        DB::table('populacao_uniao')->updateOrInsert(
                            [
                                'anoValido' => $ano,
                                'populacao' => $populacaoU['populacao'],
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
