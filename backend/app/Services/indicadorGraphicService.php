<?php


namespace App\Services;

use App\Helpers\IndicadorHelper;
use Illuminate\Support\Collection;

class IndicadorGraphicService
{

    public function __construct(
        protected IndicadorService $indicadorService,
    ) {
    }


    /**
     * 
     * Helper que busca os indicadores por Tipo de Entidade (Município, UF, DF e União)
     * 
     */
    private function getIndicadoresPorTipo(string $tipo, string $codigo, int $ano): array
    {
        return match ($tipo) {
            'estado' => $this->indicadorService->getIndicadorEstadualAno($codigo, (string) $ano)?->toArray() ?? [],
            'municipio' => $this->indicadorService->getIndicadorMunicipalAno($codigo, (string) $ano)?->toArray() ?? [],
            'df' => $this->indicadorService->getIndicadoresDFAno((string) $ano)?->toArray() ?? [],
            'uniao' => $this->indicadorService->getIndicadoresUniaoAno((string) $ano)?->toArray() ?? [],
            default => [],
        };
    }


    public function composicaoReceita(string $tipo, string $codigo, int $ano): array
    {
        $ind = $this->getIndicadoresPorTipo($tipo, $codigo, $ano);

        $impostos = IndicadorHelper::findValor($ind, '1.1', '%');
        $transfTot = IndicadorHelper::findValor($ind, '1.2', '%');
        $impMaisLeg = IndicadorHelper::findValor($ind, '1.6', '%');

        $outras = max(0, 100 - ($impostos + $transfTot));

        return [
            'title' => "Composição da Receita ($ano)",
            'unit' => '%',
            'labels' => ['Impostos', 'Transferências', 'Outras'],
            'series' => ['name' => (string) $ano, 'data' => [$impostos, $transfTot, $outras]],
            'meta' => compact('tipo', 'codigo', 'ano')

        ];

    }


    public function composicaoReceitaPorAnos(string $tipo, string $codigo, array $anos): array
    {
        $labels = []; // anos no eixo X
        $impostos = [];
        $transferencias = [];
        $outras = [];

        foreach ($anos as $ano) {
            $res = $this->composicaoReceita($tipo, $codigo, $ano);

            $labels[] = (string) $ano;
            $impostos[] = $res['series']['data'][0];        // Impostos
            $transferencias[] = $res['series']['data'][1];  // Transferências
            $outras[] = $res['series']['data'][2];          // Outras
        }

        return [
            'title' => 'Composição da Receita por Ano',
            'unit' => '%',
            'labels' => $labels,
            'series' => [
                [
                    'name' => 'Impostos',
                    'data' => $impostos
                ],
                [
                    'name' => 'Transferências',
                    'data' => $transferencias
                ],
                [
                    'name' => 'Outras',
                    'data' => $outras
                ]
            ],
            'meta' => compact('tipo', 'codigo', 'anos')
        ];
    }


    public function fontesSaude(string $tipo, string $codigo, int $ano): array
    {
        $ind = $this->getIndicadoresPorTipo($tipo, $codigo, $ano);

        $itens = [
            [
                'label' => 'SUS / total transferido ao ente',
                'value' => IndicadorHelper::findValor($ind, '1.3', '%'),
                'code' => '1.3'
            ],
            [
                'label' => 'União / total da saúde',
                'value' => IndicadorHelper::findValor($ind, '1.4', '%'),
                'code' => '1.4'
            ],
            [
                'label' => 'SUS / transf. da União',
                'value' => IndicadorHelper::findValor($ind, '1.5', '%'),
                'code' => '1.5'
            ],
        ];

        return [
            'title' => "Fontes de Saúde ($ano)",
            'unit' => '%',
            'items' => $itens,
            'meta' => compact('tipo', 'codigo', 'ano')
        ];
    }


    public function despesaSaude(string $tipo, string $codigo, int $ano): array
    {
        $ind = $this->getIndicadoresPorTipo($tipo, $codigo, $ano);

        $segments = [
            ['label' => 'Pessoal', 'value' => IndicadorHelper::findValor($ind, '2.2', '%'), 'code' => '2.2'],
            ['label' => 'Medicamentos', 'value' => IndicadorHelper::findValor($ind, '2.3', '%'), 'code' => '2.3'],
            ['label' => 'Serv. Terceiros', 'value' => IndicadorHelper::findValor($ind, '2.4', '%'), 'code' => '2.4'],
            ['label' => 'Investimentos', 'value' => IndicadorHelper::findValor($ind, '2.5', '%'), 'code' => '2.5'],
            ['label' => 'IPSFL', 'value' => IndicadorHelper::findValor($ind, '2.6', '%'), 'code' => '2.6'],
        ];

        $kpis = [
            [
                'label' => 'Despesa por habitante',
                'value' => IndicadorHelper::findValor($ind, '2.1', 'BRL'),
                'unit' => 'BRL',
                'code' => '2.1'
            ]
        ];

        return [
            'title' => "Composição da Despesa de Saúde ($ano)",
            'unit' => '%',
            'segments' => $segments,
            'kpis' => $kpis,
            'meta' => compact('tipo', 'codigo', 'ano')
        ];
    }

    public function lc141(string $tipo, string $codigo, int $ano): array
    {
        $ind = $this->getIndicadoresPorTipo($tipo, $codigo, $ano);

        $value = IndicadorHelper::findValor($ind, '3.2', '%');
        $target = $tipo === 'estado' ? 12.00 : ($tipo === 'municipio' ? 15.00 : 0.00);

        $status = $value <=> $target;
        $statusStr = $status < 0 ? 'below' : ($status > 0 ? 'above' : 'at');

        return [
            'title' => "Aplicação em Saúde (LC 141)",
            'unit' => '%',
            'value' => $value,
            'target' => $target,
            'status' => $statusStr,
            'code' => '3.2',
            'year' => $ano,
            'meta' => compact('tipo', 'codigo')
        ];
    }
    public function serieTemporal(string $tipo, string $codigo, string $csvIndicadores, int $inicio, int $fim): array
    {
        $codigos = array_map('trim', explode(',', $csvIndicadores));
        $labels = range($inicio, $fim);
        $series = [];

        foreach ($codigos as $cod) {
            $data = [];

            foreach ($labels as $ano) {
                $ind = $this->getIndicadoresPorTipo($tipo, $codigo, $ano);

                $valores = IndicadorHelper::findValoresCompletos($ind, $cod);

                $data[] = $valores;
            }

            $series[] = [
                'name' => $cod,
                'data' => $data
            ];
        }

        return [
            'title' => 'Série Temporal',
            'unit' => 'mixed',
            'labels' => array_map('strval', $labels),
            'series' => $series,
            'meta' => compact('tipo', 'codigo')
        ];
    }


    public function calcularEstatisticasFromSerie(array $dados, string $anoInicio, string $anoFinal, string $nomeIndicador): array
    {
        $anos = (int) $anoFinal - (int) $anoInicio;

        // Função interna para calcular estatísticas de um campo (indicador, numerador ou denominador)
        $calcular = function (array $valores) use ($anos) {
            $valores = array_values(array_filter($valores, fn($v) => is_numeric($v)));
            $total = count($valores);

            if ($total < 2) {
                return [
                    'mensagem' => 'Dados insuficientes',
                    'valor_inicial' => null,
                    'valor_final' => null,
                    'media' => null,
                    'minimo' => null,
                    'maximo' => null,
                    'crescimento_absoluto' => null,
                    'crescimento_percentual' => null,
                    'crescimento_medio_anual' => null,
                    'tendencia' => null,
                    'soma' => null
                ];
            }

            $inicial = $valores[0];
            $final = $valores[$total - 1];
            $media = array_sum($valores) / $total;
            $soma = array_sum($valores);
            $min = min($valores);
            $max = max($valores);
            $crescimentoAbs = $final - $inicial;
            $crescimentoPerc = $inicial != 0 ? ($crescimentoAbs / $inicial) * 100 : 0;
            $crescimentoMedio = ($anos > 0 && $inicial > 0) ? (pow($final / $inicial, 1 / $anos) - 1) * 100 : 0;
            $tendencia = match (true) {
                $final > $inicial => 'Crescimento',
                $final < $inicial => 'Queda',
                default => 'Estável',
            };

            return [
                'valor_inicial' => round($inicial, 2),
                'valor_final' => round($final, 2),
                'media' => round($media, 2),
                'minimo' => round($min, 2),
                'maximo' => round($max, 2),
                'crescimento_absoluto' => round($crescimentoAbs, 2),
                'crescimento_percentual' => round($crescimentoPerc, 2),
                'crescimento_medio_anual' => round($crescimentoMedio, 3),
                'tendencia' => $tendencia,
                'soma' => round($soma, 2)
            ];
        };

        // Extrair os dados
        $indicadores = array_column($dados, 'indicador');
        $numeradores = array_column($dados, 'numerador');
        $denominadores = array_column($dados, 'denominador');

        return [
            'nome_indicador' => $nomeIndicador,
            'ano_inicio' => (int) $anoInicio,
            'ano_final' => (int) $anoFinal,
            'indicador' => $calcular($indicadores),
            'numerador' => $calcular($numeradores),
            'denominador' => $calcular($denominadores),
        ];
    }

    public function getEstatisticasIndicadoresFromSerie(string $tipo, string $codigo, string $csvIndicadores, int $inicio, int $fim): array
    {
        $serie = $this->serieTemporal($tipo, $codigo, $csvIndicadores, $inicio, $fim);

        $estatisticas = [];

        foreach ($serie['series'] as $serieData) {
            $estatisticas[] = $this->calcularEstatisticasFromSerie($serieData['data'], $inicio, $fim, $serieData['name']);
        }

        return [
            'estatisticas' => $estatisticas,
            'labels' => $serie['labels'],
            'meta' => $serie['meta']
        ];
    }



}
