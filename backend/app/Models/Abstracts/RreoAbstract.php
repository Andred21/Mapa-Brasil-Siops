<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RreoAbstract extends Model
{
    protected $fillable = [

        'ano',
        'descricao',
        'grupo',
        'item',
        'municipio',
        'ordem',
        'periodo',
        'quadro',
        'uf',
        'vl_coluna1',
        'vl_coluna10',
        'vl_coluna2',
        'vl_coluna3',
        'vl_coluna4',
        'vl_coluna5',
        'vl_coluna6',
        'vl_coluna7',
        'vl_coluna8',
        'vl_coluna9',

    ];

}