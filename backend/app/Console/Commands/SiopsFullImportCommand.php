<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SiopsFullImportCommand extends Command
{
    /**
     * Nome do comando para usar no terminal.
     */
    protected $signature = 'siops:full-import {--from=2013 : Ano inicial da importação} {--to=}';
    protected $description = 'Executa os seeders de entes e população do SIOPS (SiopsEnteSeeder e SiopsPopulationSeeder)';

    /**
     * Executa o comando.
     */
    public function handle(): void
    {
        $from = (int) $this->option('from');
        $to = (int) ($this->option('to') ?? now()->year);

        $this->info("🚀 Iniciando importação completa do SIOPS (de {$from} até {$to})...");
        DB::beginTransaction();

        try {
            // Limpar cache e logs antigos (opcional)
            Artisan::call('cache:clear');
            Artisan::call('config:clear');

            $this->line("\n📍 Executando seeder d   e ENTES...");
            Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\SiopsEnteSeeder']);
            $this->info("✅ Seeder de ENTES concluído.\n");

            $this->line("📍 Executando seeder de POPULAÇÃO...");
            Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\SiopsPopulationSeeder']);
            $this->info("✅ Seeder de POPULAÇÃO concluído.\n");

            DB::commit();
            $this->info("🎯 Importação completa concluída com sucesso!");
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->error("❌ Erro durante a importação: " . $e->getMessage());
        }
    }
}
