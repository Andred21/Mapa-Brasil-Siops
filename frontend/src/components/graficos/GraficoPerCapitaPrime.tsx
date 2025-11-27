import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

interface GraficoPerCapitaPrimeProps {
    anos: number[];
    populacao: number[];
    perCapita: number[];
}

export default function GraficoPerCapitaPrime({
    anos,
    populacao,
    perCapita
}: GraficoPerCapitaPrimeProps) {

    const [chartData, setChartData] = useState<any>({});
    const [chartOptions, setChartOptions] = useState<any>({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color") || "#374151";
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary") || "#6b7280";
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border") || "#e5e7eb";

        setChartData({
            labels: anos,
            datasets: [
                {
                    type: "bar",
                    label: "População",
                    data: populacao,
                    backgroundColor: "rgba(16,185,129,0.35)",
                    borderColor: "rgb(16,185,129)",
                    borderWidth: 2,
                    yAxisID: "y",
                },
                {
                    type: "line",
                    label: "Despesa Per Capita",
                    data: perCapita,
                    borderColor: "rgb(5,150,105)",
                    backgroundColor: "rgb(5,150,105)",
                    borderWidth: 3,
                    yAxisID: "y1",
                    tension: 0.4,
                    pointRadius: 4,
                },
            ],
        });

        setChartOptions({
            maintainAspectRatio: false,
            aspectRatio: 0.65,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx: any) => {
                            if (ctx.dataset.type === "line") {
                                return `R$ ${ctx.raw.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                })}`;
                            }
                            return ctx.raw.toLocaleString("pt-BR");
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder }
                },
                y: {
                    type: "linear",
                    position: "left",
                    ticks: {
                        color: "#047857",
                        callback: (v: number) =>
                            v.toLocaleString("pt-BR"),
                    },
                    title: {
                        display: true,
                        text: "População",
                        color: "#047857",
                        font: { size: 14 }
                    },
                },
                y1: {
                    type: "linear",
                    position: "right",
                    grid: { drawOnChartArea: false },
                    ticks: {
                        color: "#059669",
                        callback: (v: number) =>
                            `R$ ${v.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}`,
                    },
                    title: {
                        display: true,
                        text: "Despesa Per Capita",
                        color: "#059669",
                        font: { size: 14 }
                    },
                },
            },
        });
    }, [anos, populacao, perCapita]);

    return (
        <div className="w-full h-[360px]">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}
