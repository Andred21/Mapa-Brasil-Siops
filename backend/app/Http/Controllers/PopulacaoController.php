<?php

namespace App\Http\Controllers;

use App\Services\PopulacaoService;

class PopulacaoController extends Controller
{
    public function __construct(protected PopulacaoService $populacaoService)
    {
    }

    // População Estadual 

    /**
     * 
     * Retorna População do estado 
     * @param string $coUf código estado selecionado
     * 
     */
    public function estadualPorUf(string $coUf)
    {
        return response()->json(
            $this->populacaoService->getPopulacacaoEstadualPorCodUf($coUf)
        );
    }

    /**
     * 
     * Retorna População do estado anualmente
     * @param string $coUf código estado selecionado
     * @param string $ano ano selecionado
     * 
     */
    public function estadualPorAno(string $coUf, string $ano)
    {
        $estado = $this->populacaoService->getPopulacacaoEstadualPorCodUf($coUf);
        $estadoId = $estado->first()?->estado_id ?? null;

        if (!$estadoId) {
            return response()->json(['message' => 'Estado não encontrado.'], 404);
        }

        return response()->json(
            $this->populacaoService->getPopulacaoEstadualPorAno($ano, $estadoId)
        );
    }

    /**
     * 
     * Retorna crescimento populacional do estado entre um período
     * @param string $coUf código do estado selecionado
     * @param string $anoInicio ano incial do periodo
     * @param string $anoFinal ano final do periodo
     * 
     */
    public function crescimentoPopulacaoEstadual(string $coUf, string $anoInicio, string $anoFinal)
    {
        return response()->json($this->populacaoService->getCrescimentoPopulacionaEstadual($coUf, $anoInicio, $anoFinal));
    }

    /**
     * 
     * Retorna os indicadores populacionais do estado entre o periodo selecionado
     * @param string $uf código do estado
     * @param string $anoInicio ano inicial do periodo
     * @param string $anoFinal ano final do periodo
     * 
     */
    public function indicadoresEstadual(string $uf, string $anoInicio, string $anoFinal)
    {
        try {
            $dados = $this->populacaoService->getIndicadoresPopulacionaisEstadual($uf, $anoInicio, $anoFinal);
            return response()->json($dados);
        } catch (\Throwable $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }

    // População Municipal


    /**
     * 
     * Retorna População do município
     * @param string $coMunicipio código município selecionado
     * 
     */
    public function municipalPorCod(string $coMunicipio)
    {
        return response()->json(
            $this->populacaoService->getPopulacaoMunicipalPorCod($coMunicipio)
        );
    }

    /**
     * 
     * Retorna População do muncípio anualmente
     * @param string $coMunicipio código estado selecionado
     * @param string $ano ano selecionado
     * @return \Illuminate\Http\JsonResponse
     * 
     */
    public function municipalPorAno(string $coMunicipio, string $ano)
    {
        $dados = $this->populacaoService->getPopulacaoMunicipalPorCod($coMunicipio);
        $municipioId = $dados->first()?->municipio_id ?? null;

        if (!$municipioId) {
            return response()->json(['message' => 'Município não encontrado.'], 404);
        }

        return response()->json(
            $this->populacaoService->getPopupalacaoMunicipalPorAno($ano, $municipioId)
        );
    }

    /**
     * 
     * Retorna crescimento populacional do municipio entre um período
     * @param string $coMunicipio código do muncipio selecionado
     * @param string $anoInicio ano incial do periodo
     * @param string $anoFinal ano final do periodo
     * 
     */
    public function crescimentoPopulacaoMuncipal(string $coMunicipio, string $anoInicio, string $anoFinal)
    {
        return response()->json($this->populacaoService->getCrescimentoPopulacionalMunicipal($coMunicipio, $anoInicio, $anoFinal));
    }


    /**
     * 
     * Retorna os indicadores populacionais do municipio entre o periodo selecionado
     * @param string $codMunicipio código do municipio
     * @param string $anoInicio ano inicial do periodo
     * @param string $anoFinal ano final do periodo
     * 
     */
    public function indicadoresMunicipal(string $codMunicipio, string $anoInicio, string $anoFinal)
    {
        try {
            $dados = $this->populacaoService->getIndicadoresPopulacionaisMunicipal($codMunicipio, $anoInicio, $anoFinal);
            return response()->json($dados);
        } catch (\Throwable $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }

    // População da União


    /**
     * 
     * Retorna a população da União
     * 
     */
    public function uniao()
    {
        return response()->json(
            $this->populacaoService->getPopulacaoUniao()
        );
    }

    /**
     * 
     * Retorna População da União anualmente
     * @param string $ano ano selecionado
     * 
     */
    public function uniaoPorAno(string $ano)
    {
        return response()->json(
            $this->populacaoService->getPopulacaoUniaoAno($ano)->first()
        );
    }


    /**
     * 
     * Retorna crescimento populacional da União entre um período
     * @param string $anoInicio ano incial do periodo
     * @param string $anoFinal ano final do periodo
     * 
     */
    public function crescimentoPopulacaoUniao(string $anoInicio, string $anoFinal)
    {
        return response()->json($this->populacaoService->getCrescimentoPopulacionalUniao($anoInicio, $anoFinal));
    }

    /**
     * 
     * Retorna os indicadores populacionais da União entre o periodo selecionado
     * @param string $anoInicio ano inicial do periodo
     * @param string $anoFinal ano final do periodo
     * 
     */
    public function indicadoresUniao(string $anoInicio, string $anoFinal)
    {
        try {
            $dados = $this->populacaoService->getIndicadoresPopulacionaisUniao($anoInicio, $anoFinal);
            return response()->json($dados);
        } catch (\Throwable $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }



}
