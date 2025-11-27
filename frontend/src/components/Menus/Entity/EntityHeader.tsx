import PopoverGraficoPopulacional from "@/components/graficos/Populacao/PopoverGraficoCrescimento";

interface EntityHeaderProps {
  nome: string;
  sigla?: string;
  codigo: string;
  popValue: string | number | null;
  popLoading: boolean;
  tipo: "estado" | "municipio" | "uniao";
  anoMax: number;
  mostrarAvisoAno?: boolean;
  anoAviso?: string;
}

export default function EntityHeader({
  nome,
  sigla,
  codigo,
  popValue,
  popLoading,
  tipo,
  anoMax,
  mostrarAvisoAno,
  anoAviso
}: EntityHeaderProps) {

  return (
    
    <div className="mb-2">
        
      {/* Nome + Sigla */}
      <div className="ml-2 flex items-center gap-2">

        <h3 className="text-2xl font-semibold text-gray-900">{nome}</h3>

        {sigla && <span className="text-lg font-semibold text-gray-700">({sigla})</span>}

      </div>

      {/* População + IBGE */}
      <div className="flex items-center justify-between">

        <div className="ml-2 mt-1 flex items-center gap-1">

          <p className="text-md text-gray-700">

            <strong>População estimada: </strong>

            <i>
              {!popLoading && popValue
                ? Number(popValue).toLocaleString("pt-BR")
                : "Não disponível"}
            </i>
            
          </p>

          {!popLoading && popValue && (
            <PopoverGraficoPopulacional
              codigo={codigo}
              tipo={tipo}
              sigla={sigla}
              anoMax={anoMax}
            />
          )}
        </div>

        <div className="ml-2">
          <span className="text-sm font-bold text-gray-600">Código IBGE:</span>
          <i className="ml-2 text-sm italic text-gray-800">{codigo}</i>
        </div>
      </div>

      {mostrarAvisoAno && (
        <div className="ml-2 mt-2 text-xs font-medium text-amber-600">
          Dados disponíveis a partir de {anoAviso}.
        </div>
      )}
    </div>
  );
}
