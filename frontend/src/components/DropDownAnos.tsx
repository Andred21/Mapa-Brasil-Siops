import { Dropdown } from 'primereact/dropdown';
import { useAnosPeriodos } from '@/hook/api/useEntes';
import { useMemo } from 'react';

interface DropDownAnosProps {
  value: string;
  onChange: (ano: string) => void;
}

export default function DropDownAnos({ value, onChange }: DropDownAnosProps) {
  const { data, isLoading, isError } = useAnosPeriodos();

  // Filtra e pega apenas anos únicos a partir de 2013
  const anos = useMemo(() => {
    if (!data) return [];

    const anosUnicos = [...new Set(data.map((item) => Number(item.ano)))]
      .filter((ano) => ano >= 2013)
      .sort((a, b) => b - a);

    return anosUnicos.map((ano) => ({ label: ano.toString(), value: ano.toString() }));
  }, [data]);

  if (isLoading) return <p>Carregando anos...</p>;
  if (isError) return <p>Erro ao carregar anos.</p>;

  return (
    <div className="w-full">
      <Dropdown
        value={value}
        options={anos}
        onChange={(e) => onChange(e.value)}
        placeholder="Selecione o ano"
        className="w-full"
      />
    </div>
  );
}
