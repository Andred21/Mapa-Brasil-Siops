import React from "react";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";

/**
 * 🔹 Props do AbstractPanel
 *
 * Este componente é genérico e serve como modal reutilizável
 * para exibir conteúdos em abas (ex: dashboards de Saúde, Receita, etc).
 */
interface AbstractPanelProps {
  visible: boolean; // Controla a visibilidade do modal
  onClose: () => void; // Função executada ao clicar fora ou no botão "Fechar"
  title: string; // Título exibido no cabeçalho do painel
  children?: React.ReactNode; // Conteúdo adicional (usado se não houver abas)
  tabs?: {
    label: string; // Nome da aba
    icon?: string; // Ícone opcional (PrimeIcons)
    content: React.ReactNode; // Componente renderizado dentro da aba
    position?: "left" | "right"; // Posição do ícone na aba
  }[]; // Lista de abas dinâmicas exibidas pelo TabView
}

/**
 * 🔹 AbstractPanel
 *
 * Modal genérico com suporte a múltiplas abas (TabView).
 * Utilizado para dashboards completos e painéis analíticos.
 *
 * Responsabilidades:
 * - Controlar a exibição do overlay com fundo escurecido;
 * - Exibir título e botão de fechamento;
 * - Renderizar conteúdo via `children` ou `tabs[]`.
 */
const AbstractPanel: React.FC<AbstractPanelProps> = ({
  visible,
  onClose,
  title,
  children,
  tabs,
}) => {
  // 🔸 Se o painel estiver invisível, não renderiza nada
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="abstract-panel-title"
    >
      {/* =========================================================
         🔲 FUNDO ESCURECIDO E DESFOCADO (Overlay)
         ========================================================= */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose} // Fecha ao clicar fora
      />

      {/* =========================================================
         🪟 CONTAINER PRINCIPAL DO PAINEL
         ========================================================= */}
      <div
        className="
          relative bg-white rounded-2xl shadow-lg
          w-[95%] md:w-[85%] lg:w-[80%]
          h-[80%] overflow-hidden z-10 flex flex-col
          transition-all duration-300
        "
      >
        {/* =====================================================
           🧭 CABEÇALHO DO MODAL
           ===================================================== */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          {/* Título */}
          <h2
            id="abstract-panel-title"
            className="text-xl font-semibold text-gray-800"
          >
            {title}
          </h2>

          {/* Botão de fechamento */}
          <Button
            icon="pi pi-times"
            className="
              p-button-rounded p-button-text
              !text-gray-700 hover:!text-red-500
              transition duration-200
            "
            onClick={onClose}
            aria-label="Fechar painel"
          />
        </div>

        {/* =====================================================
           📄 CONTEÚDO PRINCIPAL (Tabs ou Children)
           ===================================================== */}
        <div className="flex-1 overflow-y-auto p-2">
          {tabs && tabs.length > 0 ? (
            // 🔸 Caso haja abas, renderiza um TabView dinâmico
            <TabView>
              {tabs.map((tab, index) => (
                <TabPanel
                  key={index}
                  header={tab.label}
                  leftIcon={tab.position === "left" ? tab.icon : undefined}
                  rightIcon={tab.position === "right" ? tab.icon : undefined}
                >
                  {/* Conteúdo da aba */}
                  {tab.content}
                </TabPanel>
              ))}
            </TabView>
          ) : (
            // 🔹 Caso não haja abas, renderiza conteúdo genérico
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default AbstractPanel;
