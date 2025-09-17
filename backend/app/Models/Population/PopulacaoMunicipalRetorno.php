<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopulacaoMunicipalRetorno extends Model
{
    protected $fillable =
        [
            'anoValido',
            'municipio',
            'periodoValido',
            'populacao',
            'id_uf',
        ];
}
