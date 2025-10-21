<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopulacaoMunicipalRetorno extends Model
{
    protected $fillable =
        [
            'anoValido',
            'periodoValido',
            'populacao',
            'municipio_id',
        ];

        public function municipio()
        {
            return $this->belongsTo(ListaMunicipio::class, 'municipio_id');
        }
}
