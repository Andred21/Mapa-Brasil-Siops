  import React, { useState } from "react";
  import ContentPanelAbstract from "../../Abstract/ContentPanelAbstract";
  import GraphicCard from "../../../Cards/GraphicCard";
  import { useIndicadoresPanel } from "@/hook/components/useIndicadoresPanel";
  import IndicadorCardBase from "@/components/Cards/Calculo/CardCalculoContent";
  import GraficoIndicador from "@/components/graficos/graficoIndicador";

  interface Lc141ContentProps {
    type: "estado" | "municipio" | "uniao";
    codigo: string;
    ano: number;
  }

  const Lc141Content: React.FC<Lc141ContentProps> = ({
    type,
    codigo,
    ano
  }) => {

    const [anoInicio, setAnoInicio] = useState("2013");


    const { indicadores } = useIndicadoresPanel(
      type,
      codigo,
      String(ano),
      ["3.1", "3.2"]
    );


    return (

      <ContentPanelAbstract
        title="Aplicação mínima – LC 141"
        onExportXLSX={() => console.log('Export XLSX')}
        onExportPDF={() => console.log('Export PDF')}
      >

        <div>

          <div className="w-full flex justify-between items-stretch gap-6  ">

            <GraphicCard
              title="3.1 Participação de Transferências na Despesa em Saúde"
            >
              <IndicadorCardBase
                numeradorFmt={indicadores["3.1"]?.numeradorFmt}
                denominadorFmt={indicadores["3.1"]?.denominadorFmt}
                indicadorFmt={indicadores["3.1"]?.indicador}
                descricao={`Indica quanto da despesa total em saúde do ${type} é financiada por recursos transferidos (União e estados), e quanto depende de repasses externos para manutenção dos serviços de saúde.`}
              />

            </GraphicCard>

            <GraphicCard
              title="3.2 Receita Própria Aplicada em Saúde – LC 141"
            >

              <IndicadorCardBase
                numeradorFmt={indicadores["3.2"]?.numeradorFmt}
                denominadorFmt={indicadores["3.2"]?.denominadorFmt}
                indicadorFmt={indicadores["3.2"]?.indicador}
                descricao={`Representa o percentual da receita própria do ${type} que foi aplicado em ações e serviços públicos de saúde, conforme determinado pela Lei Complementar nº 141.` }
              />
            </GraphicCard>

          </div>

          <div>

            <GraphicCard
              title={`Percentual da receita aplicada em Saúde do ${type} no período de ${anoInicio} a ${ano}`}
              tooltip={`Este gráfico mostra o percentual da receita líquida de impostos que foi aplicado em ações e serviços públicos de saúde (ASPS). A linha vermelha representa o mínimo legal obrigatório para estados (12%) ou municípios (15%)."`}
              showPeriod={true}
              anoInicio={anoInicio}
              anoFinal={String(ano)}
              onAnoInicioChange={(v) => setAnoInicio(v)}
            >

              <div className="h-[500px]">
                <GraficoIndicador
                  tipo={type}
                  codigo={codigo}
                  ano={ano}
                  anos={[...Array(ano - parseInt(anoInicio) + 1)].map((_, i) => parseInt(anoInicio) + i)}
                  indicador="serie-lc141"
                />
              </div>

            </GraphicCard>

          </div>

          <div>

            <GraphicCard
              title="  Sobre a LC 141/2012 – Aplicação Mínima em Saúde"
              height="auto"
            >
              <p className="text-lg font-semibold text-gray-700 leading-relaxed">
                A Lei Complementar nº 141, de 2012, regulamenta os valores mínimos que estados e municípios
                devem aplicar anualmente em ações e serviços públicos de saúde. Para os municípios, ela determina
                que pelo menos 15% da receita própria arrecadada, incluindo impostos e transferências constitucionais
                e legais, seja investida na área da saúde. Essa exigência tem como objetivo garantir um financiamento
                mínimo e contínuo do sistema de saúde, assegurando recursos para manutenção de unidades, compra de
                insumos, pagamento de profissionais e melhoria dos serviços prestados à população.
              </p>
            </GraphicCard>

          </div>



        </div>

      </ContentPanelAbstract>
    );
  };

  export default Lc141Content;
