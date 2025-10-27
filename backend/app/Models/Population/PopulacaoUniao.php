<?php

namespace App\Models\Population;

use Illuminate\Database\Eloquent\Model;

class PopulacaoUniao extends Model
{

    protected $table ='populacao_uniao';

    protected $fillable =
        [
            'ano',
            'populacao',
        ];
}
