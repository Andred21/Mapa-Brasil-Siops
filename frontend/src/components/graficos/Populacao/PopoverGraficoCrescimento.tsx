

import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import GraficoCrescimento from "@/components/graficos/Populacao/graficoLinha";
import {
    useCrescimentoPopulacaoEstadual,
    useCrescimentoPopulacaoMunicipal,
    useCrescimentoPopulacaoUniao,
    useIndicadoresPopulacaoEstadual,
    useIndicadoresPopulacaoMunicipal,
    useIndicadoresPopulacaoUniao,
} from "@/hook";

interface PopoverGraficoPopulacionalProps {
    codigo: string;
    tipo: "estado" | "municipio" | "uniao";
    sigla?: string;
    cor?: string;
    anoMin?: number;
    anoMax?: number;
}
export default function PopoverGraficoPopulacional({
    codigo,
    tipo,
    sigla = "",
    cor = "#28a745",
    anoMin = 2013,
    anoMax = 2025,
}: PopoverGraficoPopulacionalProps) {

    const [anoInicio, setAnoInicio] = useState(anoMin.toString());

    const anoFinal = anoMax.toString();

    const opRef = useRef<OverlayPanel>(null);

    // 🔹 Hook genérico que trata estado, município e união
    let dadosHook, indicadoresHook;
    if (tipo === "estado") {
        dadosHook = useCrescimentoPopulacaoEstadual(codigo, anoInicio, anoFinal);
        indicadoresHook = useIndicadoresPopulacaoEstadual(codigo, anoInicio, anoFinal);
    } else if (tipo === "municipio") {
        dadosHook = useCrescimentoPopulacaoMunicipal(codigo, anoInicio, anoFinal);
        indicadoresHook = useIndicadoresPopulacaoMunicipal(codigo, anoInicio, anoFinal);
    } else {
        dadosHook = useCrescimentoPopulacaoUniao(anoInicio, anoFinal);
        indicadoresHook = useIndicadoresPopulacaoUniao(anoInicio, anoFinal);
    }
    const { data: dados, isLoading: graficoLoading } = dadosHook;
    const { data: indicadores, isLoading: indicadoresLoading } = indicadoresHook;
    const anosDisponiveis = Array.from({ length: anoMax - anoMin + 1 }, (_, i) => {
        const year = (anoMin + i).toString();
        return { label: year, value: year };
    });
    const formatNumber = (value: number) =>
        new Intl.NumberFormat("pt-BR").format(value ?? 0);
    const formatPercent = (value: number) =>
        `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
    return (
        <>
            <Button
                icon="pi pi-chart-line"
                size="large"
                className="!bg-transparent !border-none !p-2 !font-bold
                    !text-emerald-800 hover:!bg-emerald-100 hover:!text-emerald-800
                    focus:!ring-2 focus:!ring-emerald-300 rounded-full transition"
                onClick={(e) => opRef.current?.toggle(e)}
                tooltip={`Visualizar crescimento e indicadores da ${tipo === "uniao" ? "União (Brasil)" : tipo}`}
                tooltipOptions={{ position: "bottom", showDelay: 250 }}
                aria-label={`Abrir gráfico de população da ${tipo === "uniao" ? "União" : tipo}`}
            />
            <OverlayPanel ref={opRef} dismissable className="shadow-lg rounded-lg">
                <div className="w-[460px] px-3 py-2">
                    {/* Filtros de Ano */}
                    {/* Filtro de Ano (somente início) */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm text-gray-600 font-medium">Ano inicial:</span>
                        <Dropdown
                            value={anoInicio}
                            options={anosDisponiveis}
                            onChange={(e) => setAnoInicio(e.value)}
                            className="w-32"
                        />
                        <span className="text-sm text-gray-500">
                            até <strong>{anoFinal}</strong>
                        </span>
                    </div>
                    {/* Gráfico */}
                    {graficoLoading ? (
                        <p className="text-gray-500 text-sm">Carregando gráfico...</p>
                    ) : dados?.length ? (
                        <GraficoCrescimento
                            dados={dados.map((item: any) => ({
                                anoValido: item.anoValido ?? item.ano,
                                populacao: item.populacao,
                            }))}
                            titulo={`População (${tipo === "uniao" ? "Brasil" : sigla}) de ${anoInicio} a ${anoFinal}`}
                            cor={cor}
                        />
                    ) : (
                        <p className="text-gray-400 text-sm text-center">
                            Nenhum dado encontrado.
                        </p>
                    )}
                    {/* Indicadores */}
                    <div className="mt-5 border-t pt-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            Indicadores Populacionais
                        </h4>
                        {indicadoresLoading ? (
                            <p className="text-gray-500 text-sm">Calculando...</p>
                        ) : indicadores ? (
                            <div className="space-y-3 text-sm text-gray-700">
                                <div
                                    className={`flex justify-between items-center p-3 rounded-md ${indicadores.tendencia === "Crescimento"
                                        ? "bg-green-100 border border-green-300"
                                        : indicadores.tendencia === "Queda"
                                            ? "bg-red-100 border border-red-300"
                                            : "bg-gray-50 border border-gray-300"
                                        }`}
                                >
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600">
                                            Crescimento Total
                                        </p>
                                        <p className="font-bold text-lg">
                                            {formatNumber(indicadores.crescimento_absoluto)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-600">Taxa (%)</p>
                                        <p
                                            className={`font-bold text-lg ${indicadores.tendencia === "Crescimento"
                                                ? "text-green-600"
                                                : indicadores.tendencia === "Queda"
                                                    ? "text-red-600"
                                                    : "text-gray-700"
                                                }`}
                                        >
                                            {formatPercent(indicadores.crescimento_percentual)}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-y-2">
                                    <p>
                                        <strong>Média Anual:</strong>{" "}
                                        {formatPercent(indicadores.crescimento_medio_anual)}
                                    </p>
                                    <p>
                                        <strong>Tendência:</strong>{" "}
                                        <span
                                            className={`font-semibold ${indicadores.tendencia === "Crescimento"
                                                ? "text-green-600"
                                                : indicadores.tendencia === "Queda"
                                                    ? "text-red-600"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {indicadores.tendencia ?? "Estável"}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>População Inicial:</strong>{" "}
                                        {formatNumber(indicadores.pop_inicial)}
                                    </p>
                                    <p>
                                        <strong>População Final:</strong>{" "}
                                        {formatNumber(indicadores.pop_final)}
                                    </p>
                                    <p>
                                        <strong>Maior População:</strong>{" "}
                                        {formatNumber(indicadores.pop_max)}
                                    </p>
                                    <p>
                                        <strong>Menor População:</strong>{" "}
                                        {formatNumber(indicadores.pop_min)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm text-center">
                                Nenhum indicador disponível.
                            </p>
                        )}
                    </div>
                </div>
            </OverlayPanel>
        </>
    );
}