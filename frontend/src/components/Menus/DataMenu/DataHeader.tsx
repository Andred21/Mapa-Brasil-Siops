import { Button } from "primereact/button";
import DropDownAnos from "@/components/Inputs/DropDownAnos";

interface DataMenuHeaderProps {
  anoSelecionado: string;
  onChangeAno: (ano: string) => void;
  onClose: () => void;
}

export default function DataMenuHeader({
  anoSelecionado,
  onChangeAno,
  onClose,
}: DataMenuHeaderProps) {
    
  return (
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
          onChange={onChangeAno}
          className="rounded-2xl border border-white/50 bg-white/15 text-white shadow-inner outline-none transition hover:bg-white/25"
        />

        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text !h-12 !w-12 !rounded-2xl !bg-white/15 !text-white !shadow-sm hover:!bg-white/30"
          onClick={onClose}
          aria-label="Fechar"
        />
      </div>
    </div>
  );
}
