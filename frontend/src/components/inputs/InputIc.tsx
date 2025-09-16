import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

type inputIcProps = {
    icon?: string;
    holder?: string;
    size?: number;
}

{/* Componente de InputText com ícone */}
export default function InputIc({icon, holder, size}: inputIcProps) {

    return (

        <div className='flex'>

            <IconField iconPosition="left" >

                <InputIcon className={`${icon} !text-gray-700`} style={{ fontSize: "15px" }} />

                <InputText
                    placeholder={holder}
                    className="w-auto !h-7 !text-sm !rounded-2xl !border !border-gray-300 
                     focus:!border-green-500 focus:!ring-2 focus:!ring-green-200 !bg-gray-50 
                     !text-gray-700"
                    size={size}
                />

            </IconField>

        </div>

    );

}
