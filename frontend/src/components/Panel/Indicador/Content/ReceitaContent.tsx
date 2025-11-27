import React, { useState } from "react";
import CardPanel from "@/components/Cards/CardPanel";
import ContentPanelAbstract from "../../Abstract/ContentPanelAbstract";
import GraphicCard from "@/components/Cards/GraphicCard";
import { useIndicadoresPanel } from "@/hook/components/useIndicadoresPanel";
import IndicadorCardBase from "@/components/Cards/Calculo/CardCalculoContent";
import GraficoIndicador from "@/components/graficos/graficoIndicador";
import TransferBarItem from "@/components/graficos/TransferBar";
import { useGraficoComposicaoReceitaPeriodo } from "@/hook/api/useIndicadorGraphics";
import CardCalculo from "@/components/Cards/Calculo/CardCalculo";

interface ReceitaContentProps {
    type: "estado" | "municipio" | "uniao";
    codigo: string;
    ano: number;
    contentAlign?: string;
}

const ReceitaContent: React.FC<ReceitaContentProps> = ({
    type,
    codigo,
    ano,

}) => {

    const { indicadores } = useIndicadoresPanel(
        type,
        codigo,
        String(ano),
        ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"]
    );
    console.log('Indicadores de ReceitaContent:', type, codigo, ano, indicadores);


    const [anoInicio, setAnoInicio] = useState("2013");

    const anosPeriodo = Array.from(
        { length: ano - Number(anoInicio) + 1 },
        (_, i) => Number(anoInicio) + i
    );


    const { data: graficoComposicaoPeriodo, isLoading: loadingComposicaoPeriodo, error: erroComposicaoPeriodo } =
        useGraficoComposicaoReceitaPeriodo(type, codigo, anosPeriodo);




    return (
        <ContentPanelAbstract
            title="Receita e Transferências"
            onExportXLSX={() => console.log("Export XLSX")}
            onExportPDF={() => console.log("Export PDF")}
        >
            <div>

                {/* Linha dos 3 Cards */}
                <div className="w-full flex justify-between items-center gap-6 mb-6">

                    <CardPanel
                        title="Receita total"
                        value={indicadores["1.1"]?.denominadorFmt}
                        tooltip={`Soma de todos os recursos arrecadados pelo ${type} em ${ano}, incluindo impostos, transferências e outras fontes.`}
                        width="w-full"
                        height="h-36"
                        size="xl"
                    />

                    <CardPanel
                        title="Receita de Impostos"
                        value={indicadores["1.1"]?.numeradorFmt}
                        tooltip={`Valor arrecadado diretamente pelo ${type} por meio de tributos em ${ano}`}
                        width="w-full"
                        height="h-36"
                        size="xl"
                    />

                    <CardPanel
                        title="Receita Intergovernamentais"
                        value={indicadores["1.2"]?.numeradorFmt}
                        tooltip={`Valor tranferido ao ${type} por outros entes Federativos em ${ano}`}
                        width="w-full"
                        height="h-36"
                        size="xl"
                    />

                </div>

                <div className="w-full flex gap-6 items-stretch">
                    <GraphicCard
                        title={`Composição da Receita (${ano})`}
                        tooltip={`Gráfico representando a composição da receita total do ${type} em ${ano}`}
                    >
                        <div className="flex mt-5 h-[400px]">
                            <GraficoIndicador
                                tipo={type}
                                codigo={codigo}
                                ano={ano}
                                indicador="composicao-receita"

                            />

                        </div>



                    </GraphicCard>

                    <CardCalculo
                        title={`Transferências (${ano})`}
                        tooltip="Valor enviado pela União e pelo Estado ao ente selecionado."
                    >
                        <div className="mt-10">
                            <TransferBarItem
                                label={`% das Transferências para a Saúde (SUS) no total de recursos transferidos para o ${type}`}
                                tooltip={`Mostra quanto das transferências recebidas pelo ${type} foram destinadas à saúde (SUS). `}
                                value={Number(indicadores["1.3"]?.indicadorNumberFmt ?? 0)}
                            />
                            <TransferBarItem
                                label={`% das Transferências da União para a Saúde no total de recursos transferidos para a saúde no ${type}`}
                                tooltip={`Mostra quanto da verba da saúde veio da União para o ${type}  `}
                                value={Number(indicadores["1.4"]?.indicadorNumberFmt ?? 0)}
                            />
                            <TransferBarItem
                                label={`% das Transferências da União para a Saúde (SUS) no total de Transferências da União para o ${type}`}
                                tooltip={`Indica quanto dos recursos enviados pela União foram destinados ao SUS no ${type}`}
                                value={Number(indicadores["1.5"]?.indicadorNumberFmt ?? 0)}
                            />
                        </div>




                    </CardCalculo>

                </div>

                {/* Linha do gráfico de séries históricas */}

                <GraphicCard
                    title={`Composição da Receita do ${type} no Período de ${anoInicio} a ${ano}`}
                    tooltip={`Gráfico representando a composição da receita total do ${type} entre o periodo de ${anoInicio} a ${ano}`}
                    showPeriod={true}
                    anoInicio={anoInicio}
                    anoFinal={String(ano)}
                    onAnoInicioChange={(v) => setAnoInicio(v)}

                >
                    <div className=" h-[500px]">
                        {loadingComposicaoPeriodo ? (
                            <p className="text-gray-500 text-sm">Carregando gráfico...</p>
                        ) : erroComposicaoPeriodo ? (
                            <p className="text-red-500 text-sm">Erro ao carregar dados.</p>
                        ) : graficoComposicaoPeriodo ? (

                            <GraficoIndicador
                                tipo={type}
                                codigo={codigo}
                                ano={ano}
                                anos={anosPeriodo}
                                indicador="composicao-receita-periodo"
                            />

                        ) : (
                            <p className="text-gray-400 text-sm">Nenhum dado encontrado.</p>
                        )}
                    </div>

                </GraphicCard>



                <div className="w-full flex gap-6 items-stretch">

                    <CardCalculo
                        title={`1.1 Receita de Impostos `}

                    >
                        <IndicadorCardBase
                            numeradorFmt={indicadores["1.1"]?.numeradorFmt}
                            denominadorFmt={indicadores["1.1"]?.denominadorFmt}
                            indicadorFmt={indicadores["1.1"]?.indicador}
                            descricao={`Representa a participação dos impostos próprios do ${type} (IPTU, ISS, ITBI etc.) sobre a receita total.`}
                        />
                    </CardCalculo>

                    <CardCalculo
                        title={`1.2 Transferências Intergovernamentais `}


                    >
                        <IndicadorCardBase
                            numeradorFmt={indicadores["1.2"]?.numeradorFmt}
                            denominadorFmt={indicadores["1.2"]?.denominadorFmt}
                            indicadorFmt={indicadores["1.2"]?.indicador}
                            descricao={`Indica quanto da receita total do ${type} vem de repasses de outros entes Federativos`}
                        />

                    </CardCalculo>

                    <CardCalculo
                        title={`1.6 Transferências Constitucionais e Legais`}

                    >
                        <IndicadorCardBase
                            numeradorFmt={indicadores["1.6"]?.numeradorFmt}
                            denominadorFmt={indicadores["1.6"]?.denominadorFmt}
                            indicadorFmt={indicadores["1.6"]?.indicador}
                            descricao="Soma a participação dos impostos próprios + transferências constitucionais (FPM, ICMS) sobre a receita total."
                        />
                    </CardCalculo>

                </div>





            </div>

        </ContentPanelAbstract>
    );

};

export default ReceitaContent;
