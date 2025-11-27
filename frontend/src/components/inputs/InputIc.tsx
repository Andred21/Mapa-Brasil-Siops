import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

type InputIcProps = {
  icon?: string;
  holder?: string;
  size?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputIc({ icon, holder, size, value, onChange }: InputIcProps) {

  return (

    <div className="flex w-full">

      <IconField iconPosition="left" className="w-full">
        <InputIcon className={`${icon} !text-emerald-600`} style={{ fontSize: "18px" }} />
        <InputText
          value={value}
          onChange={onChange}
          placeholder={holder}
          className="w-full !rounded-xl border border-emerald-200 bg-white/90 py-3 pl-10 pr-4 text-gray-700 placeholder:text-gray-400 shadow-sm transition-all
           focus:!border-emerald-400 focus:!ring-2 focus:!ring-emerald-200 focus:outline-none hover:!border-emerald-600"
          size={size}
        />
      </IconField>

    </div>

  );
  
}
