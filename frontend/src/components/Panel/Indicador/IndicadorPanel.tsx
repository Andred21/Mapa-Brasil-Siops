
import AbstractPanel from "@/components/Panel/Abstract/AbstractPanel";

import SaudeContent from "./Content/SaudeContent";
import Lc141Content from "./Content/Lc141Content";
import ReceitaContent from "./Content/ReceitaContent";



interface IndicadorPanelProps {
  visible: boolean;
  onClose: () => void;

  type: "estado" | "municipio" | "uniao";
  nome: string;
  codigo: string;
  ano: number;
}

export default function IndicadorPanel({
  visible,
  onClose,
  type,
  nome,
  codigo,
  ano,
}: IndicadorPanelProps) {
  if (!visible) return null;

  const tituloPainel = `Painel dos indicadores do ${type} — ${nome} — ${ano}`;

  return (
    
    <AbstractPanel
      visible={visible}
      onClose={onClose}
      title={tituloPainel}
      tabs={[
        {
          label: "Receita e Transferências",
          icon: "pi pi-dollar",
          position: "left",
          content: (
            <ReceitaContent
              type={type}
              codigo={codigo}
              ano={ano}
            />
          ),
        },

        {
          label: "Saúde",
          icon: "pi pi-heart",
          position: "left",
          content: (
            <SaudeContent
              type={type}
              codigo={codigo}
              ano={ano}
            />
          ),
        },

        {
          label: "Aplicação mínima – LC 141",
          icon: "pi pi-chart-line",
          position: "left",
          content: (
            <Lc141Content

              type={type}
              codigo={codigo}
              ano={ano}
            />
          ),
        },
      ]}
    />
  );
}
