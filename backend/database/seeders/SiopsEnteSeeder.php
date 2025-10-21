<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Services\SiopsService;
use Illuminate\Support\Facades\DB;


class SiopsEnteSeeder extends Seeder
{

    /* Importar do Api Siops e popular o banco com os entes e anoPeriodo */

    public function run(): void
    {
        $siops = app(SiopsService::class);

        DB::beginTransaction();
        try {

            /* Importar Anos e Período */

            $anosPeriodos = $siops->getAnoPeriodo();

            foreach ($anosPeriodos as $anoPeriodo) {
                DB::table('ano_periodo')->updateOrInsert(
                    [
                        'nu_periodo' => $anoPeriodo['nu_periodo'],
                        'ds_periodo' => $anoPeriodo['ds_periodo'],
                        'ds_ano' => $anoPeriodo['ds_ano'],
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }

            /* Importar Ente Anos */

            $enteAnos = $siops->getAnos();

            foreach ($enteAnos as $enteAno) {
                DB::table('lista_ano_periodo_estadual')->updateOrInsert(
                    [
                        'ano' => $enteAno['ano'],
                        'dsPeriodo' => $enteAno['dsPeriodo'],
                        'periodo' => $enteAno['periodo'],
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }

            /* Importar Ente Estados */

            $enteEstados = $siops->getEstados();
            foreach ($enteEstados as $enteEstado) {
                DB::table('lista_estado')->updateOrInsert(
                    [
                        'co_uf' => $enteEstado['co_uf'],
                        'no_uf' => $enteEstado['no_uf'],
                        'sg_uf' => $enteEstado['sg_uf'],
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }


            /* Importar Ente Municipios */

            $estados = DB::table('lista_estado')->get();
            foreach ($estados as $estado) {
                $coUf = $estado->co_uf;
                $estadoId = $estado->id;
                $municipios = $siops->getMunicipiosPorEstado($coUf);

                if (empty($municipios)) {
                    $this->command->warn("Nenhum município encontrado para o estado {$coUf}. Pulando...");
                    continue;
                }
                foreach ($municipios as $municipio) {
                    DB::table('lista_municipio')->updateOrInsert(
                        [
                            'estado_id' => $estadoId,
                            'co_municipio' => $municipio['co_municipio'],
                            'no_municipio' => $municipio['no_municipio'],
                        ],
                        [
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]
                    );
                }
                $this->command->info("Importados municípios para o estado {$coUf}.");
            }
            DB::commit();
            $this->command->info("Dados do SIOPS importados com sucesso.");

        } catch (\Throwable $e) {
            DB::rollBack();
            $this->command->error("Erro ao importar dados do SIOPS: " . $e->getMessage());
        }
    }
}
