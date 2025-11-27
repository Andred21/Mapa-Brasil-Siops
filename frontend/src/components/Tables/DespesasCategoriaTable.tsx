import { HiUsers, HiClipboardDocumentList } from "react-icons/hi2";
import { GiMedicines } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";

interface DespesasCategoriaTableProps {
    indicadores: Record<string, any>;
}

export default function DespesasCategoriaTable({
    indicadores,
}: DespesasCategoriaTableProps) {
    const rows = [
        { key: "2.2", label: "Pessoal", icon: <HiUsers className="text-emerald-700 text-xl" /> },
        { key: "2.3", label: "Medicamentos", icon: <GiMedicines className="text-emerald-700 text-xl" /> },
        { key: "2.4", label: "Serviços Terceiros", icon: <HiClipboardDocumentList className="text-emerald-700 text-xl" /> },
        { key: "2.5", label: "Investimentos", icon: <FaChartLine className="text-emerald-700 text-xl" /> },
        { key: "2.6", label: "IPSFL", icon: <MdLocalHospital className="text-emerald-700 text-xl" /> },
    ];

    const totalSaude = indicadores["2.2"]?.denominadorFmt ?? "—";

    const formatPct = (num: number | null) =>
        num == null ? "—" : `${num.toFixed(2).replace(".", ",")}%`;

    return (
        <div className="border border-emerald-400 rounded-xl shadow-md bg-white overflow-hidden w-auto" >

            {/* Cabeçalho */}
            <div className="px-5 py-4 bg-emerald-50 border-b border-emerald-300">
                <h2 className="text-xl font-bold text-emerald-800">
                    Despesas por Categoria (R$)
                </h2>
            </div>

            {/* Tabela */}
            <div className="divide-y divide-gray-200">
                {rows.map((row) => {
                    const item = indicadores[row.key];

                    return (
                        <div
                            key={row.key}
                            className="grid grid-cols-[1.7fr_1fr_1.4fr] px-5 py-4 items-center text-[17px] gap-4"
                        >
                            {/* Nome da categoria */}
                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                {row.label}
                                {row.icon}
                            </div>

                            {/* Percentual */}
                            <div className="text-emerald-700 font-bold text-right">
                                {formatPct(item?.indicadorNumberFmt ?? null)}
                            </div>

                            {/* Valor R$ */}
                            <div className="text-gray-900 font-bold text-right whitespace-nowrap">
                                {item?.numeradorFmt ?? "—"}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total */}
            <div className="px-5 py-4 bg-emerald-50 border-t border-emerald-300 flex justify-between font-bold text-lg">
                <span>Total registrado em Saúde</span>
                <span className="text-emerald-700">{totalSaude}</span>
            </div>
        </div>
    );
}
