<?php

namespace App\Models\lista;

use Illuminate\Database\Eloquent\Model;

class ListaMunicipio extends Model
{   

     protected $table = 'lista_municipio';
    protected $fillable = [
        'co_municipio',
        'no_municipio',
        'estado_id',

    ];

    public function estado()
    {
        return $this->belongsTo(ListaEstado::class, 'estado_id');
    }
}
