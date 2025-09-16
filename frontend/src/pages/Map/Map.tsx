import { useEffect, useState, useMemo, useRef, } from "react";
import type { GeoJSON as GeoJSONType } from "geojson";
import {
    BR_BOUNDS,
    onEachEstado,
    styleEstado,
    onEachMun,
    type UF,
    styleMun
} from ".";

import FitToLayer from "@/hook/map/FitToLayer";
import ResetZoom from "@/hook/map/ResetZoom";

import { Button } from "primereact/button";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";

export default function Map() {

    const [estadoGeo, setEstadoGeo] = useState<GeoJSONType | null>(null);
    const [selectedUF, setSelectedUF] = useState<UF | null>(null);
    const [municipiosGeo, setMunicipiosGeo] = useState<GeoJSONType | null>(null);

    const [hover, setHover] = useState<string | null>(null);
    const [munSelName, setMunSelName] = useState<string | null>(null);
    const [munSelId, setMunSelId] = useState<string | number | null>(null);

    const refEstados = useRef<L.GeoJSON<any> | null>(null);
    const refMun = useRef<L.GeoJSON<any> | null>(null);

    // Carrega os Estados
    useEffect(() => {
        fetch("/data/estados.geojson").then(r => r.json()).then(setEstadoGeo);
    }, []);

    // Ao escolher a UF, carrega os Municípios dessa UF
    useEffect(() => {
        setMunicipiosGeo(null);
        setMunSelId(null);
        if (!selectedUF) return;
        fetch(`/data/municipios/geojs-${selectedUF.codigo_uf}-mun.json`)
            .then(r => r.json())
            .then(setMunicipiosGeo);
    }, [selectedUF]);

    const mapProps = useMemo(() => ({
        style: { height: "100vh", width: "100%" },
        bounds: BR_BOUNDS as any,
        maxBounds: BR_BOUNDS as any,

               // zoom inicial (ajuste conforme o gosto)
        maxBoundsViscosity: 1.0,
        minZoom: 4.4,
        maxZoom: 8,
        preferCanvas: true,
        scrollWheelZoom: false,

    }), []);

    const clearStats = () => {
        setSelectedUF(null);
        setMunicipiosGeo(null);
        setMunSelId(null);
        setMunSelName(null);
    }

    return (
        <div className="w-full h-screen">

            {/* Painel de Info */}
            <div className="absolute z-[1000] m-2 rounded bg-white/80 p-2 text-sm shadow">

                <div>
                    <b>UF:</b>
                    {selectedUF ? `${selectedUF.nome} (${selectedUF.sigla})` : "-"}
                </div>
            <div>
                <b>Hover:</b> {hover}
            </div>

                {munSelName && <div><b>Municipio Selecionado:</b> {munSelName}</div>}

                {munSelId && <div><b>Município ID:</b> {munSelId}</div>}

                <Button
                    label="Limpar Seleção"
                    icon="pi pi-refresh"
                    type="submit"
                    className="!h-8 !border-gray-500 !text-gray-600"
                    onClick={() => { clearStats() }}
                />
            </div>

            {/* Mapa */}
            <MapContainer {...mapProps} zoomControl={false}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="topleft" />
                {/* ESTADOS */}
                {estadoGeo && (
                    <>
                        <GeoJSON
                            ref={refEstados}
                            data={estadoGeo}
                            style={(feature) => styleEstado(feature, selectedUF)}
                            onEachFeature={(feature, layer) => onEachEstado(feature, layer, selectedUF, setSelectedUF, setHover,)}
                        />

                        <FitToLayer refLayer={refEstados} />

                    </>
                )}
                {/* MUNICÍPIOS (aparecem quando uma UF é selecionada) */}
                {municipiosGeo && (
                    <>
                        <GeoJSON
                            ref={refMun}
                            data={municipiosGeo}
                            style={(feature) => styleMun(feature, munSelId)}
                            onEachFeature={(f, l) => onEachMun(f, l, munSelId, setMunSelId, setHover, setMunSelName)}
                        />


                        <FitToLayer refLayer={refMun} />
                    </>
                )}

                <ResetZoom selectedUF={selectedUF} munSelId={munSelId} />


            </MapContainer>


        </div>
    );
}