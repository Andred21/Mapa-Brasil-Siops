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
import DataMenu from "@/pages/DataMenu/DataMenu";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";


export default function Map() {

  const [estadoGeo, setEstadoGeo] = useState<GeoJSONType | null>(null);
  const [selectedUF, setSelectedUF] = useState<UF | null>(null);
  const [municipiosGeo, setMunicipiosGeo] = useState<GeoJSONType | null>(null);

  const [hover, setHover] = useState<string | null>(null);
  const [munSelName, setMunSelName] = useState<string | null>(null);
  const [munSelId, setMunSelId] = useState<string | number | null>(null);
  const [sideInfo, setSideInfo] = useState<any>(null);



  const refEstados = useRef<L.GeoJSON<any> | null>(null);
  const refMun = useRef<L.GeoJSON<any> | null>(null);
  const mapRef = useRef<L.Map | null>(null);


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
    setSideInfo(null);


  }

  useEffect(() => {

    if (!munSelId || !refMun.current) return;

    const mapInstance = mapRef.current;
    if (!mapInstance) return;

    refMun.current.eachLayer((layer: any) => {
      const feature = layer.feature;
      const codigo = String(
        feature?.properties?.id ||
        feature?.properties?.code ||
        feature?.properties?.co_municipio ||
        ""
      );

      if (codigo === String(munSelId)) {
        const bounds = layer.getBounds();

        // Faz o zoom (zoom suave)
        mapInstance.fitBounds(bounds, { maxZoom: 8 });

        // Adiciona efeito visual rápido (highlight temporário opcional)

        setTimeout(() => {
          refMun.current?.resetStyle(layer);
        }, 1200);
      }
    });
  }, [munSelId]);

  return (
    <div className="flex w-full h-full pt-0">

      {/* Painel principal (empurra o mapa) */}
      <div
        className={`transition-all duration-300 ease-in-out top-20 z-0 ${sideInfo ? "w-[calc(100%-576px)] right-[36rem]" : " w-full"
          }`}
      >
        {/* Painel de Info flutuante no canto superior esquerdo */}
        <div className="absolute z-[1000] m-2 rounded bg-white/80 p-2 text-sm shadow">
          <div>
            <b>UF:</b> {selectedUF ? `${selectedUF.nome} (${selectedUF.sigla})` : "-"}
          </div>
          <div>
            <b>Hover:</b> {hover}
          </div>
          {munSelName && <div><b>Município Selecionado:</b> {munSelName}</div>}
          {munSelId && <div><b>Município ID:</b> {munSelId}</div>}

          <Button
            label="Limpar Seleção"
            icon="pi pi-refresh"
            type="submit"
            className="!h-8 !border-gray-500 !text-gray-600"
            onClick={clearStats}
          />
        </div>

        {/* Mapa */}
        <MapContainer {...mapProps}
          zoomControl={true}
        >

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="topleft" />

          {/* ESTADOS */}
          {estadoGeo && (
            <>
              <GeoJSON
                ref={refEstados}
                data={estadoGeo}
                style={(feature) => styleEstado(feature, selectedUF)}
                onEachFeature={(feature, layer) =>
                  onEachEstado(feature, layer, selectedUF, setSelectedUF, setHover, setSideInfo)
                }
              />
              <FitToLayer refLayer={refEstados} />
            </>
          )}

          {/* MUNICÍPIOS */}
          {municipiosGeo && (
            <>
              <GeoJSON
                ref={refMun}
                data={municipiosGeo}
                style={(feature) => styleMun(feature, munSelId)}
                onEachFeature={(f, l) =>
                  onEachMun(f, l, munSelId, setMunSelId, setHover, setMunSelName, setSideInfo)
                }
              />
              <FitToLayer refLayer={refMun} />
            </>
          )}

          <ResetZoom selectedUF={selectedUF} munSelId={munSelId} />
        </MapContainer>
      </div>

      {/* Painel lateral de dados fixo */}
      <div
        className={`absolute right-0 top-20 h-[calc(100vh-80px)] bg-white shadow-lg border-l border-gray-200 transition-all duration-300 ease-in-out z-10 ${sideInfo ? "w-[36rem] opacity-100" : "w-0 opacity-0"
          } overflow-y-auto`}
      >
        <DataMenu
          visible={!!sideInfo}
          data={sideInfo?.data}
          type={sideInfo?.type || "estado"}
          onHide={() => setSideInfo(null)}
          onSelectMunicipioFromList={(cod_ibge: string) => {
            setMunSelId(cod_ibge);
            setSideInfo({ type: "municipio", data: { cod_ibge } });
          }}
        />
      </div>
    </div>
  );

}