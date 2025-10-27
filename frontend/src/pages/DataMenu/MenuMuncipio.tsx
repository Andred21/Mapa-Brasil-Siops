import React from "react";
import PopoverGraficoPopulacional from "@/components/graficos/Populacao/PopoverGraficoCrescimento";
import MenuPanel from "@/components/InfoPanel/MenuPanel";
import {
  useCrescimentoPopulacaoMunicipal,
  useIndicadoresPopulacaoMunicipal,
} from "@/hook/api/usePopulacao";

interface MenuMunicipioProps {
  municipio: any;
  popMunicipio: string | null;
  popLoading: boolean;
  anoSelecionado?: string;
}

/** Forma esperada do objeto de crescimento/indicadores que vem do backend */
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

/** Type guard: confirma se um valor “parece” o objeto de crescimento */
function isCrescimentoShape(x: unknown): x is CrescimentoShape {
  return !!x && typeof x === "object" && (
    "crescimento_percentual" in (x as any) ||
    "pop_final" in (x as any) ||
    "pop_inicial" in (x as any)
  );
}

/** Normaliza retorno do hook (pode vir array ou objeto) para um único objeto válido */
function normalizeCrescimento(data: unknown): CrescimentoShape | null {
  if (!data) return null;
  const obj = Array.isArray(data) ? data[data.length - 1] : data;
  return isCrescimentoShape(obj) ? obj : null;
}

const MenuMunicipio: React.FC<MenuMunicipioProps> = ({
  municipio,
  popMunicipio,
  popLoading,
  anoSelecionado = "2024",
}) => {
  const { data: crescimentoData, isLoading: loadingCrescimento } =
    useCrescimentoPopulacaoMunicipal(
      municipio?.co_municipio,
      "2010",
      anoSelecionado
    );

  const { data: indicadores, isLoading: loadingIndicadores } =
    useIndicadoresPopulacaoMunicipal(
      municipio?.co_municipio,
      "2010",
      anoSelecionado
    );

  // 🔒 Tipagem segura sem mudar hooks:
  const crescimento = normalizeCrescimento(crescimentoData);

  const crescimentoPercentual =
    typeof crescimento?.crescimento_percentual === "number"
      ? crescimento.crescimento_percentual.toFixed(2)
      : null;

  if (popLoading || loadingCrescimento || loadingIndicadores) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Carregando dados...
      </div>
    );
  }

  if (!municipio) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1 ml-2">
        {municipio?.no_municipio}
      </h3>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-md text-gray-700 ml-2">
            <strong>População estimada: </strong>
            <i>
              {!popLoading && popMunicipio
                ? Number(popMunicipio).toLocaleString("pt-BR")
                : "Não disponível"}
            </i>
          </p>

          {!popLoading && popMunicipio && (
            <PopoverGraficoPopulacional
              codigo={municipio?.co_municipio}
              tipo="municipio"
              sigla={municipio?.no_municipio}
            />
          )}
        </div>

        <div className="ml-2">
          <span className="text-sm font-bold text-gray-600">Código IBGE:</span>
          <i className="text-sm text-gray-800 font-italic ml-2">
            {municipio?.co_municipio}
          </i>
        </div>
      </div>

      <div className="mt-4">
        <MenuPanel
          title="Indicadores Municipais"
          type="municipio"
          ano={Number(anoSelecionado)}
          data={{
            codigo: municipio?.co_municipio,
            nome: municipio?.no_municipio,
            crescimentoPercentual,
            receita: (indicadores as any)?.receita_per_capita,
            saude: (indicadores as any)?.investimento_saude_percentual,
          }}
        />
      </div>
    </div>
  );
};

export default MenuMunicipio;
