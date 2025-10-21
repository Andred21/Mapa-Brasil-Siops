<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('populacao_municipal_retorno', function (Blueprint $table) {
            $table->id();
            $table->foreignId('municipio_id')
                ->constrained('lista_municipio')
                ->onDelete('cascade');
            $table->string('anoValido');
            $table->string('periodoValido');
            $table->string('populacao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('populacao_municipal_retorno');
    }
};
