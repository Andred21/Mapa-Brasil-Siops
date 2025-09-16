
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


// Estados

export const onEachEstado = (

    feature: any,
    layer: L.Layer,
    selectedUf: UF | null,
    setSelectedUF: (uf: UF | null) => void,
    setHover: (name: string | null) => void

) => {

    const props = feature?.properties || {};
    const sigla = props.sigla || props.SIGLA || props.uf || props.UF || "";
    const nome = props.nome || props.NOME || props.name || sigla;
    const code = Number(props.codigo_uf || props.code || props.cod || UF_CODE[sigla] || 0);

    layer.on({
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
        },
        click: () => setSelectedUF({ sigla, nome, codigo_uf: code }),
    });

};

export const styleEstado = (feature: any, selectedUf: UF | null): PathOptions => {
    const props = feature?.properties || {};
    const sigla = props.sigla || props.SIGLA || props.uf || props.UF || "";
    return selectedUf?.sigla === sigla ? stEstadoSel : stEstado;
}

// Municípios

export const onEachMun = (
    feature: any,
    layer: L.Layer,
    munSelId: string | number | null,
    setMunSelId: (id: string | number | null) => void,
    setHover: (name: string | null) => void,
    setMunSelName: (name: string | null) => void,
) => {
    const props = feature?.properties || {};
    const nome = props.name || props.nome || props.NOME || "";
    const id = props.id || props.cod_ibge || props.codigo_ibge || props.code || nome;
    
    layer.on({
        mouseover: (e: LeafletMouseEvent) => {
            if (munSelId !== id) {
                (e.target as L.Path).setStyle(stMunHover);
            }
            setHover(nome);
        },
        mouseout: (e: LeafletMouseEvent) => {
            (e.target as L.Path).setStyle(munSelId === id ? stMunSel : stMun);
            setHover(null);
        },
        click: (e: LeafletMouseEvent) => {
            setMunSelId(id);
            setMunSelName(nome);
            (e.target as L.Path).setStyle(stMunSel);
        },
    });
};


export const styleMun = (feature: any, munSelId: string | number | null): PathOptions => {
    const id = feature?.properties?.id || feature?.properties?.cod_ibge;
    return munSelId === id ? stMunSel : stMun;
};
