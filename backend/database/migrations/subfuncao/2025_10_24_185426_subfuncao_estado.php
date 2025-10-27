<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
    public function up(): void
    {
        Schema::create('subfuncao_estado', function (Blueprint $table) {
            $table->id();
            $table->string('ano');
            $table->string('descricao');
            $table->string('grupo');
            $table->string('item');
            $table->string('ordem');
            $table->string('periodo');
            $table->string('quadro');
            $table->foreignId('estado_id')->constrained('lista_estado')->onDelete('cascade');
            $table->decimal('valor1', 15, 2)->nullable();
            $table->decimal('valor10', 15, 2)->nullable();
            $table->decimal('valor2', 15, 2)->nullable();
            $table->decimal('valor3', 15, 2)->nullable();
            $table->decimal('valor4', 15, 2)->nullable();
            $table->decimal('valor5', 15, 2)->nullable();
            $table->decimal('valor6', 15, 2)->nullable();
            $table->decimal('valor7', 15, 2)->nullable();
            $table->decimal('valor8', 15, 2)->nullable();
            $table->decimal('valor9', 15, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subfuncao_estado');
    }
};
