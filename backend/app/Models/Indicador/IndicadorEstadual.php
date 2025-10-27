<?php
namespace App\Models\Indicador;

use App\Models\Abstracts\IndicadorAbstract;

use App\Models\lista\ListaEstado;

class IndicadorEstadual extends IndicadorAbstract
{
    protected $table = 'indicador_estadual';

    protected $fillable = [
        'estado_id',
    
    ];

    public function estado()
    {
        return $this->belongsTo(ListaEstado::class, 'estado_id');
    }
}
