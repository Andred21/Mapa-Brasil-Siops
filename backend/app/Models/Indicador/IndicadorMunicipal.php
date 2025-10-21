<?php

namespace App\Models;

use App\Models\IndicadorAbstract;
class IndicadorMunicipal extends IndicadorAbstract
{
    protected $table = 'indicador_municipal';

    protected $fillable = [
        'municipio_id',
        ...parent::FILLABLE
    ];

    public function municipio()
    {
        return $this->belongsTo(ListaMunicipio::class, 'municipio_id');
    }
}
