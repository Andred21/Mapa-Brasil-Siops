<?php

namespace App\Models\Subfuncao;

use App\Models\lista\ListaMunicipio;
use illuminate\Database\Eloquent\Model;

class despesasSubfuncaoMunicipal extends Model
{

    protected $table = 'subfuncao_municipio';
    protected $fillable = [
        'ano',
        'coItem',
        'dsItem',
        'grupo',
        'id',
        'municipio_id',
        'ordem',
        'periodo',
        'quadro',
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

    public function municipio()
    {
        return $this->belongsTo(ListaMunicipio::class, 'municipio_id');
    }
}