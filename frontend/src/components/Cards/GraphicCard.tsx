    import React from "react";
    import DropDownAnos from "@/components/Inputs/DropDownAnos";
    import InfoToolTip from "../InfoToolTip";


    interface GraphicCardProps {
        title: string;
        children?: React.ReactNode;
        tooltip?: string;

        /** Controle do seletor de período */
        showPeriod?: boolean;   
        anoInicio?: string;
        anoFinal?: string;

        /** Callback de mudança */
        onAnoInicioChange?: (ano: string) => void;

        /** Altura do card */
        height?: string;



    }

    const GraphicCard: React.FC<GraphicCardProps> = ({
        title,
        tooltip,
        children,
        showPeriod = false,
        anoInicio,
        anoFinal,
        onAnoInicioChange,
    
    }) => {
        return (
        <div className={`bg-white w-full rounded-xl border border-gray-200 shadow-xl p-4 mb-6`}>
                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-4">

                    <div className="flex gap-2 ">
                        <h3 className="text-md font-bold   text-2xl bg-gradient-to-r from-emerald-800/90
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


                    {/* Seletor de período */}
                    {showPeriod && (
                        <div className="flex items-center gap-3 mx-3 ">

                            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                                Ano inicial:
                            </span>

                            <div className="">
                                <DropDownAnos
                                    value={anoInicio ?? ""}
                                    onChange={(v) => onAnoInicioChange?.(v)}
                                />
                            </div>

                            <span className="text-sm whitespace-nowrap text-gray-500">
                                até <strong>{anoFinal}</strong>
                            </span>
                        </div>
                    )}
                </div>

                {/* Conteúdo interno */}
            <div className="w-full min-h-auto flex flex-col gap-3">

                    {children ?? "Conteúdo do gráfico"}
                </div>
            </div>
        );
    };

    export default GraphicCard;
