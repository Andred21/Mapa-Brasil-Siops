
import Logo from "./Logo";
import { Button } from "primereact/button";

{/* NavBar Principal, com a logo, botão para pesquisar e menu lateral */}
export default function NavBar() {

  return (

    <div className="bg-white/70 shadow-sm z-50 backdrop-blur-md ">

      <div className="flex items-center justify-between px-8 h-20 ">

        {/* Esquerda: Logo */}

        <Logo />


        {/* Centro: Botão Pesquisar */}
        <div className="flex-1 flex justify-center mr-10">
          
          <Button
            label="Pesquisar"
            icon="pi pi-search "
            severity="success"
            outlined
            size="large"
            className="w-40 !h-9  !mr-1 !font-normal !rounded-xl !border !border-gray-400
              focus:!outline-none focus:!border-green-400 focus:!ring-green-200 focus:!ring-1
              hover:!border-green-400 hover:ring-1 hover:ring-green-200
              !bg-gray-100 !text-gray-600 !transition !duration-150"
          />

        </div>

        {/* Direita: Menu hamburguer */}
        <div className="flex-shrink-0">

          <i className="pi pi-bars !text-2xl cursor-pointer text-gray-700 hover:text-green-600"></i>

        </div>

      </div>

    </div>

  );

}
