import React from "react";
import { Tooltip } from "primereact/tooltip";
import { FaCircleInfo } from "react-icons/fa6";

interface InfoToolTipProps {
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  size?: string;
}

const InfoToolTip: React.FC<InfoToolTipProps> = ({
  message,
  position = "right",
  size = "1.1rem",
}) => {
  const uniqueClass = React.useMemo(
    () => `tooltip-${Math.random().toString(36).substring(2, 8)}`,
    []
  );

  return (
    <>
      {/* Tooltip customizado */}
      <Tooltip
        target={`.${uniqueClass}`}
        content={message}
        position={position}
        className="!bg-gray-00 !text-white !px-3 !py-2 !rounded-md !text-sm"
        showDelay={200}
        hideDelay={100}
      />

      {/* Ícone com fundo azul-claro */}
      <div
        className={`${uniqueClass} flex items-center justify-center w-4 h-6 rounded-full text-esmerald-600  transition-colors`}
        style={{
          cursor: "pointer",
        }}
      >
        <FaCircleInfo style={{ fontSize: size }} />
      </div>
    </>
  );
};

export default InfoToolTip;
