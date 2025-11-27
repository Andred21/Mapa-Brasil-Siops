export interface GraficoBase {
  title: string;
  unit: string;
  meta: {
    tipo: string;
    codigo: string;
    ano?: number;
  };
}

export interface GraficoComposicao extends GraficoBase {
  labels: string[];
  series: { name: string; data: number[] }[];
}

export interface GraficoFontesSaude extends GraficoBase {
  items: { label: string; value: number; code: string }[];
}

export interface GraficoDespesaSaude extends GraficoBase {
  segments: { label: string; value: number; code: string }[];
  kpis: { label: string; value: number; unit: string; code: string }[];
}

export interface GraficoLc141 extends GraficoBase {
  value: number;
  target: number;
  status: "below" | "at" | "above";
  code: string;
  year: number;
}

export interface GraficoSerieTemporal extends GraficoBase {
  labels: string[];
  series: {
    name: string;
    data: {
      indicador: number;     // valor calculado (ex: despesa per capita)
      numerador?: number;
      denominador?: number;  // população
    }[];
  }[];
}


export interface EstatisticaIndicador {
  nome_indicador: string;

  ano_inicio: number;
  ano_final: number;

  valor_inicial: number;
  valor_final: number;
  media: number;
  minimo: number;
  maximo: number;

  crescimento_absoluto: number;
  crescimento_percentual: number;
  crescimento_medio_anual: number;

  tendencia: "Crescimento" | "Queda" | "Estável";

  soma_numerador: number;
  soma_denominador: number;
}

export interface GraficoSerieEstatisticas {
  estatisticas: EstatisticaIndicador[];
  labels: string[];
  meta: {
    tipo: string;
    codigo: string;
  };
}