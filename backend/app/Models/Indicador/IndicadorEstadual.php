<?php

namespace App\Models;

use App\Models\IndicadorAbstract;

class IndicadorEstadual extends IndicadorAbstract
{
    protected $table = 'indicador_estadual';

    protected $fillable = [
        'estado_id',
        ...parent::FILLABLE
    ];

    public function estado()
    {
        return $this->belongsTo(ListaEstado::class, 'estado_id');
    }
}
