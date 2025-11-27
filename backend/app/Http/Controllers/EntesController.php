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


    /**
     * 
     * Retorna a lista dos anos e peridos disponiveis
     * 
     */
    public function anosPeriodos()
    {
        return response()
            ->json($this->entesService->listaAnosPeriodos());
    }

    /**
     *
     * Retorna o ano e periodo selecionado
     * @param mixed $ano ano selecionado
     * @param mixed $periodo periodo selecionado
     *
     */
    public function buscarAnoPeriodo($ano, $periodo)
    {
        return response()
            ->json($this->entesService->buscarAnoPerido($ano, $periodo));
    }

    /* Estados */

    /**
     * 
     * Retorna a lista dos estados disponiveis
     * 
     */
    public function estados()
    {
        return response()
            ->json($this->entesService->listarEstado());
    }

    /**
     * 
     * Busca o estado selecionado
     * @param mixed $codEstado código do estado selecionado
     * 
     */
    public function buscarEstado($codEstado)
    {
        return response()
            ->json($this->entesService->buscarEstadoPorCod($codEstado));
    }

    /* Municipios */

    /**
     * 
     * Retorna a lista dos municipios disponiveis
     * 
     */
    public function municipios()
    {
        return response()
            ->json($this->entesService->listarMunicipios());
    }

    /**
     * 
     * Retorna os municipios do estado selecionado
     * @param mixed $coUf código do estado
     * 
     */
    public function municipiosPorEstado($coUf)
    {
        try {

            $municipios = $this->entesService->listarMunicipiosPorUf($coUf);
            return response()->json($municipios);

        } catch (\Throwable $e) {

            return response()->json(['error' => $e->getMessage()], 404);

        }

    }

    /**
     * 
     * Busca o municipio selecionado
     * @param mixed $coMunicipio código do municipio selecionado
     * 
     */
    public function buscarMunicipio($coMunicipio)
    {
        $municipio = $this->entesService->buscarMunicipioPorCod($coMunicipio);

        if (!$municipio) {
            return response()->json(['error' => 'Município não encontrado'], 404);
        }

        return response()->json($municipio);
    }


    /**
     * 
     * Retorna o estado do municipio selecionado
     * @param mixed $coMunicipio código do municipio selecionado
     * 
     */
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
