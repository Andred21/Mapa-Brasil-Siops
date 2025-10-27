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
        Schema::create('rreo_municipal', function (Blueprint $table) {
            $table->id();
            $table->string('ano');
            $table->string('coItem');
            $table->string('dsItem');
            $table->string('grupo');
            $table->foreignId('municipio_id')->constrained('lista_municipio')->onDelete('cascade');
            $table->string('ordem');
            $table->string('periodo');
            $table->string('quadro');
            $table->decimal('vl_coluna1', 15, 2)->nullable();
            $table->decimal('vl_coluna10', 15, 2)->nullable();
            $table->decimal('vl_coluna2', 15, 2)->nullable();
            $table->decimal('vl_coluna3', 15, 2)->nullable();
            $table->decimal('vl_coluna4', 15, 2)->nullable();
            $table->decimal('vl_coluna5', 15, 2)->nullable();
            $table->decimal('vl_coluna6', 15, 2)->nullable();
            $table->decimal('vl_coluna7', 15, 2)->nullable();
            $table->decimal('vl_coluna8', 15, 2)->nullable();
            $table->decimal('vl_coluna9', 15, 2)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rreo_municipal');
    }
};
