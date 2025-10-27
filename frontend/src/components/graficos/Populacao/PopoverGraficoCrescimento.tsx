import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import GraficoCrescimento from "@/components/graficos/Populacao/graficoLinha";
import {
    useCrescimentoPopulacaoEstadual,
    useCrescimentoPopulacaoMunicipal,
    useIndicadoresPopulacaoEstadual,
    useIndicadoresPopulacaoMunicipal,
} from "@/hook/api/usePopulacao";

interface PopoverGraficoPopulacionalProps {
    codigo: string;
    tipo: "estado" | "municipio";
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
    anoMin = 2010,
    anoMax = 2024,
}: PopoverGraficoPopulacionalProps) {
    const [anoInicio, setAnoInicio] = useState(anoMin.toString());
    const [anoFinal, setAnoFinal] = useState(anoMax.toString());
    const opRef = useRef<OverlayPanel>(null);

    const { data: dados, isLoading: graficoLoading } =
        tipo === "estado"
            ? useCrescimentoPopulacaoEstadual(codigo, anoInicio, anoFinal)
            : useCrescimentoPopulacaoMunicipal(codigo, anoInicio, anoFinal);

    const { data: indicadores, isLoading: indicadoresLoading } =
        tipo === "estado"
            ? useIndicadoresPopulacaoEstadual(codigo, anoInicio, anoFinal)
            : useIndicadoresPopulacaoMunicipal(codigo, anoInicio, anoFinal);

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
                tooltip={`Visualizar crescimento e indicadores do ${tipo}`}
                tooltipOptions={{ position: "bottom", showDelay: 250 }}
                aria-label={`Abrir gráfico de população do ${tipo}`}
            />

            <OverlayPanel ref={opRef} dismissable className="shadow-lg rounded-lg">
                <div className="w-[460px] px-3 py-2">
                    {/* Filtros de Ano */}
                    <div className="flex gap-2 mb-3">
                        <Dropdown
                            value={anoInicio}
                            options={anosDisponiveis}
                            onChange={(e) => setAnoInicio(e.value)}
                            placeholder="Ano Início"
                            className="w-full"
                        />
                        <Dropdown
                            value={anoFinal}
                            options={anosDisponiveis}
                            onChange={(e) => setAnoFinal(e.value)}
                            placeholder="Ano Fim"
                            className="w-full"
                        />
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
                            titulo={`População (${sigla}) de ${anoInicio} a ${anoFinal}`}
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
                                {/* Painel visual de resumo */}
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

                                {/* Detalhes numéricos */}
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
                                            {indicadores.tendencia === "Crescimento"
                                                ? "Crescimento"
                                                : indicadores.tendencia === "Queda"
                                                    ? " Queda"
                                                    : "Estável"}
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
