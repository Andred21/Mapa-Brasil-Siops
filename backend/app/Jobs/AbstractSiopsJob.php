<?php

namespace App\Jobs;

use App\Services\SiopsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

/**
 * 
 * Classe Abstrata para jobs de importação de dados da API SIOPS;
 * 
 * 
 */
abstract class AbstractSiopsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /* Job abstrato baseado em queue para preencher o banco de dados com Api Siops */

    protected $entidades; // Entidades (models) a serem processadas
    protected $ano;
    protected $periodo;
    protected $service;
    protected $tipo;
    protected $nivel; // Hieraquia Governamental

    /**
     * @param array|\Illuminate\Support\Collection $entidades Entidades a processar (ex: municípios, estados)
     * @param int $ano Ano a processar
     * @param int $periodo Período (1-12)
     * @param string $tipo Tipo de dado (ex: 'indicadores', 'despesas')
     * @param string|null $nivel Nível de Governo (ex: 'municipal', 'estadual', 'federal')
     */
    public function __construct($entidades, string $ano, string $periodo, string $tipo, ?string $nivel)
    {
        $this->entidades = $entidades;
        $this->ano = $ano;
        $this->periodo = $periodo;
        $this->tipo = strtolower($tipo);
        $this->nivel = strtolower($nivel ?? '');
        $this->service = app(SiopsService::class);
    }

    /**
     * Implementado em cada subclasse
     */
    abstract protected function processEntity($entidade): void;

    /*
     * 
     * Lógica para percorrer todos os dados de cada entidade.
     *  
     */
    public function handle(): void
    {
        $nomeJob = $this->getName();
        foreach ($this->entidades as $entidade) {
            try {
                $this->processEntity($entidade);
            } catch (\Throwable $e) {
                \Log::error(" Erro no job {$nomeJob} ({$this->tipo}-{$this->nivel}) 
                    [Ano {$this->ano} / Período {$this->periodo}] - 
                    Entidade: {$entidade->id} => " . $e->getMessage());
            }
        }
    }

    /**
     * Retorna o nome da classe do job
     */
    protected function getName(): string
    {
        return class_basename(static::class);
    }

    /*
     *
     * Salva os dados de forma genérica e segura.
     *
     */
    protected function saveData(string $table, array $keys, array $values): void
    {
        DB::table($table)->updateOrInsert($keys, array_merge($values, [
            'updated_at' => now(),
            'created_at' => now(),
        ]));
    }

    /*
     *
     * Fazer chamadas para à API Siops dinamicamente. 
     * 
     */
    protected function callApi(string $method, ...$params): array
    {
        if (!method_exists($this->service, $method)) {
            throw new \Exception("Método {$method} não existe na SiopsService.");
        }

        $result = $this->service->$method(...$params);

        return is_array($result) ? $result : [];
    }
}
