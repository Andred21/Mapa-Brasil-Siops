import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
    useCrescimentoPopulacaoEstadual,
    useIndicadoresPopulacaoEstadual,
    useCrescimentoPopulacaoMunicipal,
    useIndicadoresPopulacaoMunicipal,
    useCrescimentoPopulacaoUniao,
    useIndicadoresPopulacaoUniao,
    useGraficoDespesaSaude,
    useIndicadoEstadoEspecificoAno,
    useIndicadoMunicipioEspecificoAno,
    useIndicadorUniaoEspecificoAno,
} from "@/hook";



import type { listaEstados } from "@/types";
import AccordionTabela from "../../AccordionTab";
import IndicadorMenuContent from "../../Panel/Indicador/Content/IndicadorMenuContent";
import EntityHeader from "./EntityHeader";
import EntityTable from "./EntityTable";



type TipoEntidade = "estado" | "municipio" | "uniao";

type CrescimentoShape = {
    crescimento_percentual?: number;
    crescimento_medio_anual?: number;
    pop_inicial?: string | number;
    pop_final?: string | number;
    tendencia?: string;
};

interface MenuEntidadeProps {
    type: TipoEntidade;
    data: any;
    popValue: string | null;
    popLoading: boolean;
    anoSelecionado: string;
    anoConsulta?: string;
    minAnoDisponivel?: number;
    totalMunicipios?: number;
    municipioSelecionado?: string | null;
    onSelectMunicipioFromList?: (cod_ibge: string) => void;
    onSelectEstadoFromList?: (estado: listaEstados) => void;
    onReabrirTabela?: () => void;
}

function normalizeCrescimento(data: unknown): CrescimentoShape | null {
    if (!data) return null;
    const objeto = Array.isArray(data) ? data[data.length - 1] : data;
    return typeof objeto === "object" && objeto !== null && "crescimento_percentual" in objeto
        ? (objeto as CrescimentoShape)
        : null;
}

const MenuEntidade: React.FC<MenuEntidadeProps> = ({
    type,
    data,
    popValue,
    popLoading,
    anoSelecionado,
    anoConsulta: anoConsultaProp,
    minAnoDisponivel,
    totalMunicipios,
    municipioSelecionado,
    onSelectMunicipioFromList,
    onSelectEstadoFromList,
    onReabrirTabela,
}) => {
    const [listaAberta, setListaAberta] = useState(false);

    const codigoUf = data?.co_uf || data?.codigo_uf || "";
    const codigoMunicipio = data?.co_municipio || data?.cod_ibge || "";

    const isUniao = type === "uniao";
    const anoMinimoSerie = minAnoDisponivel ?? (isUniao ? 2013 : 2010);
    const anoConsultaBase = anoConsultaProp ?? anoSelecionado;
    const anoConsultaValido =
        Number(anoConsultaBase) < anoMinimoSerie ? String(anoMinimoSerie) : anoConsultaBase;
    const anoInicioSerie = isUniao ? String(anoMinimoSerie) : "2010";
    const anoSelecionadoNumero = Number(anoSelecionado);
    const exibindoAnoAjustado = Number.isFinite(anoSelecionadoNumero) && anoSelecionadoNumero < anoMinimoSerie;
    const anoConsultaNumero = Number(anoConsultaValido);
    const anoParaPainel = Number.isFinite(anoConsultaNumero) ? anoConsultaNumero : anoMinimoSerie;

    const menuPanelRef = useRef<HTMLDivElement>(null);
    const [showPanel, setShowPanel] = useState(false);

    const crescimentoQuery =
        type === "estado"
            ? useCrescimentoPopulacaoEstadual(codigoUf, "2013", anoConsultaValido)
            : type === "municipio"
                ? useCrescimentoPopulacaoMunicipal(codigoMunicipio, "2013", anoConsultaValido)
                : useCrescimentoPopulacaoUniao(anoInicioSerie, anoConsultaValido);

    const indicadoresQuery =
        type === "estado"
            ? useIndicadoresPopulacaoEstadual(codigoUf, "2013", anoConsultaValido)
            : type === "municipio"
                ? useIndicadoresPopulacaoMunicipal(codigoMunicipio, "2013", anoConsultaValido)
                : useIndicadoresPopulacaoUniao(anoInicioSerie, anoConsultaValido);

    const crescimento = normalizeCrescimento(crescimentoQuery.data);
    const crescimentoPercentual =
        typeof crescimento?.crescimento_percentual === "number"
            ? crescimento.crescimento_percentual.toFixed(2)
            : null;

    const despesaSaude = useGraficoDespesaSaude(
        type,
        type === "uniao" ? "76"
            : type === "estado" ? codigoUf : codigoMunicipio,
        Number(anoConsultaValido)
    );

    const investimento = despesaSaude.data?.segments?.find(
        (s: any) => s.label === "Investimentos"
    )?.value ?? null;

    const despesaPorHabitante = despesaSaude.data?.kpis?.find(
        (k: any) => k.label === "Despesa por habitante"
    )?.value ?? null;

    const indicador11 =
        type === "estado"
            ? useIndicadoEstadoEspecificoAno(codigoUf, "1.1", anoConsultaValido)
            : type === "municipio"
                ? useIndicadoMunicipioEspecificoAno(codigoMunicipio, "1.1", anoConsultaValido)
                : useIndicadorUniaoEspecificoAno("1.1", anoConsultaValido);

    // Pega o primeiro item ou último (caso venha mais de um)
    const indicadorAtual = Array.isArray(indicador11.data)
        ? indicador11.data[0]
        : indicador11.data;

    const receitaIndicador11 = indicadorAtual?.numerador
        ? Number(indicadorAtual.numerador).toLocaleString("pt-BR")
        : "—";

    useEffect(() => {
        setListaAberta(false);
    }, [type, codigoUf, codigoMunicipio]);

    const handleSelectMunicipio = (cod_ibge: string) => {
        setListaAberta(false);
        onSelectMunicipioFromList?.(cod_ibge);
    };

    const handleSelectEstado = (estado: listaEstados) => {
        setListaAberta(false);
        onSelectEstadoFromList?.(estado);
    };

    const handleAbrirTabela = () => {
        setListaAberta(true);
        onReabrirTabela?.();
    };
    console.log("indicadores", indicadoresQuery.data)
    console.log("indi", crescimentoQuery.data)

    useEffect(() => {
        // Delay para permitir que o conteúdo acima carregue
        const timer = setTimeout(() => {
            setShowPanel(true);
            // Scroll suave até o MenuPanel
            menuPanelRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 400); // ajustável entre 300–600ms

        return () => clearTimeout(timer);
    }, [data?.codigo_uf, data?.cod_ibge, type]);


    if (
        popLoading ||
        crescimentoQuery.isLoading ||
        indicadoresQuery.isLoading
    ) {
        return (
            <div className="flex h-full items-center justify-center text-gray-500">
                Carregando dados...
            </div>
        );
    }

    const nome =
        type === "uniao"
            ? "Brasil"
            : data?.no_uf || data?.no_municipio || "Brasil";

    const codigo =
        type === "estado"
            ? codigoUf || ""
            : type === "municipio"
                ? codigoMunicipio || ""
                : "76";

    const sigla =
        type === "uniao"
            ? "BR"
            : data?.sg_uf ||
            (type === "municipio"
                ? (data?.no_municipio || "").slice(0, 3).toUpperCase()
                : undefined);

    return (
        <div className="mb-3">

            <EntityHeader
                nome={nome}
                sigla={sigla}
                codigo={codigo}
                popValue={popValue}
                popLoading={popLoading}
                tipo={type}
                anoMax={anoSelecionadoNumero}
                mostrarAvisoAno={exibindoAnoAjustado}
                anoAviso={anoConsultaValido}
            />


            {(type === "estado" || type === "uniao") && (

                <EntityTable
                    isUniao={isUniao}
                    listaAberta={listaAberta}
                    totalMunicipios={totalMunicipios}
                    municipioSelecionado={municipioSelecionado}
                    codigoUf={codigoUf}
                    onAbrirTabela={handleAbrirTabela}
                    onSelectEstado={(estado) => handleSelectEstado(estado)}
                    onSelectMunicipio={(cod) => handleSelectMunicipio(cod)}
                />
            )}

            <div className="mt-4">
                <motion.div
                    ref={menuPanelRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={showPanel ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mt-6"
                >

                    <AccordionTabela
                        color="emerald"
                        tabs={[
                            {
                                label: "Indicadores Gerais",
                                icon: "pi pi-chart-line",
                                tooltip: `Indicadores resumidos do ${type}.`,
                                content: (

                                    <IndicadorMenuContent
                                        type={type}
                                        codigo={codigo}
                                        nome={nome}
                                        tipoLabel={type === "municipio" ? "município" : type === "estado" ? "estado" : "país"}
                                        ano={anoParaPainel}
                                        data={{
                                            crescimentoPercentual:
                                                indicadoresQuery.data?.crescimento_percentual?.toFixed?.(2) ??
                                                crescimentoPercentual ??
                                                null,
                                            receita: despesaPorHabitante,
                                            saude: investimento,
                                        }}
                                    />


                                ),
                            },
                            
                        ]}
                    />

                </motion.div>
            </div>
        </div>
    );
};

export default MenuEntidade;
