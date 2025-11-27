import { useState } from "react";
import { Divider } from "primereact/divider";
import IndicadorPanel from "../IndicadorPanel";

interface IndicadorMenuContentProps {
    nome: string;
    ano: number;
    tipoLabel: string;
    data: {
        crescimentoPercentual: string | number | null;
        receita: string | number | null;
        saude: string | number | null;
    };
    type: "estado" | "municipio" | "uniao";
    codigo: string;
}

export default function IndicadorMenuContent({
    nome,
    ano,
    tipoLabel,
    data,
    type,
    codigo,
}: IndicadorMenuContentProps) {

    const [painelAberto, setPainelAberto] = useState(false);

    return (
        <div>

            {/* Introdução */}
            <div className="mb-4 text-gray-700 leading-relaxed">
                <p>
                    Estes indicadores reúnem informações oficiais sobre o{" "}
                    <strong>{tipoLabel}</strong>{" "}
                    <span className="capitalize">{nome}</span>.
                </p>
                <p className="text-sm text-gray-500 italic mt-1">
                    (Dados obtidos de fontes públicas atualizadas.)
                </p>
            </div>

            <Divider />

            {/* MÉTRICAS */}
            <div className="space-y-3">

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <i className="pi pi-chart-line text-emerald-600" />
                        <strong>Crescimento populacional (2013 - {ano}):</strong>
                    </span>
                    <span className="text-emerald-700 font-medium">
                        {data.crescimentoPercentual
                            ? `${data.crescimentoPercentual}%`
                            : "—"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <i className="pi pi-dollar text-emerald-600" />
                        <strong>Despesa na saúde per capita:</strong>
                    </span>
                    <span className="text-emerald-700 font-medium">
                        {data.receita
                            ? `R$ ${Number(data.receita).toLocaleString("pt-BR")}`
                            : "—"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <i className="pi pi-heart text-emerald-600" />
                        <strong>Investimento em saúde:</strong>
                    </span>
                    <span className="text-emerald-700 font-medium">
                        {data.saude ? `${data.saude}%` : "—"}
                    </span>
                </div>

            </div>

            <Divider />

            {/* BOTÃO — abrir painel completo */}
            <div
                onClick={() => setPainelAberto(true)}
                className="flex items-center justify-center text-emerald-700 font-medium cursor-pointer hover:text-emerald-600 transition"
            >
                <i className="pi pi-external-link mr-2" />
                Ver dashboard completo
            </div>


            {/* PAINEL COMPLETO (MODAL) */}
            {painelAberto && (
                <IndicadorPanel
                    visible={painelAberto}
                    onClose={() => setPainelAberto(false)}
                    type={type}
                    nome={nome}
                    codigo={codigo}
                    ano={ano}
                />
            )}
        </div>
    );
}
