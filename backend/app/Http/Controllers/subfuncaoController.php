<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SubfuncaoService;


class subfuncaoController extends Controller
{

    public function __construct(
        protected SubfuncaoService $subfuncaoService
    ) {
    }

    // Estado

    public function allEstado()
    {
        return response()->json($this->subfuncaoService->subfuncaoEstadoAll());
    }

    public function porEstadoCodUf(string $coUf)
    {
        return response()->json($this->subfuncaoService->getSubfuncaoEstadoCodUf($coUf));
    }

    public function grupoDescricaoEstado(Request $request)
    {
        $item = $request->input('item');
        return response()->json($this->subfuncaoService->getGrupoDescricaoEstado($item));
    }

    public function porEstadoEAno($coUf, $ano)
    {
        try {
            $dados = $this->subfuncaoService->getSubfuncaoEstadoPorAno($coUf, $ano);
            return response()->json($dados);
        } catch (\Exception $e) {
            return response()->json(['erro' => $e->getMessage()], 404);
        }
    }

    // Município

    public function allMunicipio()
    {
        return response()->json($this->subfuncaoService->subFuncaoMunicipalAll());
    }

    public function porMunicipioCod(string $coMunicipio)
    {
        return response()->json($this->subfuncaoService->getSubfuncaoMunicipioCod($coMunicipio));
    }

    public function grupoDescricaoMunicipio(Request $request)
    {
        $coItem = $request->input('coItem');
        return response()->json($this->subfuncaoService->getGrupoDescricaoMunicipio($coItem));
    }


    public function porMunicipioEAno($coMunicipio, $ano)
    {
        try {
            $dados = $this->subfuncaoService->getSubfuncaoMunicipioPorAno($coMunicipio, $ano);
            return response()->json($dados);
        } catch (\Exception $e) {
            return response()->json(['erro' => $e->getMessage()], 404);
        }
    }

    
}
