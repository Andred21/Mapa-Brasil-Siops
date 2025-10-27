import { Chart } from "primereact/chart";
import {
  useGraficoComposicaoReceita,
  useGraficoFontesSaude,
  useGraficoDespesaSaude,
  useGraficoLc141,
} from "@/hook/api/useIndicadorGraphics";
import type {
  GraficoComposicao,
  GraficoFontesSaude,
  GraficoDespesaSaude,
  GraficoLc141,
} from "@/types/indicador/indicadorGraphics"; 

interface GraficoIndicadorProps {
  tipo: "estado" | "municipio" | "uniao" | "df";
  codigo: string;
  ano: number;
  indicador:
  | "composicao-receita"
  | "fontes-saude"
  | "despesa-saude"
  | "lc141";
}

/**
 * 📊 Componente genérico para exibir gráficos de indicadores
 */
export default function GraficoIndicador({
  tipo,
  codigo,
  ano,
  indicador,
}: GraficoIndicadorProps) {
  // === Hook dinâmico ===
  const { data, isLoading, error } = (() => {
    switch (indicador) {
      case "composicao-receita":
        return useGraficoComposicaoReceita(tipo, codigo, ano);
      case "fontes-saude":
        return useGraficoFontesSaude(tipo, codigo, ano);
      case "despesa-saude":
        return useGraficoDespesaSaude(tipo, codigo, ano);
      case "lc141":
        return useGraficoLc141(tipo, codigo, ano);
      default:
        throw new Error("Tipo de indicador inválido.");
    }
  })();

  if (isLoading) return <p className="text-gray-500 text-sm">Carregando gráfico...</p>;
  if (error) return <p className="text-red-500 text-sm">Erro ao carregar dados.</p>;
  if (!data) return <p className="text-gray-400 text-sm">Nenhum dado encontrado.</p>;

  // === Configurações base ===
  let chartType: "pie" | "doughnut" | "bar" | "line" = "pie";
  let chartData: any = {};
  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: "#495057" },
      },
    },
  };

  // === Escolha de gráfico ===
  switch (indicador) {
    case "composicao-receita": {
      const grafico = data as GraficoComposicao; // ✅ narrowing
      chartType = "pie";


      if (!grafico.series || !grafico.series.length) {
        return <p className="text-gray-400 text-sm">Sem dados de série.</p>;
      }
      chartData = {
        labels: grafico.labels,
        datasets: [
          {
            label: grafico.title,
            data: grafico.series[0].data || [],
            backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b"],
          },
        ],
      };
      break;
    }

    case "fontes-saude": {
      const grafico = data as GraficoFontesSaude; // ✅ narrowing
      chartType = "bar";
      chartData = {
        labels: grafico.items.map((i) => i.label),
        datasets: [
          {
            label: grafico.title,
            data: grafico.items.map((i) => i.value),
            backgroundColor: "#10b981",
          },
        ],
      };
      break;
    }

    case "despesa-saude": {
      const grafico = data as GraficoDespesaSaude; // ✅ narrowing
      chartType = "doughnut";
      chartData = {
        labels: grafico.segments.map((s) => s.label),
        datasets: [
          {
            label: grafico.title,
            data: grafico.segments.map((s) => s.value),
            backgroundColor: [
              "#4ade80",
              "#60a5fa",
              "#facc15",
              "#f87171",
              "#a78bfa",
            ],
          },
        ],
      };
      break;
    }

    case "lc141": {
      const grafico = data as GraficoLc141; // ✅ narrowing
      chartType = "bar";
      chartData = {
        labels: [grafico.title],
        datasets: [
          {
            label: "Valor Atual (%)",
            data: [grafico.value],
            backgroundColor:
              grafico.value >= grafico.target ? "#16a34a" : "#ef4444",
          },
          {
            label: "Meta (%)",
            data: [grafico.target],
            backgroundColor: "#a3a3a3",
          },
        ],
      };
      break;
    }
  }

  // === Renderização ===
  return (
    <div className="p-3 bg-white rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-3 text-gray-800">{data.title}</h4>
      <Chart type={chartType} data={chartData} options={chartOptions} />
    </div>
  );
}
