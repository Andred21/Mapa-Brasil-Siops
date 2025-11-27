import React from "react";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";

interface AbstractPanelProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  tabs?: {
    label: string;
    icon?: string;
    content: React.ReactNode;
    position?: "left" | "right";
  }[];
}

const AbstractPanel: React.FC<AbstractPanelProps> = ({
  visible,
  onClose,
  title,
  children,
  tabs,
}) => {

  // Se o painel estiver invisível, não renderiza nada
  if (!visible) return null;

  return (

    <div className="fixed inset-0 z-[2000] flex items-center justify-center md:pt-20"
      role="dialog" aria-modal="true" aria-labelledby="abstract-panel-title">

      {/* FUNDO ESCURECIDO E DESFOCADO (Overlay) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/*  CONTAINER PRINCIPAL DO PAINEL */}
      <div className="relative bg-white rounded-2xl shadow-lg w-[95%] md:w-[90%] lg:w-[85%] h-[70%]  md:h-[80%] lg:h-[90%]
      overflow-hidden z-10 flex flex-col transition-all duration-300 ">

        {/* CABEÇALHO DO MODAL */}
        <div className="flex items-center justify-between p-5 bg-gray-100">

          {/* Título */}
          <h2 id="abstract-panel-title" className="text-3xl font-semibold ml-2 text-emerald-800">
            {title}
          </h2>

          {/* Botão de fechamento */}
          <Button
            icon="pi pi-times"
            className="!h-12 !w-12 !rounded-2xl !bg-gradient-to-r !text-white !shadow-sm
             hover:!bg-white/30 !from-emerald-600/90 !via-emerald-500 !to-emerald-400 !border-none"
            onClick={onClose}
            aria-label="Fechar painel"
          />

        </div>

        {/*  CONTEÚDO PRINCIPAL (Tabs ou Children) */}

        <div className="flex-1 gap-1 overflow-y-auto">

          {tabs && tabs.length > 0 ? (
           
            <TabView className="custom-tabs">
              {tabs.map((tab, index) => (
                <TabPanel
                  key={index}
                  header={tab.label}
                  leftIcon={tab.position === "left" ? tab.icon : undefined}
                  rightIcon={tab.position === "right" ? tab.icon : undefined}
                  className="gap-2 "
                >
                  {/* Conteúdo da aba */}
                  {tab.content}
                </TabPanel>
              ))}
            </TabView>

          ) : (
           
            children

          )}

        </div>

      </div>

    </div>

  );
  
};

export default AbstractPanel;
