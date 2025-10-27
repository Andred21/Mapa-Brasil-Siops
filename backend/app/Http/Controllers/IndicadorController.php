<?php

namespace App\Http\Controllers;

use App\Services\IndicadorService;



class IndicadorController extends Controller
{
    public function __construct(protected IndicadorService $indicadorService)
    {
    }

    // Indicador Estadual

    public function estadual(string $coUf)
    {
        return response()
            ->json(
                data: $this->indicadorService->getIndicadorEstadualCodUf($coUf)
            );
    }

    public function estadualPorAno(string $coUf, string $ano)
    {
        return response()->json(
            $this->indicadorService->getIndicadorEstadualAno($coUf, $ano)
        );

    }

    // Indicador Municipal

    public function municipal(string $coMunicipio)
    {
        return response()->json(
            $this->indicadorService->getIndicadorMunicipalCodMunicipio($coMunicipio)
        );
    }

    public function municipalPorAno(string $coMunicipio, string $ano)
    {

        return response()->json(
            $this->indicadorService->getIndicadorMunicipalAno($coMunicipio, $ano)
        );

    }


    // Indicador DF (Distrito Federal)

    public function df()
    {
        return response()->json(
            $this->indicadorService->getIndicadoresDf()
        );
    }

    public function dfPorAno(string $ano)
    {

        return response()->json(
            $this->indicadorService->getIndicadoresDFAno($ano)
        );

    }

    // Indicador União 


    public function uniao()
    {

        return response()->json(
            $this->indicadorService->getIndicadoresUniao()
        );

    }

    public function uniaoPorAno(string $ano)
    {

        return response()->json(
            $this->indicadorService->getIndicadoresUniaoAno($ano)
        );

    }

}
