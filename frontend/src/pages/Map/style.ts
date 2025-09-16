import type { PathOptions } from "leaflet";


// Estados

export const stEstado: PathOptions = {
  weight: 1.25,
  color: "#2d3748",      // contorno
  fillColor: "#3b82f6",  // Cor do Preenchimento
  fillOpacity: 0.2,      // Opacidade
};

//Estado que foi selecionado pelo usuário

export const stEstadoSel: PathOptions = {
  ...stEstado,
  color: "#111827",
  fillOpacity: 0.25,     
};

//Estilo quando o mouse passa por cima do estado
export const stEstadoHover: PathOptions = {
  ...stEstado,
  color: "#1d4ed8",
  fillOpacity: 0.2,     
};

// Municípios

export const stMun: PathOptions = {
  weight: 0.6,
  color: "#6b7280",
  fillColor: "#f59e0b",
  fillOpacity: 0,    
};

//Estilo quando o mouse passa por cima do município
export const stMunHover: PathOptions = {
  ...stMun,
  color: "#111827",
  fillOpacity: 0.2,      
};  

//Município que foi selecionado pelo usuário
export const stMunSel: PathOptions = {
  ...stMun,
  color: "#111827",
  fillOpacity: 0.5,     
};