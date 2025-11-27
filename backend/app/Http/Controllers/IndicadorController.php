<?php

namespace App\Http\Controllers;

use App\Services\IndicadorService;



class IndicadorController extends Controller
{
    public function __construct(protected IndicadorService $indicadorService)
    {
    }

    // Indicador Estadual

    /**
     * 
     * Retorna os indicadores do estado selecionado
     * @param string $coUf código do estado
     * 
     */
    public function estadual(string $coUf)
    {
        return response()
            ->json(
                data: $this->indicadorService->getIndicadorEstadualCodUf($coUf)
            );
    }

    /**
     * 
     * Retorna os indicadores do estado selecionado anualemnte
     * @param string $coUf código do estado
     * @param string $ano ano selecionado
     * 
     */
    public function estadualPorAno(string $coUf, string $ano)
    {
        return response()->json(
            $this->indicadorService->getIndicadorEstadualAno($coUf, $ano)
        );

    }

    public function estadualEspecificoPorAno(string $coUf, string $numeroIndicador, string $ano)
    {
        return response()->json(
            $this->indicadorService->getIndicadoreEspecificoEstadualAno($coUf, $numeroIndicador, $ano)
        );

    }

    // Indicador Municipal

    /**
     * 
     * Retorna os indicadores do municipio selecionado
     * @param string $coMunicipio código do municipio
     * 
     */
    public function municipal(string $coMunicipio)
    {
        return response()->json(
            $this->indicadorService->getIndicadorMunicipalCodMunicipio($coMunicipio)
        );
    }

    /**
     * 
     * Retorna os indicadores do municipio selecionado anualemnte
     * @param string $coMunicipio código do municipio
     * @param string $ano ano selecionado
     * 
     */
    public function municipalPorAno(string $coMunicipio, string $ano)
    {

        return response()->json(
            $this->indicadorService->getIndicadorMunicipalAno($coMunicipio, $ano)
        );

    }

    public function municipalEspecificoPorAno(string $coMunicipio, string $numeroIndicador, string $ano)
    {
        return response()->json(
            $this->indicadorService->getIndicadoreEspecificoMunicipalAno($coMunicipio, $numeroIndicador, $ano)
        );

    }


    // Indicador DF (Distrito Federal)

    /**
     * 
     * 
     * 
     */
    public function df()
    {
        return response()->json(
            $this->indicadorService->getIndicadoresDf()
        );
    }

    /**
     * 
     * Retorna os indicadores do Distrito Federal anualmente
     * @param string $ano ano selecionado
     * 
     */
    public function dfPorAno(string $ano)
    {

        return response()->json(
            $this->indicadorService->getIndicadoresDFAno($ano)
        );

    }

    public function dfEspecificoPorAno(string $numeroIndicador, string $ano)
    {
        return response()->json(
            $this->indicadorService->getIndicadoreEspecificoDFAno($numeroIndicador, $ano)
        );

    }

    // Indicador União 

    /**
     * 
     * Retorna os indicadores da União
     * 
     */
    public function uniao()
    {

        return response()->json(
            $this->indicadorService->getIndicadoresUniao()
        );

    }

    /**
     * 
     * Retorna os indicadores da União anualmente
     * @param string $ano ano selecionado
     * 
     */
    public function uniaoPorAno(string $ano)
    {

        return response()->json(
            $this->indicadorService->getIndicadoresUniaoAno($ano)
        );

    }

    public function uniaoEspecificoPorAno(string $numeroIndicador, string $ano)
    {
        return response()->json(
            $this->indicadorService->getIndicadoreEspecificoUniaoAno($numeroIndicador, $ano)
        );

    }

}
