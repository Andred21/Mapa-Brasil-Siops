<?php

namespace App\Models\Population;

use App\Models\lista\ListaEstado;
use Illuminate\Database\Eloquent\Model;

class PopulacaoEstadualRetorno extends Model
{
    protected $table = 'populacao_estadual_retorno';
    
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
