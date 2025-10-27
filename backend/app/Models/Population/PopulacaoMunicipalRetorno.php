<?php

namespace App\Models\Population;

use App\Models\lista\ListaMunicipio;
use Illuminate\Database\Eloquent\Model;

class PopulacaoMunicipalRetorno extends Model
{
    
    protected $table='populacao_municipal_retorno';
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
