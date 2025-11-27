import React, { useState } from "react";
import CardPanel from "@/components/Cards/CardPanel";
import ContentPanelAbstract from "../../Abstract/ContentPanelAbstract";
import GraphicCard from "../../../Cards/GraphicCard";
import { useIndicadoresPanel } from "@/hook/components/useIndicadoresPanel";
import GraficoIndicador from "@/components/graficos/graficoIndicador";
import DespesasCategoriaTable from "@/components/Tables/DespesasCategoriaTable";


interface SaudeContentProps {
    type: "estado" | "municipio" | "uniao";
    codigo: string;
    ano: number;
}

const SaudeContent: React.FC<SaudeContentProps> = ({
    type,
    codigo,
    ano
}) => {
    const { indicadores } = useIndicadoresPanel(
        type,
        codigo,
        String(ano),
        ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
    );
    const [anoInicio, setAnoInicio] = useState("2013");


    return (

        <ContentPanelAbstract
            title="Saúde"
            onExportXLSX={() => console.log('Export XLSX')}
            onExportPDF={() => console.log('Export PDF')}
        >

            <div>

                {/* Linha dos Cards principais */}
                <div className="w-full flex justify-between items-center gap-6 mb-6">

                    <CardPanel
                        title="Despesa Total em Saúde"
                        value={indicadores["2.2"]?.denominadorFmt}
                        tooltip={`Valor total aplicado pelo ${type} na saúde em ${ano}`}
                        width="w-full"
                        height="h-36"
                        size="xl"
                    />

                    <CardPanel
                        title="Despesa per capita"
                        value={indicadores["2.1"]?.indicador}
                        tooltip={`Valor médio gasto pelo ${type} em saúde para cada habitante no ano ${ano}, considerando todas as despesas realizadas na área.`}
                        width="w-full"
                        height="h-36"
                        size="xl"
                    />

                    <CardPanel
                        title="Investimento em Saúde"
                        value={indicadores["2.5"]?.numeradorFmt}
                        tooltip={`Percentual do orçamento total que foi destinado aos investimentos na Saúde do ${type} em ${ano}.`}
                        width="w-full"
                        height="h-36"
                        size="xl"
                    />

                </div>

                <div className="w-full flex justify-between  gap-6 ">

                    <GraphicCard

                        title={`Composição da Despesa na Saúde  (${ano})`}
                        tooltip={`Gráfico representando a composição da despesa em Saúde por categoria no ${type} em ${ano}`}
                        height="auto"

                    >
                        <div className="h-[400px]">
                            <GraficoIndicador
                                tipo={type}
                                codigo={codigo}
                                ano={ano}
                                indicador="despesa-saude"
                            />
                        </div>
                    

                        <DespesasCategoriaTable indicadores={indicadores} />


                    </GraphicCard>

                    <div className="w-full h-full">

                        <GraphicCard
                            title={`Despesa per Capita na Saúde no Período de ${anoInicio} a ${ano}`}
                            tooltip={`Gráfico represertando o valor médio gasto pelo ${type} em saúde para cada habitante em conjunto com o crescimento populacional no periodo de ${anoInicio} a ${ano}.`}
                            showPeriod={true}
                            anoInicio={anoInicio}
                            anoFinal={String(ano)}
                            onAnoInicioChange={(v) => setAnoInicio(v)}

                        >
                            <div className="w-full h-[400px]">
                                <GraficoIndicador
                                    tipo={type}
                                    codigo={codigo}
                                    ano={ano}
                                    anos={Array.from(
                                        { length: ano - Number(anoInicio) + 1 },
                                        (_, i) => Number(anoInicio) + i
                                    )}
                                    indicador="serie-renda-per-capita"
                                />
                            </div>
                        </GraphicCard>

                        {/* Gráfico donuts despesas */}
                        <div className=" h-[320px] bg-white w-full border-gray-200 border rounded-xl  p-4 mb-6 items-center" >

                        </div>

                    </div>

                </div>
                <div>
                    <GraphicCard
                        title={`Composição da Despesa na Saúde no Período de ${anoInicio} a ${ano}`}
                        tooltip={`Gráfico representando a composição da despesa em Saúde por categoria no ${type} no Período de ${anoInicio} a ${ano}`}
                        showPeriod={true}
                        anoInicio={anoInicio}
                        anoFinal={String(ano)}
                        onAnoInicioChange={(v) => setAnoInicio(v)}

                    >
                        <div className="w-full h-[400px]">
                            <GraficoIndicador
                                tipo={type}
                                codigo={codigo}
                                ano={ano}
                                anos={[...Array(ano - Number(anoInicio) + 1)].map((_, i) => Number(anoInicio) + i)}
                                indicador="serie-composicao-saude"
                            />
                        </div>
                    </GraphicCard>
                </div>
                <div>

                    <GraphicCard
                        title={`Despesa na Saúde x Receita Total no Período de ${anoInicio} a ${ano}`}
                        tooltip={`Gráfico representando a despesa em Saúde x Receita total do ${type} no Período de ${anoInicio} a ${ano}`}
                        showPeriod={true}
                        anoInicio={anoInicio}
                        anoFinal={String(ano)}
                        onAnoInicioChange={(v) => setAnoInicio(v)}
                    >
                        <div className="w-full h-[400px]">
                            <GraficoIndicador
                                tipo={type}
                                codigo={codigo}
                                ano={ano}
                                anos={[...Array(ano - parseInt(anoInicio) + 1)].map((_, i) => parseInt(anoInicio) + i)}
                                indicador="serie-receita-despesa-saude"
                            />
                        </div>

                    </GraphicCard>

                </div>



            </div>

        </ContentPanelAbstract>

    );

};

export default SaudeContent;
