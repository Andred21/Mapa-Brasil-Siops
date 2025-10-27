import React from "react";
import GraficoIndicador from "@/components/graficos/graficoIndicador";
import {
  useIndicadoresPopulacaoEstadual,
  useIndicadoresPopulacaoMunicipal,
  useIndicadoresPopulacaoUniao,
} from "@/hook/api/usePopulacao";

export interface ContentSaudeProps {
  type: "estado" | "municipio" | "uniao";
  codigo: string;
  ano: number;
}

const ContentSaude: React.FC<ContentSaudeProps> = ({ type, codigo, ano }) => {
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
        Carregando dados de saúde...
      </div>
    );
  }

  if (!indicadores) {
    return (
      <div className="text-gray-500 italic text-center mt-10">
        Nenhum dado de saúde encontrado para este período.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-sky-700 mb-4">
        🏥 Dashboard de Saúde Pública
      </h2>

      <p className="text-gray-700 mb-4">
        Este painel apresenta indicadores de investimento em saúde e fontes de
        recursos, conforme dados oficiais.
      </p>

      {/* ======== Indicadores numéricos ======== */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Investimento em Saúde (%)
          </h3>
          <p className="text-sky-700 font-bold text-xl">
            {indicadores?.investimento_saude_percentual
              ? `${Number(
                  indicadores.investimento_saude_percentual
                ).toFixed(1)}%`
              : "—"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Despesa Total com Saúde
          </h3>
          <p className="text-sky-700 font-bold text-xl">
            {indicadores?.despesa_total_saude
              ? `R$ ${Number(
                  indicadores.despesa_total_saude
                ).toLocaleString("pt-BR")}`
              : "—"}
          </p>
        </div>
      </div>

      {/* ======== Gráficos de Saúde ======== */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <GraficoIndicador
          tipo={type}
          codigo={codigo}
          ano={ano}
          indicador="fontes-saude"
        />
        <GraficoIndicador
          tipo={type}
          codigo={codigo}
          ano={ano}
          indicador="despesa-saude"
        />
      </div>
    </div>
  );
};

export default ContentSaude;
