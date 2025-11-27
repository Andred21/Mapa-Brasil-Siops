import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import DropDownAnos from "@/components/Inputs/DropDownAnos";
import MenuEntidade from "@/components/Menus/Entity/MenuEntidade";
import type { listaEstados } from "@/types";

import {
  usePopulacaoEstadoPorAno,
  usePopulacaoMunicipioPorAno,
  useEstadoByCodUf,
  useMunicipioByCod,
  useEstadoByMunicipio,
  usePopulacaoUniaoPorAno,
} from "@/hook";

type Painel = "uniao" | "estado" | "municipio" | null;

const UNIAO_MIN_YEAR = 2013;

export interface DataMenuProps {
  visible: boolean;
  data: any;
  type: "estado" | "municipio" | "uniao";
  onHide: () => void;
  onSelectMunicipioFromList?: (cod_ibge: string) => void;
  onSelectEstadoFromList?: (estado: listaEstados) => void;
}

const DataMenu = ({
  visible: _visible,
  data,
  type,
  onHide,
  onSelectMunicipioFromList,
  onSelectEstadoFromList,
}: DataMenuProps) => {
  if (!data) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Nenhum dado selecionado
      </div>
    );
  }

  const { data: estadoViaMunicipio } = useEstadoByMunicipio(
    type === "municipio" ? data?.cod_ibge ?? "" : ""
  );

  const codigoUf = useMemo(() => {
    if (type === "estado") return data?.codigo_uf ?? data?.co_uf ?? "";
    if (type === "municipio") return estadoViaMunicipio?.co_uf ?? "";
    return "";
  }, [type, data, estadoViaMunicipio]);

  const [anoSelecionado, setAnoSelecionado] = useState("2024");

  const anoConsultaUniao = useMemo(() => {
    const anoNumero = Number(anoSelecionado);
    if (!Number.isFinite(anoNumero)) return anoSelecionado;
    return anoNumero < UNIAO_MIN_YEAR ? String(UNIAO_MIN_YEAR) : anoSelecionado;
  }, [anoSelecionado]);

  const uniaoInfo = useMemo(
    () => ({ co_uf: "76", no_uf: "Brasil", sg_uf: "BR" }),
    []
  );

  const { data: estado, isLoading: estadoLoading } = useEstadoByCodUf(codigoUf);
  const { data: municipio, isLoading: municipioLoading } = useMunicipioByCod(
    type === "municipio" ? data?.cod_ibge ?? "" : ""
  );

  const { data: popEstado, isLoading: popEstadoLoading } =
    usePopulacaoEstadoPorAno(codigoUf, anoSelecionado);

  const { data: popMunicipio, isLoading: popMunicipioLoading } =
    usePopulacaoMunicipioPorAno(
      type === "municipio" ? data?.cod_ibge ?? "" : "",
      anoSelecionado
    );

  const { data: popUniao, isLoading: popUniaoLoading } =
    usePopulacaoUniaoPorAno(anoConsultaUniao);

  const popUniaoValue = popUniao?.populacao ?? null;
  const ultimaPopulacaoEstado = popEstado?.populacao ?? null;
  const ultimaPopulacaoMunicipio = popMunicipio?.populacao ?? null;

  const painelInicial: Exclude<Painel, null> =
    type === "municipio" ? "municipio" : type === "estado" ? "estado" : "uniao";
  const [painelExpandido, setPainelExpandido] = useState<Painel>(painelInicial);

  useEffect(() => {
    if (type === "municipio") {
      setPainelExpandido("municipio");
    } else if (type === "estado") {
      setPainelExpandido("estado");
    } else {
      setPainelExpandido("uniao");
    }
  }, [type, data?.cod_ibge, codigoUf]);

  const alternarPainel = (painel: Exclude<Painel, null>) => {
    setPainelExpandido((prev) => (prev === painel ? null : painel));
  };

  const handleSelectMunicipio = (cod_ibge: string) => {
    setPainelExpandido("municipio");
    onSelectMunicipioFromList?.(cod_ibge);
  };

  const handleSelectEstado = (estadoSelecionado: listaEstados) => {
    setPainelExpandido("estado");
    onSelectEstadoFromList?.(estadoSelecionado);
  };

  if (estadoLoading || (type === "municipio" && municipioLoading)) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Carregando dados...
      </div>
    );
  }

  return (

    <div className="relative flex h-full flex-col overflow-y-auto p-4">

      {/* Cabeçalho estilizado */}
      <div className="mx-2 mb-6 flex items-center justify-between rounded-[28px] bg-gradient-to-r from-emerald-600/90 via-emerald-500 to-emerald-400 p-5 shadow-lg">
        <div className="space-y-1 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide/relaxed opacity-80">
            Painel de dados
          </p>
          <h3 className="text-2xl font-bold leading-tight">Selecione o ano</h3>
        </div>
        <div className="flex items-center gap-4">
          <DropDownAnos
            value={anoSelecionado}
            onChange={(ano) => setAnoSelecionado(ano)}
            className="rounded-2xl border border-white/50 bg-white/15 text-white shadow-inner outline-none transition hover:bg-white/25"
          />
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-text !h-12 !w-12 !rounded-2xl !bg-white/15 !text-white !shadow-sm hover:!bg-white/30"
            onClick={onHide}
            aria-label="Fechar"
          />
        </div>
      </div>

      {/* Painel Uniao */}
      <div className="mb-3 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          className="flex cursor-pointer select-none items-center justify-between px-4 py-3 hover:bg-gray-50 hover:rounded-2xl"
          onClick={() => alternarPainel("uniao")}
        >
          <h2 className="text-lg font-bold text-gray-800">Uniao</h2>
          <i
            className={`pi ${painelExpandido === "uniao" ? "pi-chevron-up" : "pi-chevron-down"
              } text-gray-600`}
          />
        </div>

        {painelExpandido === "uniao" && (
          <div className=" px-4 py-3">
            <MenuEntidade
              type="uniao"
              data={uniaoInfo}
              popValue={popUniaoValue}
              popLoading={popUniaoLoading}
              anoSelecionado={anoSelecionado}
              anoConsulta={anoConsultaUniao}
              minAnoDisponivel={UNIAO_MIN_YEAR}
              onSelectEstadoFromList={handleSelectEstado}
            />
          </div>
        )}
      </div>

      {/* Painel Estado */}
      {type !== "uniao" && (
        <div className="mb-3 rounded-2xl border border-gray-200 bg-white shadow-sm ">
          <div
            className="flex cursor-pointer select-none items-center justify-between px-4 py-3 hover:bg-gray-50 hover:rounded-2xl"
            onClick={() => alternarPainel("estado")}
          >
            <h2 className="text-lg font-bold text-gray-800">Estado</h2>
            <i
              className={`pi ${painelExpandido === "estado" ? "pi-chevron-up" : "pi-chevron-down"
                } text-gray-600`}
            />
          </div>

          {painelExpandido === "estado" && (
            <div className=" px-4 py-3">
              <MenuEntidade
                type="estado"
                data={estado}
                popValue={ultimaPopulacaoEstado}
                popLoading={popEstadoLoading}
                anoSelecionado={anoSelecionado}
                anoConsulta={anoSelecionado}
                municipioSelecionado={municipio?.no_municipio}
                onSelectMunicipioFromList={handleSelectMunicipio}
              />
            </div>
          )}
        </div>
      )}

      {/* Painel Municipio */}
      {type === "municipio" && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div
            className="flex cursor-pointer select-none items-center justify-between px-4 py-3 hover:bg-gray-50 hover:rounded-2xl"
            onClick={() => alternarPainel("municipio")}
          >
            <h2 className="text-lg font-bold text-gray-800">Municipio</h2>
            <i
                className={`pi ${painelExpandido === "municipio" ? "pi-chevron-up" : "pi-chevron-down"
                } text-gray-600`}
            />
          </div>

          {painelExpandido === "municipio" && (
            <div className="px-4 py-3">
              <MenuEntidade
                type="municipio"
                data={municipio}
                popValue={ultimaPopulacaoMunicipio}
                popLoading={popMunicipioLoading}
                anoSelecionado={anoSelecionado}
                anoConsulta={anoSelecionado}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataMenu;