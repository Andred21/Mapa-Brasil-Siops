<?php

namespace App\Services;

use App\Repositories\Populacao\PopulacaoEstadualRepository;
use App\Repositories\Populacao\PopulacaoMunicipalRepository;
use App\Repositories\Populacao\PopulacaoUniaoRepository;
use App\Repositories\Ente\ListaEstadoRepository;
use App\Repositories\Ente\ListaMunicipioRepository;

class PopulacaoService
{
    public function __construct(
        protected PopulacaoEstadualRepository $popEstadualRepository,
        protected PopulacaoMunicipalRepository $popMunicipalRepository,
        protected PopulacaoUniaoRepository $popUniaoRepository,
        protected ListaEstadoRepository $listaEstadoRepository,
        protected ListaMunicipioRepository $listaMunicipioRepository
    ) {
    }

    /* População Estadual */

    public function getPopulacaoEstudalId(int $estadoId)
    {
        return $this->popEstadualRepository->findByEstadoId($estadoId);
    }

    public function getPopulacacaoEstadualPorCodUf(string $coUf)
    {
        $estado = $this->listaEstadoRepository->findByCodUf($coUf);

        if (!$estado) {
            throw new \Exception("Estado com código {$coUf} não encontrado");
        }

        return $this->getPopulacaoEstudalId($estado->id);
    }

    public function getCrescimentoPopulacionaEstadual(string $coUf, string $anoInicio, string $anoFinal): array
    {

        $estado = $this->listaEstadoRepository->findByCodUf($coUf);

        if ($anoFinal < $anoInicio) {
            throw new \InvalidArgumentException("O ano final dever ser maior ou igual ao inicial.");
        }

        $crescimento = [];

        for ($ano = $anoInicio; $ano <= $anoFinal; $ano++) {
            $pop = $this->getPopulacaoEstadualPorAno($ano, $estado->id);

            $crescimento[] = [
                'anoValido' => $ano,
                'populacao' => $pop?->populacao ?? 0,
            ];
        }

        return $crescimento;
    }

    public function getPopulacaoEstadualPorAno(string $ano, int $estadoId)
    {
        return $this->popEstadualRepository->findByAnoAndEstado($ano, $estadoId);
    }

    public function getIndicadoresPopulacionaisEstadual(string $coUf, string $anoInicio, string $anoFinal): array
    {
        $dados = $this->getCrescimentoPopulacionaEstadual($coUf, $anoInicio, $anoFinal);
        return $this->calcularIndicadoresBase($dados, $anoInicio, $anoFinal);
    }
    /* População Municipal */

    public function getPopulacaoMunicipalPorId(int $municipioId)
    {
        return $this->popMunicipalRepository->findByMunicipioId($municipioId);
    }


    public function getPopulacaoMunicipalPorCod(string $coMunicipio)
    {
        $municipio = $this->listaMunicipioRepository->findByCod($coMunicipio);

        if (!$municipio) {
            throw new \Exception("Município com código {$coMunicipio} não encontrado.");
        }

        return $this->getPopulacaoMunicipalPorId($municipio->id);
    }

    public function getPopupalacaoMunicipalPorAno(string $ano, int $municipioId)
    {
        return $this->popMunicipalRepository->findByAnoAndMunicipio($ano, $municipioId);
    }

    public function getCrescimentoPopulacionalMunicipal(string $coMunicipio, string $anoInicio, string $anoFinal)
    {

        $municipio = $this->listaMunicipioRepository->findByCod($coMunicipio);

        if ($anoFinal < $anoInicio) {
            throw new \InvalidArgumentException("O ano final dever ser maior ou igual ao inicial.");
        }

        $crescimento = [];

        for ($ano = $anoInicio; $ano <= $anoFinal; $ano++) {
            $pop = $this->getPopupalacaoMunicipalPorAno($ano, $municipio->id);

            $crescimento[] = [
                'anoValido' => $ano,
                'populacao' => $pop?->populacao ?? 0,
            ];
        }

        return $crescimento;
    }

    public function getIndicadoresPopulacionaisMunicipal(string $coMunicipio, string $anoInicio, string $anoFinal): array
    {
        $dados = $this->getCrescimentoPopulacionalMunicipal($coMunicipio, $anoInicio, $anoFinal);
        return $this->calcularIndicadoresBase($dados, $anoInicio, $anoFinal);
    }

    /* População União */

    public function getPopulacaoUniao()
    {
        return $this->popUniaoRepository->getAllOrdered();
    }

    public function getPopulacaoUniaoAno(string $ano)
    {
        return $this->popUniaoRepository->findByAno($ano);
    }

    public function getCrescimentoPopulacionalUniao(string $anoInicio, string $anoFinal)
    {

        if ($anoFinal < $anoInicio) {
            throw new \InvalidArgumentException("O ano final dever ser maior ou igual ao inicial.");
        }

        $crescimento = [];

        for ($ano = $anoInicio; $ano <= $anoFinal; $ano++) {
            $pop = $this->getPopulacaoUniaoAno($ano)->first();

            $crescimento[] = [
                'ano' => $ano,
                'populacao' => $pop?->populacao ?? 0,
            ];
        }

        return $crescimento;
    }

    public function getIndicadoresPopulacionaisUniao(string $anoInicio, string $anoFinal): array
    {
        $dados = $this->getCrescimentoPopulacionalUniao($anoInicio, $anoFinal);
        return $this->calcularIndicadoresBase($dados, $anoInicio, $anoFinal);
    }

    private function calcularIndicadoresBase(array $dados, string $anoInicio, string $anoFinal): array
    {
        if (count($dados) < 2) {
            return ['mensagem' => 'Dados insuficientes para cálculo'];
        }

        $popInicial = $dados[0]['populacao'];
        $popFinal = $dados[count($dados) - 1]['populacao'];
        $anos = (int) $anoFinal - (int) $anoInicio;

        $crescimentoAbs = $popFinal - $popInicial;
        $crescimentoPerc = $popInicial > 0 ? ($crescimentoAbs / $popInicial) * 100 : 0;
        $crescimentoMedio = $anos > 0 ? (pow($popFinal / $popInicial, 1 / $anos) - 1) * 100 : 0;

        $tendencia = match (true) {
            $popFinal > $popInicial => 'Crescimento',
            $popFinal < $popInicial => 'Queda',
            default => 'Estável',
        };

        $popMax = max(array_column($dados, 'populacao'));
        $popMin = min(array_column($dados, 'populacao'));

        return [
            'ano_inicio' => (int) $anoInicio,
            'ano_final' => (int) $anoFinal,
            'pop_inicial' => $popInicial,
            'pop_final' => $popFinal,
            'crescimento_absoluto' => $crescimentoAbs,
            'crescimento_percentual' => round($crescimentoPerc, 2),
            'crescimento_medio_anual' => round($crescimentoMedio, 3),
            'tendencia' => $tendencia,
            'pop_max' => $popMax,
            'pop_min' => $popMin,
        ];
    }


}