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
  series: { name: string; data: number[] }[];
}
