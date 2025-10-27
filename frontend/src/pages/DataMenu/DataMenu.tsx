import React, { useMemo, useState } from "react";
import { Button } from "primereact/button";
import MenuEstado from "./MenuEstado";
import MenuMunicipio from "./MenuMuncipio";
import DropDownAnos from "@/components/DropDownAnos";

import {
  usePopulacaoEstadoPorAno,
  usePopulacaoMunicipioPorAno,
  useEstadoByCodUf,
  useMunicipioByCod,
  useEstadoByMunicipio,
} from "@/hook";


export interface DataMenuProps {
  visible: boolean;
  data: any;
  type: "estado" | "municipio";
  onHide: () => void;
  onSelectMunicipioFromList?: (cod_ibge: string) => void;
}

const DataMenu: React.FC<DataMenuProps> = ({
  data,
  type,
  onHide,
  onSelectMunicipioFromList,
}) => {

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Nenhum dado selecionado
      </div>
    );

  }

  const { data: estadoViaMunicipio } = useEstadoByMunicipio(
    type === "municipio" ? data?.cod_ibge ?? "" : ""
  );

  const codigoUf = useMemo(() => {
    if (type === "estado") return data?.codigo_uf ?? "";
    return estadoViaMunicipio?.co_uf ?? "";
  }, [type, data, estadoViaMunicipio]);

  const [anoSelecionado, setAnoSelecionado] = useState("2024");


  const { data: estado, isLoading: estadoLoading } = useEstadoByCodUf(codigoUf);

  const { data: popEstado, isLoading: popEstadoLoading } =
    usePopulacaoEstadoPorAno(codigoUf, anoSelecionado);

  const { data: municipio, isLoading: municipioLoading } = useMunicipioByCod(
    type === "municipio" ? data?.cod_ibge ?? "" : ""
  );

  const { data: popMunicipio, isLoading: popMunicipioLoading } =
    usePopulacaoMunicipioPorAno(
      type === "municipio" ? data?.cod_ibge ?? "" : "",
      anoSelecionado
    );

  const ultimaPopulacaoEstado = popEstado?.populacao ?? null;

  const ultimaPopulacaoMunicipio = popMunicipio?.populacao ?? null;

  if (estadoLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Carregando dados...
      </div>
    );
  }



  return (

    <div className="flex flex-col h-full p-4 overflow-y-auto relative">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mx-3 mb-2 ">

        <div className="gap-7 items-center">

          <h3 className="text-lg font-bold text-gray-800 mb-3">Ano Selecionado</h3>

          <DropDownAnos
            value={anoSelecionado}
            onChange={(ano) => setAnoSelecionado(ano)}
          />

        </div>

        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text p-button-md rounded-2xl !bg-emerald-700 hover:!bg-emerald-600 !text-white !border-none transition"
          onClick={onHide}
          aria-label="Fechar"
        />

      </div>

      {/* ==================== BLOCO ESTADO ==================== */}
      <div className="mt-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">

        <h2 className="text-lg font-bold text-gray-800 mb-3">Estado</h2>

        <MenuEstado
          estado={estado}
          popEstado={ultimaPopulacaoEstado}
          anoSelecionado={anoSelecionado}
          municipioSelecionadoExterno={municipio}
          popLoading={popEstadoLoading}
          onSelectMunicipioFromList={onSelectMunicipioFromList}
        />

      </div>

      {/* ==================== BLOCO MUNICÍPIO ==================== */}
      {type === "municipio" && (

        <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">

          <h2 className="text-lg font-bold text-gray-800 mb-3">Município</h2>

          <MenuMunicipio
            municipio={municipio}
            popMunicipio={ultimaPopulacaoMunicipio}
            popLoading={popMunicipioLoading}
          />

        </div>

      )}

    </div>

  );

};

export default DataMenu;
