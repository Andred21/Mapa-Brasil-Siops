// Hooks React usados para estado e efeitos
import { useEffect, useState } from "react";

// Componente de barra de progresso do PrimeReact
import { ProgressBar } from "primereact/progressbar";

// Componente customizado para exibir ícone de informação com tooltip
import InfoToolTip from "@/components/InfoToolTip";

// Tipagem das props recebidas pelo componente
interface TransferBarItemProps {
    label: string;     // Nome do indicador
    tooltip?: string;  // Texto opcional exibido no tooltip
    value: number;     // Percentual entre 0 e 100
}

export default function TransferBarItem({
    label,
    tooltip,
    value,
}: TransferBarItemProps) {

    // Estado interno usado para animar o valor da barra
    // Começa em 0 e incrementa até o valor final
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 900;
        const increment = 1000 / 60;
        const step = (end - start) / (duration / increment);

        // Inicia o timer da animação
        const timer = setInterval(() => {
            start += step;

            // Se alcançar ou passar o valor final, para a animação
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }

            // Atualiza o estado da barra animada
            setAnimatedValue(start);

        }, increment);

        // Cleanup → garante que o interval é removido ao desmontar
        return () => clearInterval(timer);

    }, [value]); // Reexecuta a animação quando o valor mudar

    return (
        <div className="w-[80%] mx-auto mb-6">
            
            {/* Linha de título + texto + tooltip + percentual */}
            <div className="flex items-start justify-between mb-2">

                {/* Texto principal + tooltip alinhados à esquerda */}
                <div className="flex items-start gap-2 max-w-[85%]">

                    {/* Nome do indicador */}
                    <span className="text-[18px] leading-snug text-gray-800 font-medium">
                        {label}
                    </span>

                    {/* Tooltip opcional (só aparece se 'tooltip' existir) */}
                    {tooltip && (
                        <InfoToolTip
                            message={tooltip}
                            position="right"
                            size={16}
                            iconClass="text-emerald-700"
                        />
                    )}
                </div>

                {/* Percentual formatado com vírgula como separador decimal */}
                <span className="text-[18px] text-gray-900 font-semibold whitespace-nowrap">
                    {value.toFixed(2).replace(".", ",")}%  
                </span>
            </div>

            {/* Barra de progresso estilizada e com valor animado */}
            <ProgressBar
                value={animatedValue} // valor gradual que anima a barra
                showValue={false}     // não exibir valor dentro da barra
                style={{
                    height: "22px",    // deixa mais grossa (padrão é fino)
                    borderRadius: "10px",
                    overflow: "hidden", // suaviza bordas internas
                }}
                className="w-full bg-gray-300"
                pt={{
                    // Estiliza a parte interna da barra (cor animada)
                    value: {
                        className: `
                            transition-all duration-500 ease-out
                            !bg-gradient-to-r
                            !from-emerald-700
                            !via-emerald-600
                            !to-emerald-400
                        `,
                    },
                }}
            />
        </div>
    );
}
