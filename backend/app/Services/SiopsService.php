<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SiopsService
{
    /* Retorna dados de cada model da api Siops */

    private string $baseUrl = 'https://siops-consulta-publica-api.saude.gov.br/v1/';

    /* Ano Periodo */

    /**
     * Retorno Lista de Ano e Período do SIOPS
     */
    public function getAnoPeriodo(): array
    {

        $url = "{$this->baseUrl}ano-periodo";

        $response = Http::get($url);
        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar ano e período na API do SIOPS: {$response->status()}");
        }

        return $response->json();
    }

    /* Entes */

    /*
     * 
     * Retorno lista ano e peridos
     * 
     */
    public function getAnos(): array
    {

        $url = "{$this->baseUrl}ente/anos";

        $response = Http::get($url);
        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar ano e período na API do SIOPS: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno Lista de Estados do SIOPS
     * 
     */
    public function getEstados(): array
    {

        $url = "{$this->baseUrl}ente/estados";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar estados na API do SIOPS: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno Lista de Municípios por Estado do SIOPS
     * 
     */
    public function getMunicipiosPorEstado(string $uf): array
    {
        $url = "{$this->baseUrl}ente/municipal/{$uf}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar municípios na API do SIOPS para o estado {$uf}: {$response->status()}");
        }

        return $response->json();

    }

    /* Indicadores */

    /**
     * 
     * Retorno Indicadores do DF (Distrito Federal)
     * 
     */
    public function getIndicadorDf(string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}indicador/df/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar indicadores do DF na API do SIOPS para o ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     *  Retorno Indicadores Estaduais
     * 
     */
    public function getIndicadorEstadual(string $estadoUf, string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}indicador/estadual/{$estadoUf}/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar indicadores estaduais na API do SIOPS para o estado {$estadoUf}, ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno Indicadores Municipais
     * 
     */
    public function getIndicadorMunicipal(string $municipioCodigo, string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}indicador/municipal/{$municipioCodigo}/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar indicadores municipais na API do SIOPS para o município {$municipioCodigo}, ano {$ano} e período {$periodo}: {$response->status()}");
        }
        return $response->json();
    }

    /**
     * 
     *  Retorno Indicadores da União
     * 
     */
    public function getIndicadorUniao(string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}indicador/uniao/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar indicadores da União na API do SIOPS para o ano {$ano} e período {$periodo}: {$response->status()}");
        }
        return $response->json();
    }

    /* População */

    /**
     *
     * Retorno População do Estado
     *  
     */
    public function getPopulacaoEstado(string $uf, string $anoValido, string $periodoValido): array
    {
        $url = "{$this->baseUrl}populacao/{$uf}/{$anoValido}/{$periodoValido}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar população do estado na API do SIOPS para o estado {$uf}, ano {$anoValido} e período {$periodoValido}: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno População do Município
     * 
     */
    public function getPopulacaoMunicipio(string $uf, string $municipio, string $anoValido, string $periodoValido): array
    {
        $url = "{$this->baseUrl}populacao/{$uf}/{$municipio}/{$anoValido}/{$periodoValido}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar população do município na API do SIOPS para o estado {$uf}, município {$municipio}, ano {$anoValido} e período {$periodoValido}: {$response->status()}");
        }

        return $response->json();
    }

    /*
     *
     * Retorno População da União
     * 
     */

    public function getPopulacaoUniao(string $ano): array
    {
        $url = "{$this->baseUrl}populacao/uniao/{$ano}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar população da União na API do SIOPS para o ano {$ano}: {$response->status()}");
        }

        return $response->json();
    }

    /* Despesas total em Saúde (Função e subFunção) */

    /**
     * 
     * Retorno Despesa Total em Saúde Estadual
     *
     */
    public function getDespesaTotalSaudeEstadual(string $uf, string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}despesas-por-subfuncao/{$uf}/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar despesa total em saúde estadual na API do SIOPS para o estado {$uf}, ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno Despesa Total em Saúde Municipal
     * 
     */
    public function getDespesaTotalSaudeMunicipal(string $uf, string $municipio, string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}despesas-por-subfuncao/{$uf}/{$municipio}/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar despesa total em saúde municipal na API do SIOPS para o estado {$uf}, município {$municipio}, ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /* Rreo (Relatório Resumido da Execução Orçamentária) */

    /**
     * 
     * Retorno RREO DF (Distrito Federal)
     * 
     */
    public function getRreoDf(string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}rreo/df/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar RREO do DF na API do SIOPS para o ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno RREO Estadual
     * 
     */
    public function getRreoEstadual(string $uf, string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}rreo/estadual/{$uf}/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar RREO estadual na API do SIOPS para o estado {$uf}, ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /**
     * 
     * Retorno RREO Municipal
     * 
     */
    public function getRreoMunicipal(string $uf, string $municipio, string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}rreo/municipal/{$uf}/{$municipio}/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar RREO municipal na API do SIOPS para o estado {$uf}, município {$municipio}, ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }

    /*
     *
     * Retorno RREO União
     *  
     */
    public function getRreoUniao(string $ano, string $periodo): array
    {
        $url = "{$this->baseUrl}rreo/uniao/{$ano}/{$periodo}";
        $response = Http::get($url);

        if (!$response->ok()) {
            throw new \Exception("Erro ao buscar RREO da União na API do SIOPS para o ano {$ano} e período {$periodo}: {$response->status()}");
        }

        return $response->json();
    }


}