import { useMemo, useState } from "react";
import { Button } from "primereact/button";
import InputIc from "@/components/Inputs/InputIc";
import { useEstados, useMunicipios } from "@/hook/api/useEntes";

export type SearchSelection =
  | {
    type: "estado";
    codigo_uf: string;
    nome: string;
    sigla: string;
  }
  | {
    type: "municipio";
    cod_ibge: string;
    nome: string;
    codigo_uf: string;
    sigla: string;
    ufNome?: string;
  };

interface SearchProps {
  onSelect: (selection: SearchSelection) => void;
}

type FilterOption = "municipio" | "estado";

const FILTER_LABELS: Record<FilterOption, string> = {
  municipio: "Municipio",
  estado: "Estado",
};

const MAX_RESULTS = 25;

export default function Search({ onSelect }: SearchProps) {
  const [filterOption, setFilterOption] = useState<FilterOption>("municipio");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: municipios = [], isLoading: loadingMunicipios } = useMunicipios();
  const { data: estados = [], isLoading: loadingEstados } = useEstados();

  const estadosPorId = useMemo(() => {
    return estados.reduce<Record<number, typeof estados[number]>>((acc, estado) => {
      acc[estado.id] = estado;
      return acc;
    }, {});
  }, [estados]);

  const filteredMunicipios = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return municipios.slice(0, MAX_RESULTS);
    }
    return municipios
      .filter((municipio) => {
        const nome = municipio.no_municipio.toLowerCase();
        const codigo = municipio.co_municipio.toLowerCase();
        return nome.includes(term) || codigo.startsWith(term);
      })
      .slice(0, MAX_RESULTS);
  }, [municipios, searchTerm]);

  const filteredEstados = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return estados.slice(0, MAX_RESULTS);
    }
    return estados
      .filter((estado) => {
        const nome = estado.no_uf.toLowerCase();
        const sigla = estado.sg_uf.toLowerCase();
        const codigo = estado.co_uf.toLowerCase();
        return (
          nome.includes(term) ||
          sigla.startsWith(term) ||
          codigo.startsWith(term)
        );
      })
      .slice(0, MAX_RESULTS);
  }, [estados, searchTerm]);

  const isLoading =
    filterOption === "municipio" ? loadingMunicipios || loadingEstados : loadingEstados;

  const noResults =
    filterOption === "municipio"
      ? !isLoading && filteredMunicipios.length === 0
      : !isLoading && filteredEstados.length === 0;

  const handleSelectMunicipio = (municipio: typeof municipios[number]) => {
    const estado = estadosPorId[municipio.estado_id];
    onSelect({
      type: "municipio",
      cod_ibge: municipio.co_municipio,
      nome: municipio.no_municipio,
      codigo_uf: estado?.co_uf ?? "",
      sigla: estado?.sg_uf ?? "",
      ufNome: estado?.no_uf,
    });
  };

  const handleSelectEstado = (estado: typeof estados[number]) => {
    onSelect({
      type: "estado",
      codigo_uf: estado.co_uf,
      nome: estado.no_uf,
      sigla: estado.sg_uf,
    });
  };

  const currentPlaceholder =
    filterOption === "municipio"
      ? "Busque pelo nome ou codigo IBGE do municipio..."
      : "Busque pelo nome, sigla ou codigo do estado...";

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-5 bg-white/80 p-4 sm:p-5">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Pesquisa de entes
        </p>
        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Localize rapidamente estados ou municipios e veja os detalhes no painel lateral.
        </h2>
      </header>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(FILTER_LABELS) as FilterOption[]).map((option) => {
          const isActive = option === filterOption;
          return (
            <Button
              key={option}
              label={FILTER_LABELS[option]}
              outlined={!isActive}
              className={`!rounded-full !px-4 !py-2 text-sm sm:text-base ${isActive ? "!bg-emerald-600 !text-white" : "!text-emerald-700"}`}
              onClick={() => setFilterOption(option)}
            />
          );
        })}
      </div>

      <InputIc
        holder={currentPlaceholder}
        icon="pi pi-search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 text-xs uppercase tracking-wide text-gray-500 sm:text-sm">
          <span className="font-semibold">Resultados</span>
          <span className="text-gray-400">
            {filterOption === "municipio"
              ? `${filteredMunicipios.length} municipios`
              : `${filteredEstados.length} estados`}
          </span>
        </div>

        {isLoading && (
          <div className="px-4 py-10 text-center text-sm text-gray-500">
            Carregando dados...
          </div>
        )}

        {noResults && (
          <div className="px-4 py-10 text-center text-sm text-gray-500">
            Nenhum resultado encontrado para &quot;{searchTerm}&quot;.
          </div>
        )}

        {!isLoading && !noResults && (
          <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto px-2 py-3 sm:px-3">
            {filterOption === "municipio"
              ? filteredMunicipios.map((municipio) => {
                const estado = estadosPorId[municipio.estado_id];
                return (
                  <li key={municipio.co_municipio}>
                    <button
                      type="button"
                      onClick={() => handleSelectMunicipio(municipio)}
                      className="w-full rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-left text-sm shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow sm:text-base"
                    >
                      <p className="font-medium text-gray-800">
                        {municipio.no_municipio}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Codigo IBGE: {municipio.co_municipio}
                      </p>
                      {estado && (
                        <p className="text-xs text-gray-400">
                          {estado.no_uf} - {estado.sg_uf}
                        </p>
                      )}
                    </button>
                  </li>
                );
              })
              : filteredEstados.map((estado) => (
                <li key={estado.co_uf}>
                  <button
                    type="button"
                    onClick={() => handleSelectEstado(estado)}
                    className="w-full rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-left text-sm shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow sm:text-base"
                  >
                    <p className="font-medium text-gray-800">
                      {estado.no_uf}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Sigla: {estado.sg_uf} - Codigo: {estado.co_uf}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
