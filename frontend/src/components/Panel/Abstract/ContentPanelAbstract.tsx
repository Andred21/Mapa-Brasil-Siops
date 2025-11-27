import React from "react";

import { Button } from "primereact/button";
import { Divider } from 'primereact/divider';

interface ContentPanelAbstractProps {
    title: string;
    source?: string;
    onExportXLSX?: () => void;
    onExportPDF?: () => void;
    children: React.ReactNode;
}

const ContentPanelAbstract: React.FC<ContentPanelAbstractProps> = ({
    title,

    onExportXLSX,
    onExportPDF,
    children,
}) => {

    return (

        <div className="bg-gradient-to-br from-emerald-100 via-white to-emerald-200 rounded-xl border border-gray-200 shadow-2xl p-4 space-y-4 overflow-y-auto">

            {/* Mini menu */}
            <div className="bg-white items-center my-5 rounded-xl border border-gray-200 shadow-sm ">



                <div className="flex items-center p-4 gap-7 justify-between ">

                    <div className="flex items-center gap-7">

                        <h2 className="text-3xl font-semibold text-emerald-700">
                            {title}
                        </h2>

                        <Divider layout="vertical" className="!text-emerald-500" />
                        
                        <Button
                            icon="pi pi-file-excel"
                            className="!h-12 !w-14 !rounded-xl !bg-gradient-to-r !text-white !shadow-sm
                         hover:!bg-white/30 !from-emerald-600/90 !via-emerald-500 !to-emerald-400 !border-none"
                            onClick={onExportXLSX}
                            tooltip="Exportar XLSX"
                        />

                        <Button
                            icon="pi pi-file-pdf"
                            className="!h-12 !w-14 !rounded-xl !bg-gradient-to-r !text-white !shadow-sm
                         hover:!bg-white/30 !from-emerald-600/90 !via-emerald-500 !to-emerald-400 !border-none"
                            onClick={onExportPDF}
                            tooltip="Exportar PDF"
                        />

                    </div>

                  
                </div>

            </div>

            

            {/* Conteúdo principal (gráficos, cards, etc) */}
            <div className="pt-2 ">
                {children}
            </div>


        </div>

    );

};

export default ContentPanelAbstract;
