import { Button } from "primereact/button";
import {
  PiMapTrifoldDuotone,
  PiMagnifyingGlassDuotone,
  PiInfoDuotone,
} from "react-icons/pi";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import { useState } from "react";

export default function NavBar() {
  const [selected, setSelected] = useState<string>("Mapa");

  const navItems = [
    { label: "Mapa", icon: <PiMapTrifoldDuotone size={23} /> },
    { label: "Pesquisar", icon: <PiMagnifyingGlassDuotone size={23} /> },
    { label: "Sobre", icon: <PiInfoDuotone size={23} /> },
  ];

  return (
    <div className="bg-white/70 shadow-sm z-50 backdrop-blur-md fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between px-10 h-20 max-w-screen mx-auto">
        {/* ===== Esquerda: Logo ===== */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-emerald-700 transition-colors duration-200">
          <Logo />
        </div>

        {/* ===== Centro: Botões de navegação ===== */}
        <div className="flex items-center gap-10 font-medium text-lg">
          {navItems.map((item) => {
            const isActive = selected === item.label;
            return (
              <Button
                key={item.label}
                label={item.label}
                icon={item.icon}
                text
                onClick={() => setSelected(item.label)}
                className={` flex items-center gap-2 !bg-transparent !border-b-2 
                           ${isActive ? "!border-emerald-700" : "!border-transparent"} 
                           ${isActive ? "!text-emerald-700" : "!text-gray-800"} 
                           hover:!text-emerald-700 hover:!border-emerald-700 rounded-2xl focus:!shadow-none focus:!outline-none focus:!ring-0 active:!shadow-none active:!outline-none active:!ring-0  transition-all duration-200`}
              />

            );
          })}
        </div>

        {/* ===== Direita: Menu Hamburguer ===== */}
        <div className="justify-end">
          <Button
            text
            className="!text-gray-800 hover:!text-emerald-700 !bg-transparent !border-b-2   hover:!border-emerald-700 rounded-2xl focus:!shadow-none focus:!outline-none focus:!ring-0 active:!shadow-none active:!outline-none active:!ring-0  transition-all duration-200"
          >
            <FiMenu className="text-2xl" size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}
