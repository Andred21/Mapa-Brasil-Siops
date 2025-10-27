    import React, { useState } from "react";
    import { ListBox } from "primereact/listbox";
    import { ProgressSpinner } from "primereact/progressspinner";
    import { Message } from "primereact/message";
    import { useMunicipiosPorUf } from "@/hook/api/useEntes";
    import type { listaMunicipios } from "@/types";

    interface TableMunicipiosProps {
      codigoUf: string | null; // Código IBGE do estado
      onSelectMunicipio?: (municipio: listaMunicipios) => void; // Callback opcional quando um município for selecionado
    }

    const TableMunicipios: React.FC<TableMunicipiosProps> = ({
      codigoUf,
      onSelectMunicipio,
    }) => {
      const [municipioSelecionado, setMunicipioSelecionado] = useState<listaMunicipios | null>(null);

      // Hook para buscar municípios do estado selecionado
      const {
        data: municipios,
        isLoading,
        isError,
      } = useMunicipiosPorUf(codigoUf ?? "");

      // Estado: carregando
      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-64">
            <ProgressSpinner style={{ width: "40px", height: "40px" }} />
          </div>
        );
      }

      // Estado: erro
      if (isError) {
        return (
          <div className="flex items-center justify-center h-64">
            <Message severity="error" text="Erro ao carregar municípios." />
          </div>
        );
      }

      // Estado: sem municípios
      if (!municipios || municipios.length === 0) {
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            Nenhum município encontrado para este estado.
          </div>
        );
      }

      // Evento de seleção
      // ✅ Evento de seleção com validação
      const handleSelect = (e: any) => {
        const municipio = e.value as listaMunicipios | null;

        // evita erro se o evento vier vazio
        if (!municipio) return;

        setMunicipioSelecionado(municipio);

        // protege contra callback inexistente ou valor nulo
        if (onSelectMunicipio && municipio.co_municipio) {
          onSelectMunicipio(municipio);
        }
      };
      return (
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Municípios ({municipios.length})
          </h3>

          <ListBox
            value={municipioSelecionado}
            options={municipios}
            optionLabel="no_municipio"
            dataKey="id"
            filter
            filterPlaceholder="Pesquisar município..."
            onChange={handleSelect}
            listStyle={{ maxHeight: "400px" }}
            className="w-full md:w-20rem"
          />

          {municipioSelecionado && (
            <div className="mt-3 text-sm text-gray-700">
              <strong>Selecionado:</strong> {municipioSelecionado.no_municipio}
            </div>
          )}
        </div>
      );
    };

    export default TableMunicipios;
