import React from "react";
import GraficoIndicador from "@/components/graficos/graficoIndicador";
import {
  useIndicadoresPopulacaoEstadual,
  useIndicadoresPopulacaoMunicipal,
  useIndicadoresPopulacaoUniao,
} from "@/hook/api/usePopulacao";

export interface ContentReceitaProps {
  type: "estado" | "municipio" | "uniao";
  codigo: string;
  ano: number;
}

const ContentReceita: React.FC<ContentReceitaProps> = ({ type, codigo, ano }) => {
  // 🔹 Seleciona hook correto conforme o tipo
  const { data: indicadores, isLoading } =
    type === "estado"
      ? useIndicadoresPopulacaoEstadual(codigo, "2010", String(ano))
      : type === "municipio"
      ? useIndicadoresPopulacaoMunicipal(codigo, "2010", String(ano))
      : useIndicadoresPopulacaoUniao("2010", String(ano));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Carregando dados financeiros...
      </div>
    );
  }

  if (!indicadores) {
    return (
      <div className="text-gray-500 italic text-center mt-10">
        Nenhum dado de receita encontrado para este período.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
        💰 Dashboard de Receita Pública
      </h2>

      <p className="text-gray-700 mb-4">
        Este painel apresenta dados financeiros do {type} selecionado,
        mostrando a composição da receita e indicadores de arrecadação.
      </p>

      {/* ======== Indicadores numéricos ======== */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Receita Pública per capita
          </h3>
          <p className="text-emerald-700 font-bold text-xl">
            {indicadores?.receita_per_capita
              ? `R$ ${Number(indicadores.receita_per_capita).toLocaleString(
                  "pt-BR"
                )}`
              : "—"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Receita Total (estimada)
          </h3>
          <p className="text-emerald-700 font-bold text-xl">
            {indicadores?.receita_total
              ? `R$ ${Number(indicadores.receita_total).toLocaleString("pt-BR")}`
              : "—"}
          </p>
        </div>
      </div>

      {/* ======== Gráficos de Indicadores ======== */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <GraficoIndicador
          tipo={type}
          codigo={codigo}
          ano={ano}
          indicador="composicao-receita"
        />
        <GraficoIndicador
          tipo={type}
          codigo={codigo}
          ano={ano}
          indicador="lc141"
        />
      </div>
    </div>
  );
};

export default ContentReceita;
