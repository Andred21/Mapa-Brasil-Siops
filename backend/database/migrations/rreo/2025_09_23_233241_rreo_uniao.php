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
        Schema::create('rreo_uniao', function (Blueprint $table) {
            $table->id();
            $table->string('ano');
            $table->string('descricao');
            $table->string('grupo');
            $table->string('ordem');
            $table->string('periodo');
            $table->string('quadro');
            $table->decimal('valor1', 15, 2)->nullable();
            $table->decimal('valor2', 15, 2)->nullable();
            $table->decimal('valor3', 15, 2)->nullable();
            $table->decimal('valor4', 15, 2)->nullable();
            $table->decimal('valor5', 15, 2)->nullable();
            $table->decimal('valor6', 15, 2)->nullable();
            $table->decimal('valor7', 15, 2)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rreo_uniao');
    }
};
