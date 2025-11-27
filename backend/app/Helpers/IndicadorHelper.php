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

    public static function findValoresCompletos(array|Collection $indicadores, string $numero): array
    {
        $row = collect($indicadores)->firstWhere('numero_indicador', $numero);

        if (!$row) {
            return [
                'indicador' => 0.0,
                'numerador' => 0.0,
                'denominador' => 0.0,
            ];
        }

        // Detecta unidade pelo conteúdo (ou pode vir de fora, se preferir)
        $valorBruto = (string) ($row['indicador_calculado'] ?? '');
        $temPorcentagem = str_contains($valorBruto, '%');
        $temMoeda = str_contains($valorBruto, 'R$');

        $indicador = match (true) {
            $temMoeda => self::parseMoedaBR($valorBruto),
            $temPorcentagem => self::parsePercentBR($valorBruto),
            default => self::parseNumeroBR($valorBruto),
        };

        return [
            'indicador' => $indicador,
            'numerador' => (float) ($row['numerador'] ?? 0),
            'denominador' => (float) ($row['denominador'] ?? 0),
        ];
    }


}


