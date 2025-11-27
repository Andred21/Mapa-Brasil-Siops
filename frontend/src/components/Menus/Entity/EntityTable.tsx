import { motion, AnimatePresence } from "framer-motion";
import { Button } from "primereact/button";
import TableEntes from "@/components/TableEntes";
import type { listaEstados } from "@/types";

interface EntityTableProps {
    isUniao: boolean;
    listaAberta: boolean;
    totalMunicipios?: number;
    municipioSelecionado?: string | null;
    codigoUf: string;
    onAbrirTabela: () => void;
    onSelectEstado?: (estado: listaEstados) => void;
    onSelectMunicipio?: (cod: string) => void;
}

export default function EntityTable({
    isUniao,
    listaAberta,
    totalMunicipios,
    municipioSelecionado,
    codigoUf,
    onAbrirTabela,
    onSelectEstado,
    onSelectMunicipio,
}: EntityTableProps) {

    return (
        <div className="mt-4 flex flex-col border-t pt-3">

            {!listaAberta && (

                <Button
                    label={isUniao ? "Escolher Estado" : "Escolher Município"}
                    size="large"
                    className="self-start !rounded-md !bg-gradient-to-r !text-white !shadow-sm hover:!bg-white/30 
                     !from-emerald-600/90 !via-emerald-500 !to-emerald-400 !border-none"
                    onClick={onAbrirTabela}
                />

            )}

            {/* Contador */}
            <h4 className="mt-2 text-lg font-semibold text-gray-800">

                {!listaAberta && municipioSelecionado ? (

                    <span className="ml-1 font-normal text-gray-600">({municipioSelecionado})</span>
                    
                ) : totalMunicipios ? (

                    <span className="ml-1 font-normal text-gray-600">({totalMunicipios})</span>

                ) : null}

            </h4>

            {/* Tabela animada */}
            <AnimatePresence initial={false}>

                {listaAberta && (

                    <motion.div
                        key="tabela"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >

                        {isUniao ? (

                            <TableEntes
                                type="estado"
                                onSelect={(ente) => {
                                    const estado = ente as listaEstados;
                                    onSelectEstado?.(estado);
                                }}
                            />

                        ) : (

                            <TableEntes
                                type="municipio"
                                codigoUf={codigoUf}
                                onSelect={(ente) => {
                                    const municipio = ente as any;
                                    const codigo = municipio.co_municipio;
                                    onSelectMunicipio?.(codigo);
                                }}
                            />

                        )}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );
    
}
