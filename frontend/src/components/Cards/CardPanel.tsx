  import React from "react";
  import InfoToolTip from "@/components/InfoToolTip";
  import { useCountUp } from "@/hook/components/useCountUp";




  interface CardPanelProps {
    title: string;
    value: string | number | null;
    tooltip?: string;
    width?: string;
    height?: string;
    size?: "sm" | "md" | "lg" | "xl";
    accentColor?: string;
  }

  const SIZE_MAP = {
    sm: {
      title: "text-xs",
      value: "text-sm",
      padding: "px-3",
      icon: 13,
    },
    md: {
      title: "text-sm",
      value: "text-base",
      padding: "px-4",
      icon: 16,
    },
    lg: {
      title: "text-base",
      value: "text-lg",
      padding: "px-5",
      icon: 18,
    },
    xl: {
      title: "text-2xl",
      value: "text-3xl",
      padding: "px-6",
      icon: 25,
    },
  };

  const CardPanel: React.FC<CardPanelProps> = ({
    title,
    value,
    tooltip,
    width = "w-64",
    height = "h-24",
    size = "md",
    accentColor = "",
  }) => {

    const styles = SIZE_MAP[size];

    // converte value (string/number) para number seguro
    const numericValue = Number(
      typeof value === "string"
        ? value.replace(/[^\d,-]/g, "").replace(",", ".")
        : value ?? 0
    );

    // animação
    const animated = useCountUp(numericValue, 1200); // 1.2s

    // formatador
    const formattedValue =
      value === null || value === undefined
        ? "—"
        : animated.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

    return (

      <div className={`${width} ${height} ${styles.padding} bg-white rounded-xl border border-gray-200 shadow-xl flex flex-col justify-start`}>

        {/* Título + Tooltip */}
        <div className="flex items-center justify-center my-3 gap-2">

          <span
            className={`font-bold text-center whitespace-nowrap ${styles.title} bg-gradient-to-r
            from-emerald-800/90 via-emerald-700 to-emerald-600 bg-clip-text text-transparent`}>
            {title}
          </span>

          {tooltip && (
            <InfoToolTip
              message={tooltip}
              position="top"
              size={styles.icon}
              iconClass=" text-emerald-500  "
            />
          )}

        </div>

        {/* Valor */}
          <div className={`mt-3 text-center text-gray-700 font-extrabold ${styles.value} ${accentColor}`}>
            {formattedValue}
          </div>

      </div>

    );

  };

  export default CardPanel;
