<?php

namespace App\Models\lista;

use Illuminate\Database\Eloquent\Model;

class ListaAnoPeriodoEstadual extends Model
{
    protected $table = 'lista_ano_periodo_estadual';
    protected $fillable =
        [
            'ano',
            'dsPeriodo',
            'periodo'

        ];

}
