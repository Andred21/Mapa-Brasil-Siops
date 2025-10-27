import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import InfoToolTip from "@/components/InfoToolTip";

interface SmartAccordionTab {
  label: string;
  icon?: string;
  tooltip?: string;
  content: React.ReactNode;
}

interface SmartAccordionProps {
  tabs: SmartAccordionTab[];
  activeIndex?: number[];
  color?: "emerald" | "blue" | "red" | "gray";
  className?: string;
}


export default function AccordionTabela({
  tabs,
  activeIndex = [0],
  color = "emerald",
  className = "",
}: SmartAccordionProps) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-700 hover:!bg-emerald-50",
    blue: "text-blue-700 hover:!bg-blue-50",
    red: "text-red-700 hover:!bg-red-50",
    gray: "text-gray-700 hover:!bg-gray-50",
  };

  const textColor = colorMap[color];

  return (
    <Accordion
      multiple
      activeIndex={activeIndex}
      className={`border-t border-gray-200 rounded-lg shadow-sm bg-white ${className}`}
    >
      {tabs.map((tab, i) => (
        <AccordionTab
          key={i}
          header={
            <div className="flex items-center justify-between w-full ">
              <div className={`flex items-center gap-2 text-lg font-semibold hover:!bg-gray-50/10 ${textColor}`}>
                {tab.icon && <i className={`${tab.icon}`} />}
                <span>{tab.label}</span>
                {tab.tooltip && <InfoToolTip message={tab.tooltip} position="right" />}
              </div>
            </div>
          }
          pt={{ headerIcon: { className: `${textColor.split(" ")[0]} order-1` } }}
          headerClassName={`!font-semibold ${textColor}`}
          className={textColor}
        >
          <div className="p-4 text-gray-700 leading-relaxed">{tab.content}</div>
        </AccordionTab>
      ))}
    </Accordion>
  );
}
