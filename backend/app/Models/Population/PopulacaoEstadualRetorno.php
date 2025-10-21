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
        'estado_id',
    ];

    public function estado()
    {
        return $this->belongsTo(ListaEstado::class, 'estado_id');
    }
}
