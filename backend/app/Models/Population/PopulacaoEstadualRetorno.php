<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopulacaoEstadualRetorno extends Model
{
    protected $fillable =
    [
        'anoValido',
        'periodoValido',
        'populacao',
        'id_uf',
    ];
}
