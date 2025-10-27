<?php

namespace App\Http\Controllers;

use App\Services\PopulacaoService;

class PopulacaoController extends Controller
{
    public function __construct(protected PopulacaoService $populacaoService)
    {
    }

    // População Estadual 

    public function estadualPorUf(string $coUf)
    {
        return response()->json(
            $this->populacaoService->getPopulacacaoEstadualPorCodUf($coUf)
        );
    }

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

    public function crescimentoPopulacaoEstadual(string $coUf, string $anoInicio, string $anoFinal)
    {
        return response()->json($this->populacaoService->getCrescimentoPopulacionaEstadual($coUf, $anoInicio, $anoFinal));
    }

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

    public function municipalPorCod(string $coMunicipio)
    {
        return response()->json(
            $this->populacaoService->getPopulacaoMunicipalPorCod($coMunicipio)
        );
    }

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

    public function crescimentoPopulacaoMuncipal(string $coMunicipio, string $anoInicio, string $anoFinal)
    {
        return response()->json($this->populacaoService->getCrescimentoPopulacionalMunicipal($coMunicipio, $anoInicio, $anoFinal));
    }

    public function indicadoresMunicipal(string $codMunicipio, string $anoInicio, string $anoFinal)
    {
        try {
            $dados = $this->populacaoService->getIndicadoresPopulacionaisMunicipal($codMunicipio, $anoInicio, $anoFinal);
            return response()->json($dados);
        } catch (\Throwable $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }

     public function indicadoresUniao(string $anoInicio, string $anoFinal)
    {
        try {
            $dados = $this->populacaoService->getIndicadoresPopulacionaisUniao($anoInicio, $anoFinal);
            return response()->json($dados);
        } catch (\Throwable $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }


    // População da União

    public function uniao()
    {
        return response()->json(
            $this->populacaoService->getPopulacaoUniao()
        );
    }

    public function uniaoPorAno(string $ano)
    {
        return response()->json(
            $this->populacaoService->getPopulacaoUniaoAno($ano)->first()
        );
    }

    public function crescimentoPopulacaoUniao(string $anoInicio, string $anoFinal)
    {
        return response()->json($this->populacaoService->getCrescimentoPopulacionalUniao($anoInicio, $anoFinal));
    }


}
