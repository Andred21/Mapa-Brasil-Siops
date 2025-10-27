<?php

namespace App\Models\Indicador;

use App\Models\Abstracts\IndicadorAbstract;

use App\Models\lista\ListaMunicipio;
class IndicadorMunicipal extends IndicadorAbstract
{
    protected $table = 'indicador_municipal';

    protected $fillable = [
        'municipio_id',
    ];

    public function municipio()
    {
        return $this->belongsTo(ListaMunicipio::class, 'municipio_id');
    }
}
