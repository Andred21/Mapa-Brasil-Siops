<?php

namespace App\Http\Controllers;

use App\Services\IndicadorGraphicService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class IndicadorGraphicController extends Controller
{
    public function __construct(
        protected IndicadorGraphicService $graficoService
    ) {
    }

    /**
     * 
     * Composição da Receita (gráfico de pizza ou barras)
     * 
     */
    public function composicaoReceita(Request $request, string $tipo, string $codigo, int $ano): JsonResponse
    {
        $data = $this->graficoService->composicaoReceita($tipo, $codigo, $ano);
        return response()->json($data);
    }

    public function composicaoReceitaPorPeriodo(Request $request, string $tipo, string $codigo): JsonResponse
    {
        $anos = explode(',', $request->get('anos')); // ?anos=2021,2022,2023
        $anos = array_map('intval', $anos);

        $data = $this->graficoService->composicaoReceitaPorAnos($tipo, $codigo, $anos);

        return response()->json($data);
    }


    /**
     * 
     * Fontes de Saúde (1.3, 1.4, 1.5)
     * 
     */
    public function fontesSaude(Request $request, string $tipo, string $codigo, int $ano): JsonResponse
    {
        $data = $this->graficoService->fontesSaude($tipo, $codigo, $ano);
        return response()->json($data);
    }

    /**
     * 
     * Despesas com Saúde (2.1–2.6)
     * 
     */
    public function despesaSaude(Request $request, string $tipo, string $codigo, int $ano): JsonResponse
    {
        $data = $this->graficoService->despesaSaude($tipo, $codigo, $ano);
        return response()->json($data);
    }

    /**
     * 
     * Aplicação mínima em saúde – LC 141
     * 
     */
    public function lc141(Request $request, string $tipo, string $codigo, int $ano): JsonResponse
    {
        $data = $this->graficoService->lc141($tipo, $codigo, $ano);
        return response()->json($data);
    }

    /**
     * 
     * Série Temporal (vários anos)
     * Exemplo: indicadores separados por vírgula: "1.1,1.2,1.6"
     * GET /api/graficos/serie-temporal/{tipo}/{codigo}?indicadores=1.1,1.2&inicio=2015&fim=2024
     * 
     */
    public function serieTemporal(Request $request, string $tipo, string $codigo): JsonResponse
    {
        $csv = $request->query('indicadores', '1.1');
        $inicio = (int) $request->query('inicio', date('Y') - 5);
        $fim = (int) $request->query('fim', date('Y'));

        $data = $this->graficoService->serieTemporal($tipo, $codigo, $csv, $inicio, $fim);
        return response()->json($data);
    }

    public function estatisticasSerieIndicadores(
        Request $request,
        string $tipo,
        string $codigo
    ): JsonResponse {
        $csv = $request->query('indicadores', '1.1');
        $inicio = (int) $request->query('inicio', date('Y') - 5);
        $fim = (int) $request->query('fim', date('Y'));

        try {
            $dados = $this->graficoService->getEstatisticasIndicadoresFromSerie(
                $tipo,
                $codigo,
                $csv,
                $inicio,
                $fim
            );
            return response()->json($dados);
        } catch (\Throwable $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }
}
