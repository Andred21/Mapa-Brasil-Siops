<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('indicador_municipal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('municipio_id')->constrained('lista_municipio')->onDelete('cascade');
            $table->decimal('denominador', 20, 2);
            $table->string('ds_indicador');
            $table->string('indicador_calculado');
            $table->decimal('numerador', 20, 2);
            $table->string('numero_indicador');
            $table->string('ano');
            $table->string('periodo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indicador_municipal');
    }
};
