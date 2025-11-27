import L from "leaflet";
import {
    stEstado,
    stEstadoSel,
    stEstadoHover,
    stMun,
    stMunHover,
    stMunSel,
    type UF,
    UF_CODE
} from ".";
import type { LeafletMouseEvent, PathOptions } from "leaflet";

// ===========================
// TOOLTIP
// ===========================
let tooltipDiv: HTMLDivElement | null = null;

const ensureTooltip = () => {
    if (!tooltipDiv) {
        tooltipDiv = document.createElement("div");
        tooltipDiv.style.position = "fixed";
        tooltipDiv.style.pointerEvents = "none";
        tooltipDiv.style.zIndex = "999999";
        tooltipDiv.style.padding = "4px 8px";
        tooltipDiv.style.background = "rgba(0,0,0,0.7)";
        tooltipDiv.style.color = "white";
        tooltipDiv.style.borderRadius = "4px";
        tooltipDiv.style.fontSize = "12px";
        tooltipDiv.style.whiteSpace = "nowrap";
        tooltipDiv.style.transition = "opacity 120ms";
        tooltipDiv.style.opacity = "0";

        document.body.appendChild(tooltipDiv);
    }
};

const showTooltip = (text: string, e: LeafletMouseEvent) => {
    ensureTooltip();
    if (!tooltipDiv) return;

    tooltipDiv.innerText = text;
    tooltipDiv.style.left = e.originalEvent.clientX + 12 + "px";
    tooltipDiv.style.top = e.originalEvent.clientY + 12 + "px";
    tooltipDiv.style.opacity = "1";
};

const hideTooltip = () => {
    if (tooltipDiv) tooltipDiv.style.opacity = "0";
};

/**
 * ============================
 * Handlers para ESTADOS
 * ============================
 */
export const onEachEstado = (
    feature: any,
    layer: L.Layer,
    selectedUf: UF | null,
    setSelectedUF: (uf: UF | null) => void,
    setHover: (name: string | null) => void,
    setSideInfo: (info: { type: 'estado' | 'municipio'; data: any } | null) => void
) => {
    const props = feature?.properties || {};
    const sigla = props.sigla || props.SIGLA || props.uf || props.UF || "";
    const nome = props.nome || props.NOME || props.name || sigla;
    const code = Number(props.codigo_uf || props.code || props.cod || UF_CODE[sigla] || 0);

    layer.on({
        mousemove: (e: LeafletMouseEvent) => {
            showTooltip(nome, e);
        },

        mouseover: (e: LeafletMouseEvent) => {
            if (selectedUf?.sigla !== sigla) {
                (e.target as L.Path).setStyle(stEstadoHover);
            }
            setHover(nome);
        },

        mouseout: (e: LeafletMouseEvent) => {
            (e.target as L.Path).setStyle(
                selectedUf?.sigla === sigla ? stEstadoSel : stEstado
            );
            setHover(null);
            hideTooltip();
        },

        click: async () => {
            const ufData: UF = { sigla, nome, codigo_uf: code };
            setSelectedUF(ufData);

            try {
                setSideInfo({
                    type: "estado",
                    data: { codigo_uf: code }
                });
            } catch (err) {
                console.error("Erro ao buscar dados do estado:", err);
                setSideInfo({
                    type: "estado",
                    data: {
                        nome,
                        sigla,
                        codigo_uf: code,
                        erro: "Erro ao carregar informações"
                    }
                });
            }
        }
    });
};

export const styleEstado = (feature: any, selectedUf: UF | null): PathOptions => {
    const props = feature?.properties || {};
    const sigla = props.sigla || props.SIGLA || props.uf || props.UF || "";
    return selectedUf?.sigla === sigla ? stEstadoSel : stEstado;
};

/**
 * ============================
 * Handlers para MUNICÍPIOS
 * ============================
 */
export const onEachMun = (
    feature: any,
    layer: L.Layer,
    munSelId: string | number | null,
    setMunSelId: (id: string | number | null) => void,
    setHover: (name: string | null) => void,
    setMunSelName: (name: string | null) => void,
    setSideInfo: (info: { type: 'estado' | 'municipio'; data: any } | null) => void
) => {
    const props = feature?.properties || {};
    const nome = props.name || props.nome || props.NOME || "";
    const uf = props.uf || props.UF || props.sigla_uf || props.SIGLA || "";
    const label = uf ? `${nome} (${uf})` : nome;

    const id =
        props.id ||
        props.cod_ibge ||
        props.codigo_ibge ||
        props.code ||
        nome;

    const codMunicipio = String(id);

    layer.on({
        mousemove: (e: LeafletMouseEvent) => {
            showTooltip(label, e);
        },

        mouseover: (e: LeafletMouseEvent) => {
            if (munSelId !== id) {
                (e.target as L.Path).setStyle(stMunHover);
            }
            setHover(nome);
        },

        mouseout: (e: LeafletMouseEvent) => {
            (e.target as L.Path).setStyle(
                munSelId === id ? stMunSel : stMun
            );
            setHover(null);
            hideTooltip();
        },

        click: async (e: LeafletMouseEvent) => {
            setMunSelId(id);
            setMunSelName(nome);
            (e.target as L.Path).setStyle(stMunSel);

            try {
                setSideInfo({
                    type: "municipio",
                    data: {
                        cod_ibge: codMunicipio
                    }
                });
            } catch (err) {
                console.error("Erro ao buscar dados do município:", err);
                setSideInfo({
                    type: "municipio",
                    data: {
                        cod_ibge: codMunicipio
                    }
                });
            }
        }
    });
};

export const styleMun = (feature: any, munSelId: string | number | null): PathOptions => {
    const id = feature?.properties?.id || feature?.properties?.cod_ibge;
    return munSelId === id ? stMunSel : stMun;
};
