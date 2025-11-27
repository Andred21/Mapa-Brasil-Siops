// Importa o componente de gráfico do PrimeReact
import { Chart } from "primereact/chart";





// Importa os hooks responsáveis por buscar os dados de cada tipo de gráfico
import {
  useGraficoComposicaoReceita,
  useGraficoFontesSaude,
  useGraficoDespesaSaude,
  useGraficoLc141,
  useGraficoComposicaoReceitaPeriodo,
  useGraficoSerieTemporal,
} from "@/hook/api/useIndicadorGraphics";

// Tipagens dos retornos dos gráficos
import type {
  GraficoComposicao,
  GraficoFontesSaude,
  GraficoDespesaSaude,
  GraficoLc141,
  GraficoSerieTemporal

} from "@/types/indicador/indicadorGraphics";

// Propriedades esperadas pelo componente genérico de gráficos
interface GraficoIndicadorProps {
  tipo: "estado" | "municipio" | "uniao" | "df"; // tipo de ente da federação
  codigo: string; // código IBGE ou equivalente
  ano: number; // ano filtrado
  anos?: number[];

  height?: number | string;
  width?: number | string;
  align?: "left" | "center" | "right";

  indicador:
  | "composicao-receita"
  | "composicao-receita-periodo"
  | "fontes-saude"
  | "despesa-saude"
  | "lc141"
  | "serie-renda-per-capita"
  | "serie-receita-despesa-saude"
  | "serie-lc141"
  | "serie-composicao-saude"


}

const nomesIndicadores: Record<string, string> = {
  "2.2": "Pessoal",
  "2.3": "Medicamentos",
  "2.4": "Serviços de Terceiros",
  "2.5": "Investimentos",
  "2.6": "Instituições Privadas",
};

// Componente genérico para exibir gráficos de indicadores
export default function GraficoIndicador({
  tipo,
  codigo,
  ano,
  anos,
  indicador,

}: GraficoIndicadorProps) {

  // Hook dinâmico: escolhe automaticamente qual hook deve ser executado.
  // Isso evita vários ifs fora e mantém a estrutura limpa.
  const { data, isLoading, error } = (() => {

    switch (indicador) {

      case "composicao-receita":
        return useGraficoComposicaoReceita(tipo, codigo, ano);

      case "composicao-receita-periodo":

        const anosPeriodo = anos ?? [ano - 2, ano - 1, ano];
        return useGraficoComposicaoReceitaPeriodo(tipo, codigo, anosPeriodo); // Ex: últimos 3 anos

      case "serie-composicao-saude": {
        const inicio = anos?.[0] ?? ano - 5;
        const fim = anos?.[anos.length - 1] ?? ano;

        return useGraficoSerieTemporal(tipo, codigo, "2.2,2.3,2.4,2.5,2.6", inicio, fim);
      }

      case "fontes-saude":
        return useGraficoFontesSaude(tipo, codigo, ano);

      case "despesa-saude":
        return useGraficoDespesaSaude(tipo, codigo, ano);

      case "lc141":
        return useGraficoLc141(tipo, codigo, ano);

      case "serie-renda-per-capita": {
        const inicio = anos?.[0] ?? ano - 5;
        const fim = anos?.[anos.length - 1] ?? ano;

        return useGraficoSerieTemporal(tipo, codigo, "2.1", inicio, fim);
      }
      case "serie-receita-despesa-saude": {
        const inicio = anos?.[0] ?? ano - 5;
        const fim = anos?.[anos.length - 1] ?? ano;
        return useGraficoSerieTemporal(tipo, codigo, "1.1,2.1", inicio, fim);
      }

      case "serie-lc141": {
        const inicio = anos?.[0] ?? ano - 5;
        const fim = anos?.[anos.length - 1] ?? ano;

        return useGraficoSerieTemporal(tipo, codigo, "3.2", inicio, fim);
      }




      default:
        throw new Error("Tipo de indicador inválido.");
    }
  })();

  // Estados básicos
  if (isLoading) return <p className="text-gray-500 text-sm">Carregando gráfico...</p>;
  if (error) return <p className="text-red-500 text-sm">Erro ao carregar dados.</p>;
  if (!data) return <p className="text-gray-400 text-sm">Nenhum dado encontrado.</p>;



  // Valores base para o gráfico
  let chartType: "pie" | "doughnut" | "bar" | "line" = "pie"; // tipo padrão
  let chartData: any = {}; // estrutura dos dados do gráfico


  // Configurações padrões do gráfico (legenda, padding, etc)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 800, // duração da animação em ms
      easing: "easeOutQuart", // tipo de animação
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#495057",
          boxWidth: 15,
          padding: 15,
        },
      },
    },

    layout: {
      padding: {
        bottom: 25,
      },
    },
  };

  // Seleciona qual configuração de gráfico montar com base no tipo de indicador
  switch (indicador) {

    // ================================
    // 1. COMPOSIÇÃO DA RECEITA
    // ================================
    case "composicao-receita": {
      const grafico = data as GraficoComposicao;

      chartType = "pie"; // usa pizza

      // garante formato consistente do backend (pode mandar array ou objeto único)
      const serie = Array.isArray(grafico.series)
        ? grafico.series[0]
        : grafico.series;

      // Falha segura caso não existam dados
      if (!serie || !serie.data || serie.data.length === 0) {
        return (
          <p className="text-gray-400 text-sm">Sem dados de série.</p>
        );
      }

      // Monta estrutura do gráfico
      chartData = {
        labels: grafico.labels,
        datasets: [
          {
            label: grafico.title,
            data: serie.data,
            backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"], // cores fixas
          },
        ],
      };

      break;
    }


    case "composicao-receita-periodo": {
      const grafico = data as GraficoComposicao;

      chartType = "bar"; // barras empilhadas

      chartData = {
        labels: grafico.labels, // ex: ["2021", "2022", "2023"]
        datasets: grafico.series.map((serie, i) => ({
          label: serie.name,
          data: serie.data,
          backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"][i], // cores fixas
          stack: "Receita", // define que é empilhado

        })),
      };



      // ⚙️ Habilita stacking no eixo Y e X
      (chartOptions as any).scales = {

        x: {
          stacked: true,
          ticks: { color: "#6b7280" },
          grid: { color: "#e5e7eb" },
        },
        y: {
          stacked: true,
          ticks: { color: "#6b7280" },
          grid: { color: "#e5e7eb" },
          max: 110,
        },
      };

      break;
    }

    case "serie-composicao-saude": {
      const grafico = data as GraficoSerieTemporal;
      chartType = "bar";

      const cores = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

      chartData = {
        labels: grafico.labels, // Ex: [2018, 2019, ..., 2024]
        datasets: grafico.series.map((serie, i) => ({
          label: nomesIndicadores[serie.name] || serie.name,
          data: serie.data.map((p: any) => p.indicador ?? 0), // percentual
          backgroundColor: cores[i],
          stack: "composicao", // define empilhamento
        })),
      };

      (chartOptions as any).scales = {
        x: {
          stacked: true,
          ticks: { color: "#6b7280" },
          grid: { color: "#e5e7eb" },
        },
        y: {
          stacked: true,
          max: 100,
          beginAtZero: true,
          title: {
            display: true,
            text: "Percentual (%)",
            color: "#6b7280",
          },
          ticks: {
            color: "#6b7280",
            stepSize: 5,
            callback: (value: any) => `${value} %`,
          },
          grid: { color: "#e5e7eb" },
        },
      };

      break;
    }



    // ================================
    // 2. FONTES DA SAÚDE
    // ================================
    case "fontes-saude": {
      const grafico = data as GraficoFontesSaude;

      chartType = "bar"; // gráfico de barras

      chartData = {
        labels: grafico.items.map((i) => i.label),
        datasets: [
          {
            label: grafico.title,
            data: grafico.items.map((i) => i.value),
            backgroundColor: "#10b981", // cor padrão
          },
        ],
      };

      break;
    }

    // ================================
    // 3. DESPESA EM SAÚDE
    // ================================
    case "despesa-saude": {
      const grafico = data as GraficoDespesaSaude;

      chartType = "doughnut"; // gráfico rosquinha

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

    // ================================
    // 4. LC141 – Indicador de meta
    // ================================
    case "lc141": {
      const grafico = data as GraficoLc141;

      chartType = "bar"; // barras simples

      chartData = {
        labels: [grafico.title], // um único ponto de comparação
        datasets: [
          {
            label: "Valor Atual (%)",
            data: [grafico.value],
            backgroundColor:
              grafico.value >= grafico.target ? "#16a34a" : "#ef4444", // verde se bateu meta
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


    case "serie-renda-per-capita": {
      const grafico = data as GraficoSerieTemporal;
      chartType = "line";

      if (!grafico || !grafico.series || grafico.series.length === 0) {
        return <p className="text-gray-400 text-sm">Sem dados para Renda Per Capita.</p>;
      }

      const serie = grafico.series[0];

      const rendaData = serie.data.map((p: any) => Number(p?.indicador ?? 0));
      const populacaoData = serie.data.map((p: any) => Number(p?.denominador ?? 0));

      // ✅ menor valor da população (arredondado)
      const minPopulacao =
        Math.floor(Math.min(...populacaoData) / 1_000_000) * 1_000_000;

      chartData = {
        labels: grafico.labels,
        datasets: [

          {
            type: "line",
            label: "Despesa per capita (R$)",
            data: rendaData,
            borderColor: "#035e06",
            backgroundColor: "#035e06",
            yAxisID: "y1",
            tension: 0.7,
            fill: false,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,

          },
          {
            type: "bar",
            label: "População (denominador)",
            data: populacaoData,
            backgroundColor: "#fad12d",
            yAxisID: "y",
          },
        ],
      };

      (chartOptions as any).scales = {
        x: {
          ticks: {
            color: "#111827",
            font: { size: 13, weight: "bold" },
          },
          grid: { color: "#e5e7eb" },
        },

        y: {
          type: "linear",
          position: "left",
          min: minPopulacao, // ✅ começa a escala no menor valor da população
          title: {
            display: true,
            text: "População",
            color: "#111111",
            font: { size: 14, weight: "bold" },
          },
          ticks: {
            color: "#92400e",
            font: { size: 12, weight: "bold" },
            callback: (value: any) => value.toLocaleString("pt-BR"),
          },
          grid: { color: "#e5e7eb" },
        },

        y1: {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Renda per capita (R$)",
            color: "#111111",
            font: { size: 14, weight: "bold" },
          },
          ticks: {
            color: "#035e06",
            font: { size: 12, weight: "bold" },
            callback: (value: any) => "R$ " + value.toLocaleString("pt-BR"),
          },
          grid: { drawOnChartArea: false },
        },
      };

      break;
    }

    case "serie-receita-despesa-saude": {
      const grafico = data as GraficoSerieTemporal;
      chartType = "bar"; // ou "line" se quiser um visual mais limpo

      const receita = grafico.series.find(s => s.name === "1.1");
      const despesa = grafico.series.find(s => s.name === "2.1");

      if (!receita || !despesa) {
        return <p className="text-gray-400 text-sm">Dados incompletos para Receita e Despesa.</p>;
      }

      chartData = {
        labels: grafico.labels,
        datasets: [
          {
            type: "bar",
            label: "Receita Total (R$)",
            data: receita.data.map((p: any) => p.denominador ?? 0),
            backgroundColor: "#3b82f6", // azul
            yAxisID: "y",
          },
          {
            type: "bar",
            label: "Despesa em Saúde (R$)",
            data: despesa.data.map((p: any) => p.numerador ?? 0),
            backgroundColor: "#ef4444", // vermelho
            yAxisID: "y",
          }
        ]
      };

      (chartOptions as any).scales = {
        x: {
          ticks: { color: "#6b7280" },
          grid: { color: "#e5e7eb" },
        },
        y: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Valor (R$)",
            color: "#6b7280",
          },
          ticks: {
            color: "#6b7280",
            callback: (value: any) => "R$ " + value.toLocaleString("pt-BR"),
          },
          grid: { color: "#e5e7eb" },
        },
      };

      break;
    }

    case "serie-lc141": {
      const grafico = data as GraficoSerieTemporal;
      chartType = "bar";

      const serie = grafico.series[0];

      if (!serie || !serie.data || serie.data.length === 0) {
        return <p className="text-gray-400 text-sm">Sem dados para o indicador 3.2.</p>;
      }

      const valores = serie.data.map((p: any) => p.indicador ?? 0);

      const metaMinima = tipo === "estado" ? 12 : tipo === "municipio" ? 15 : undefined;

      const anos = grafico.labels;

      chartData = {

        labels: anos,
        datasets: [

          {

            type: "line",
            label: `Mínimo legal - LC 141 (${metaMinima}%)`,
            data: anos.map(() => metaMinima),
            borderColor: "red",
            borderWidth: 3,
            fill: false,
            pointRadius: 0,
            borderDash: [],
            tension: 0,
            clip: false,
          },
          {
            label: "Aplicação em Saúde - LC 141 (%)",
            data: valores,
            backgroundColor: "#046508",
          },

        ],
      };

      (chartOptions as any).scales = {
        x: {
          ticks: { color: "#6b7280" },
          grid: { color: "#e5e7eb" },

        },
        y: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Percentual (%)",
            color: "#111111",
          },
          ticks: {
            color: "#111111",
            stepSize: 5, // ✅ define o intervalo

            callback: (value: any) => value + " %",
          },
          grid: { color: "#e5e7eb" },
          max: 100,
        },
      };



      break;
    }
  }





  // Renderização final do componente
  return (
    <div className="bg-transparent rounded-lg w-full h-full">



      <Chart type={chartType} data={chartData} options={chartOptions} className="h-full w-full" />




    </div>
  );
}
