<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnoPeriodo extends Model
{
    protected $fillable = [
        'ds_ano',
        'ds_periodo',
        'nu_periodo'
    ];
}
