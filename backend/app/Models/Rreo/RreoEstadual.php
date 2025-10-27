<?php

namespace App\Models;
use App\Models\lista\ListaEstado;
use Illuminate\Database\Eloquent\Model;

class RreoEstadual extends Model
{
    protected $fillable = [
        'ano',
        'descricao',
        'grupo',
        'item',
        'ordem',
        'periodo',
        'quadro',
        'estado_id',
        'valor1',
        'valor10',
        'valor2',
        'valor3',
        'valor4',
        'valor5',
        'valor6',
        'valor7',
        'valor8',
        'valor9',
    ];

    public function estado()
    {
        return $this->belongsTo(ListaEstado::class, 'estado_id');
    }

}
