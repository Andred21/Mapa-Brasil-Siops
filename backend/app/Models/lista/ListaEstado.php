<?php

namespace App\Models\lista;

use Illuminate\Database\Eloquent\Model;

class ListaEstado extends Model
{

     protected $table = 'lista_estado';
    protected $fillable = [
        'co_uf',
        'no_uf',
        'sg_uf',
    ];

    public function municipios()
    {
        return $this->hasMany(ListaMunicipio::class, 'estado_id');
    }
}
