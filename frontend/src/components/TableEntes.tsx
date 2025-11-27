import React, { useState } from "react";
import { ListBox } from "primereact/listbox";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useMunicipiosPorUf, useEstados } from "@/hook/api/useEntes";
import type { listaMunicipios, listaEstados } from "@/types";

interface TableEntesProps {
  type: "estado" | "municipio";
  codigoUf?: string | null;
  onSelect?: (ente: listaMunicipios | listaEstados) => void;
}

const TableEntes: React.FC<TableEntesProps> = ({ type, codigoUf, onSelect }) => {

  const [selecionado, setSelecionado] = useState<listaMunicipios | listaEstados | null>(null);

  const hook = type === "municipio" ? useMunicipiosPorUf(codigoUf ?? "") : useEstados();
  
  const { data: entes, isLoading, isError } = hook;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <ProgressSpinner style={{ width: "40px", height: "40px" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Message severity="error" text={`Erro ao carregar ${type}s.`} />
      </div>
    );
  }

  if (!entes || entes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        Nenhum {type} encontrado.
      </div>
    );
  }

  const handleSelect = (event: { value: listaMunicipios | listaEstados | null }) => {
    const ente = event.value;
    if (!ente) return;

    setSelecionado(ente);
    onSelect?.(ente);
  };

  const labelField = type === "municipio" ? "no_municipio" : "no_uf";
  const keyField = type === "municipio" ? "co_municipio" : "co_uf";

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        {type === "municipio" ? "Municipios" : "Estados"} ({entes.length})
      </h3>

      <ListBox
        value={selecionado}
        options={entes}
        optionLabel={labelField}
        dataKey={keyField}
        filter
        filterPlaceholder={`Pesquisar ${type}...`}
        onChange={handleSelect}
        listStyle={{ maxHeight: "400px" }}
        className="w-full md:w-20rem"
      />

      {selecionado && (
        <div className="mt-3 text-sm text-gray-700">
          <strong>Selecionado:</strong> {(selecionado as any)[labelField]}
        </div>
      )}
    </div>
  );
};

export default TableEntes;
