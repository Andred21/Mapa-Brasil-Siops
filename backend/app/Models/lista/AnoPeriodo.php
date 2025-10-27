<?php

namespace App\Models\lista;

use Illuminate\Database\Eloquent\Model;

class AnoPeriodo extends Model
{
    protected $table = 'ano_periodo';
    
    protected $fillable = [

        'ds_ano',
        'ds_periodo',
        'nu_periodo'
    ];
}
