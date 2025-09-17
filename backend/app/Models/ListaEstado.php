<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListaEstado extends Model
{
    protected $fillable = [
        'co_uf',
        'no_uf',
        'sg_uf',
    ];
}
