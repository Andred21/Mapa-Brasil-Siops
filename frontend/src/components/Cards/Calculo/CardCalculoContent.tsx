import {  LuEqualApproximately } from "react-icons/lu";

interface IndicadorCardBaseProps {
    numeradorFmt: string;      // Ex: "R$ 1.772.871,51"
    denominadorFmt: string;    // Ex: "R$ 41.103.561,99"
    indicadorFmt: string | null;      // Ex: "4,31%"
    descricao: string;         // Texto final
}

export default function IndicadorCardBase({
    numeradorFmt,
    denominadorFmt,
    indicadorFmt,

    descricao,
}: IndicadorCardBaseProps) {



    return (
        <div className="w-full flex flex-col items-center justify-center  text-center p-4">

            {/* Numerador */}
            <p className="text-xl font-semibold text-gray-900">
                {numeradorFmt}
            </p>

            {/* Divisor */}
            <div className="w-40 my-1 border-t border-2 border-emerald-700" />

            {/* Denominador */}
            <p className="text-xl font-semibold text-gray-900">
                {denominadorFmt}
            </p>

            {/* Seta */}
            {/* Seta sempre para baixo */}
            <div className="my-2 items-center">
                <LuEqualApproximately className="text-emerald-600 ml-2 mt-2 " size={40} />
                
            </div>

            {/* Indicador calculado */}
            <p className="text-xl font-bold text-gray-900">
                {indicadorFmt}
            </p>

            {/* Descrição */}
            <p className="mt-3 text-lg text-gray-800 leading-relaxed font-medium max-w-xs">
                {descricao}
            </p>
        </div>
    );
}
