<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndicadorAbstract extends Model
{
    protected $fillable =
        [
            'denominador',
            'ds_indicador',
            'indicador_calculado',
            'numerador',
            'numero_indicador',
            'ano', 
            'periodo',

        ];

    
}
