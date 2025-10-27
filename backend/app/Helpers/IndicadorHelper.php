<?php

namespace App\Helpers;

use Illuminate\Support\Collection;
class IndicadorHelper
{

    /**
     * 
     * Localiza e converte valor de um indicador específico string -> float
     * 
     */
    public static function findValor(array|Collection $indicadores, string $numero, string $esperada = '%'): float
    {
        $row = collect($indicadores)->firstWhere('numero_indicador', $numero);
        if (!$row)
            return 0.0;

        $raw = (string) ($row['indicador_calculado'] ?? $row->indicador_calculado ?? '');

        return match ($esperada) {
            'BRL' => self::parseMoedaBR($raw),
            '%' => self::parsePercentBR($raw),
            default => self::parseNumeroBR($raw),
        };
    }

    /**
     * Converte strings de percentual ("48,22 %") para número (48.22)
     */
    public static function parsePercentBR(string $raw): float
    {
        $raw = str_replace(['%', ' '], '', $raw);
        return self::parseNumeroBR($raw);
    }

    /**
     * Converte strings de moeda BR ("R$ 865,75") para número (865.75)
     */
    public static function parseMoedaBR(string $raw): float
    {
        $raw = str_replace(['R$', ' '], '', $raw);
        return self::parseNumeroBR($raw);
    }

    /**
     * Converte strings numéricas pt-BR ("1.234.567,89") para número (1234567.89)
     */
    public static function parseNumeroBR(string $raw): float
    {
        $raw = str_replace('.', '', $raw);
        $raw = str_replace(',', '.', $raw);
        return is_numeric($raw) ? (float) $raw : 0.0;
    }
}


