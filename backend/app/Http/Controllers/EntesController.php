<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EntesService;

class EntesController extends Controller
{
    public function __construct(protected EntesService $entesService)
    {
    }

    /* Anos e Periodos */
    public function anosPeriodos()
    {
        return response()
            ->json($this->entesService->listaAnosPeriodos());
    }

    public function buscarAnoPeriodo($ano, $periodo)
    {
        return response()
            ->json($this->entesService->buscarAnoPerido($ano, $periodo));
    }

    /* Estados */
    public function estados()
    {
        return response()
            ->json($this->entesService->listarEstado());
    }

    public function buscarEstado($codEstado)
    {
        return response()
            ->json($this->entesService->buscarEstadoPorCod($codEstado));
    }

    /* Municipios */

    public function municipios()
    {
        return response()
            ->json($this->entesService->listarMunicipios());
    }

    public function municipiosPorEstado($coUf)
    {
        try {

            $municipios = $this->entesService->listarMunicipiosPorUf($coUf);
            return response()->json($municipios);

        } catch (\Throwable $e) {

            return response()->json(['error' => $e->getMessage()], 404);

        }

    }

    public function buscarMunicipio($coMunicipio)
    {
        $municipio = $this->entesService->buscarMunicipioPorCod($coMunicipio);

        if (!$municipio) {
            return response()->json(['error' => 'Município não encontrado'], 404);
        }

        return response()->json($municipio);
    }


    public function getEstadoByMunicipioCod($coMunicipio)
    {
        try {
            $estado = $this->entesService->buscarEstadoPorMunicipioCod($coMunicipio);

            if (!$estado) {
                return response()->json(['message' => 'Estado não encontrado.'], 404);
            }

            return response()->json($estado);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar estado: ' . $e->getMessage()
            ], 500);
        }
    }

}
