import { useState } from "react";
import { Divider } from "primereact/divider";
import AbstractPanel from "@/components/InfoPanel/AbstractPanel";
import ContentReceita from "@/pages/Content/ContentReceita";
import ContentSaude from "@/pages/Content/ContentSaude";
import AccordionTabela from "../AccordionTab";

/**
 * Tipagem das propriedades esperadas por este painel genérico.
 * Ele é reutilizável tanto para "estado" quanto "município" ou "união".
 */
interface MenuPanelProps {
  data: {
    codigo?: string; // Código IBGE ou identificador da unidade
    nome?: string; // Nome do estado/município
    crescimentoPercentual?: string | number | null; // Crescimento populacional (%)
    receita?: string | number | null; // Receita pública per capita
    saude?: string | number | null; // Investimento em saúde (%)
  };
  type: "estado" | "municipio" | "uniao"; // Define o tipo da entidade
  title: string; // Título exibido no painel principal
  ano?: number; // Ano selecionado (padrão: 2024)
}

/**
 * 🔹 MenuPanel
 *
 * Componente genérico que exibe:
 * - Indicadores básicos (população, receita, saúde)
 * - Acesso a dashboards completos via modal (AbstractPanel)
 *
 * É chamado dentro dos componentes `MenuEstado` e `MenuMunicipio`.
 */
export default function MenuPanel({ data, type, title, ano }: MenuPanelProps) {
  // Estado local que controla a exibição do painel de dashboards
  const [dashboardAberto, setDashboardAberto] = useState(false);

  // Dados normalizados
  const nome = data?.nome || "—";
  const codigo = data?.codigo || "";
  const tipoLabel =
    type === "municipio" ? "município" : type === "estado" ? "estado" : "país";

  return (
    <div className="mb-3">
      {/* =========================================================
         🏷️ CABEÇALHO DO PAINEL
         ========================================================= */}
      <h3 className="text-xl ml-2 mb-2 font-semibold text-gray-800">{title}</h3>

      {/* =========================================================
         📊 BLOCO DE INDICADORES (Accordion com resumo básico)
         ========================================================= */}
      <AccordionTabela
        color="emerald"
        tabs={[
          {
            label: "Indicadores",
            icon: "pi pi-chart-bar",
            tooltip:
              "Os indicadores apresentam dados populacionais, financeiros e de saúde obtidos de fontes oficiais.",
            content: (
              <>
                {/* Introdução do painel */}
                <p className="mb-3">
                  Os <strong>indicadores</strong> mostram dados reais sobre o{" "}
                  {tipoLabel} <strong>{nome}</strong>, com base nos registros
                  mais recentes disponíveis.
                </p>

                <Divider />

                {/* =====================================================
                   MÉTRICAS PRINCIPAIS (Resumo rápido)
                   ===================================================== */}
                <div className="space-y-2">
                  {/* Crescimento populacional */}
                  <p>
                    📈 <strong>Crescimento populacional:</strong>{" "}
                    <span className="text-emerald-700 font-medium">
                      {data?.crescimentoPercentual
                        ? `${data.crescimentoPercentual}%`
                        : "—"}
                    </span>
                  </p>

                  {/* Receita pública */}
                  <p>
                    💰 <strong>Receita pública per capita:</strong>{" "}
                    <span className="text-emerald-700 font-medium">
                      {data?.receita
                        ? `R$ ${Number(data.receita).toLocaleString("pt-BR")}`
                        : "—"}
                    </span>
                  </p>

                  {/* Investimento em saúde */}
                  <p>
                    🏥 <strong>Investimento em saúde:</strong>{" "}
                    <span className="text-emerald-700 font-medium">
                      {data?.saude ? `${data.saude}%` : "—"}
                    </span>
                  </p>
                </div>

                <Divider />

                {/* Rodapé explicativo */}
                <p className="text-sm text-gray-500 italic mb-4">
                  Esses valores são calculados a partir dos dados reais da base
                  populacional e financeira.
                </p>

                {/* =====================================================
                   BOTÃO — abre o painel completo com dashboards
                   ===================================================== */}
                <div
                  className="flex items-center justify-center text-emerald-700 font-medium cursor-pointer hover:text-emerald-600 transition"
                  onClick={() => setDashboardAberto(true)}
                >
                  <i className="pi pi-external-link mr-2" />
                  Ver dashboard completo
                </div>
              </>
            ),
          },
        ]}
      />

      {/* =========================================================
         🪟 MODAL DE DASHBOARDS (AbstractPanel)
         ========================================================= */}
      {dashboardAberto && (
        <AbstractPanel
          visible={dashboardAberto}
          onClose={() => setDashboardAberto(false)}
          title={`Dashboard completo — ${nome}`}
          tabs={[
            // --- Aba de Saúde ---
            {
              label: "Saúde",
              icon: "pi pi-heart",
              position: "left",
              content: (
                <ContentSaude
                  type={type}
                  codigo={codigo}
                  ano={ano ?? 2024} // fallback para 2024
                />
              ),
            },
            // --- Aba de Receita ---
            {
              label: "Receita",
              icon: "pi pi-chart-bar",
              position: "left",
              content: (
                <ContentReceita
                  type={type}
                  codigo={codigo}
                  ano={ano ?? 2024}
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
