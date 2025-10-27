import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "primereact/button";
import TableMunicipios from "@/components/TableMunicipios";
import PopoverGraficoPopulacional from "@/components/graficos/Populacao/PopoverGraficoCrescimento";
import MenuPanel from "@/components/InfoPanel/MenuPanel";
import { useMenuEstado } from "@/hook";
import {
  useCrescimentoPopulacaoEstadual,
  useIndicadoresPopulacaoEstadual,
} from "@/hook/api/usePopulacao";

/** Tipagem genérica para o retorno de crescimento populacional */
type CrescimentoShape = {
  ano_inicio?: number;
  ano_final?: number;
  crescimento_absoluto?: number;
  crescimento_percentual?: number;
  crescimento_medio_anual?: number;
  pop_inicial?: string | number;
  pop_final?: string | number;
  pop_max?: string | number;
  pop_min?: string | number;
  tendencia?: string;
};

/** Type guard para garantir que o objeto possui as chaves esperadas */
function isCrescimentoShape(x: unknown): x is CrescimentoShape {
  return !!x && typeof x === "object" && "crescimento_percentual" in (x as any);
}

/** Normaliza retorno do hook (array ou objeto) */
function normalizeCrescimento(data: unknown): CrescimentoShape | null {
  if (!data) return null;
  const obj = Array.isArray(data) ? data[data.length - 1] : data;
  return isCrescimentoShape(obj) ? obj : null;
}

interface MenuEstadoProps {
  estado: any;
  popEstado: string | null;
  popLoading: boolean;
  anoSelecionado: string;
  onSelectMunicipioFromList?: (cod_ibge: string) => void;
  municipioSelecionado?: string | null;
  municipioSelecionadoExterno?: any;
  onReabrirTabela?: () => void;
  totalMunicipios?: number;
}

const MenuEstado: React.FC<MenuEstadoProps> = ({
  estado,
  popEstado,
  popLoading,
  anoSelecionado,
  onSelectMunicipioFromList,
  municipioSelecionado,
  municipioSelecionadoExterno,
  onReabrirTabela,
  totalMunicipios,
}) => {
  const {
    listaAberta,
    setListaAberta,
    loadingCrescimento: loadingHookCrescimento,
    loadingIndicadores: loadingHookIndicadores,
  } = useMenuEstado({ estado, municipioSelecionadoExterno });

  // 🔹 Hooks diretos para dados populacionais reais
  const { data: crescimentoData, isLoading: loadingCrescimento } =
    useCrescimentoPopulacaoEstadual(
      estado?.co_uf,
      "2010",
      anoSelecionado
    );

  const { data: indicadores, isLoading: loadingIndicadores } =
    useIndicadoresPopulacaoEstadual(
      estado?.co_uf,
      "2010",
      anoSelecionado
    );

  // ✅ Normaliza retorno de crescimento
  const crescimento = normalizeCrescimento(crescimentoData);

  const crescimentoPercentual =
    typeof crescimento?.crescimento_percentual === "number"
      ? crescimento.crescimento_percentual.toFixed(2)
      : null;

  const handleSelect = (cod_ibge: string) => {
    setListaAberta(false);
    onSelectMunicipioFromList?.(cod_ibge);
  };

  const handleReabrir = () => {
    setListaAberta(true);
    onReabrirTabela?.();
  };

  if (
    popLoading ||
    loadingCrescimento ||
    loadingIndicadores ||
    loadingHookCrescimento ||
    loadingHookIndicadores
  ) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="mb-3">
      {/* ======= Cabeçalho ======= */}
      <div className="flex gap-2 items-center ml-2">
        <h3 className="text-2xl font-semibold text-gray-900">{estado?.no_uf}</h3>
        <span className="text-lg font-semibold text-gray-700">
          ({estado?.sg_uf})
        </span>
      </div>

      {/* ======= População + Gráfico ======= */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-md text-gray-700 mt-1 ml-2">
            <strong>População estimada: </strong>
            <i>
              {!popLoading && popEstado
                ? Number(popEstado).toLocaleString("pt-BR")
                : "Não disponível"}
            </i>
          </p>

          {!popLoading && popEstado && (
            <PopoverGraficoPopulacional
              codigo={estado?.co_uf}
              tipo="estado"
              sigla={estado?.sg_uf}
            />
          )}
        </div>

        <div className="ml-2">
          <span className="text-sm font-bold text-gray-600">
            Código IBGE:
          </span>
          <i className="text-sm text-gray-800 font-italic ml-2">
            {estado?.co_uf}
          </i>
        </div>
      </div>

      {/* ======= Lista de municípios ======= */}
      <div className="flex items-center justify-between mt-4 border-t pt-3">
        <h4 className="text-lg font-semibold text-gray-800">
          {!listaAberta && municipioSelecionado ? (
            <span className="text-gray-600 font-normal ml-1">
              ({municipioSelecionado})
            </span>
          ) : totalMunicipios ? (
            <span className="text-gray-600 font-normal ml-1">
              ({totalMunicipios})
            </span>
          ) : null}
        </h4>

        {!listaAberta && (
          <Button
            label="Escolher Município"
            size="large"
            className="!py-2 !px-3 !text-sm !rounded-md !bg-emerald-700 hover:!bg-emerald-600 !text-white !border-none transition"
            onClick={handleReabrir}
          />
        )}
      </div>

      {/* ======= Tabela de Municípios ======= */}
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
            <TableMunicipios
              codigoUf={(estado as any)?.codigo_uf || (estado as any)?.co_uf}
              onSelectMunicipio={(mun) => handleSelect(mun?.co_municipio ?? "")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======= Indicadores ======= */}
      <div className="mt-4">
        <MenuPanel
          title="Indicadores Estaduais"
          type="estado"
          ano={Number(anoSelecionado)}
          data={{
            codigo: estado?.co_uf,
            nome: estado?.no_uf,
            crescimentoPercentual,
            receita: (indicadores as any)?.receita_per_capita,
            saude: (indicadores as any)?.investimento_saude_percentual,
          }}
        />
      </div>
    </div>
  );
};

export default MenuEstado;
