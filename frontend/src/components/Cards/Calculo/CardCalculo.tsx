import React from "react";

import InfoToolTip from "../../InfoToolTip";

interface CardCalculoProps {
    title: string;
    children?: React.ReactNode;
    tooltip?: string;

    


}

const CardCalculo: React.FC<CardCalculoProps> = ({
    title,
    tooltip,
    children,

}) => {
    return (
        <div className={`bg-white w-full rounded-xl border border-gray-200 shadow-xl p-4 mb-6`}>
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-4">

                <div className="flex gap-2 ">
                    <h3 className="text-md font-bold  whitespace-nowrap text-2xl bg-gradient-to-r from-emerald-800/90
                     via-emerald-700 to-emerald-600 bg-clip-text text-transparent">
                        {title}
                    </h3>

                    {tooltip && (
                        <InfoToolTip
                            message={tooltip}
                            position="top"
                            size={25}
                            iconClass=" text-emerald-500  "
                        />
                    )}

                </div>

            </div>

            {/* Conteúdo interno */}
            <div className="w-full min-h-[200px] flex flex-col items-center gap-3">
                {children ?? "Conteúdo do gráfico"}
            </div>
        </div>
    );
};

export default CardCalculo;
