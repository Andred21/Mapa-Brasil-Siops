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
        Schema::create('lista_municipio', function (Blueprint $table) {
            $table->id();
            $table->string('co_municipio')->unique();
            $table->string('no_municipio');
            $table->foreignId('estado_id')->constrained('lista_estado')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lista_municipio');
    }
};
