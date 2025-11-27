import { useEffect, useState, useMemo, useRef } from "react";
import type { GeoJSON as GeoJSONType } from "geojson";
import {
  BR_BOUNDS,
  onEachEstado,
  styleEstado,
  onEachMun,
  type UF,
  styleMun,
  stEstadoSel,
  stMunSel,
} from ".";

import { Button } from "primereact/button";
import DataMenu from "@/components/Menus/DataMenu/DataMenu";

import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import type { SearchSelection } from "../Search/Search";
import type { listaEstados } from "@/types";

interface MapProps {
  externalSelection?: SearchSelection | null;
  onExternalSelectionHandled?: () => void;
}

export default function Map({
  externalSelection = null,
  onExternalSelectionHandled,
}: MapProps) {
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

  // --------------------------
  // HELPERS DE CENTRALIZAÇÃO
  // --------------------------
  const centerAndZoom = (bounds: L.LatLngBounds, maxZoom = 7, padding = 35) => {
    const map = mapRef.current;
    if (!map) return;

    map.fitBounds(bounds, {
      animate: true,
      padding: [padding, padding],
      maxZoom,
    });

    setTimeout(() => {
      const center = bounds.getCenter();
      map.panTo(center, {
        animate: true,
        duration: 0.45,
      });
    }, 350);
  };

  // Carrega Estados
  useEffect(() => {
    fetch("/data/estados.geojson").then(r => r.json()).then(setEstadoGeo);
  }, []);

  // Carrega Municipios da UF
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
  };

  // -------------------------------------------
  // Seleção externa (busca)
  // -------------------------------------------
  useEffect(() => {
    if (!externalSelection) return;

    if (externalSelection.type === "estado") {
      const codigoUfNumber = Number(externalSelection.codigo_uf);
      const nextUF: UF = {
        codigo_uf: codigoUfNumber,
        sigla: externalSelection.sigla,
        nome: externalSelection.nome,
      };

      setSelectedUF(nextUF);
      setMunSelId(null);
      setMunSelName(null);
      setSideInfo({
        type: "estado",
        data: { codigo_uf: externalSelection.codigo_uf },
      });
    } else {
      const codigoUfNumber = Number(externalSelection.codigo_uf);
      if (!isNaN(codigoUfNumber)) {
        const nextUF: UF = {
          codigo_uf: codigoUfNumber,
          sigla: externalSelection.sigla,
          nome: externalSelection.ufNome ?? externalSelection.sigla,
        };
        setSelectedUF(nextUF);
      }

      setMunSelId(externalSelection.cod_ibge);
      setMunSelName(externalSelection.nome);

      setSideInfo({
        type: "municipio",
        data: { cod_ibge: externalSelection.cod_ibge },
      });
    }

    onExternalSelectionHandled?.();
  }, [externalSelection, onExternalSelectionHandled]);

  // -------------------------------------------
  // Zoom para UF selecionada
  // -------------------------------------------
  useEffect(() => {
    if (!selectedUF || !refEstados.current || !mapRef.current) return;

    const targetSigla = selectedUF.sigla.toUpperCase();
    const targetCodigo = String(selectedUF.codigo_uf);

    refEstados.current.eachLayer((layer: any) => {
      const p = layer.feature?.properties || {};

      const layerSigla = String(p.sigla || p.SIGLA || "").toUpperCase();
      const layerCodigo = String(
        p.codigo_uf || p.code || p.cod || p.id || ""
      );

      if (layerSigla === targetSigla || layerCodigo === targetCodigo) {
        const bounds = layer.getBounds();
        layer.setStyle(stEstadoSel);

        centerAndZoom(bounds, 6);

        setTimeout(() => {
          refEstados.current?.resetStyle(layer);
        }, 1200);
      }
    });
  }, [selectedUF, estadoGeo]);

  // -------------------------------------------
  // Zoom para Município selecionado
  // -------------------------------------------
  useEffect(() => {
    if (!munSelId || !refMun.current || !mapRef.current) return;

    refMun.current.eachLayer((layer: any) => {
      const codigo = String(
        layer.feature?.properties?.id ||
        layer.feature?.properties?.code ||
        layer.feature?.properties?.co_municipio ||
        ""
      );

      if (codigo === String(munSelId)) {
        const bounds = layer.getBounds();
        layer.setStyle(stMunSel);

        centerAndZoom(bounds, 8);

        setTimeout(() => {
          refMun.current?.resetStyle(layer);
        }, 1200);
      }
    });
  }, [munSelId, municipiosGeo]);

  // -------------------------------------------
  // Quando abre/fecha o painel lateral → reajusta mapa
  // -------------------------------------------
  useEffect(() => {
    if (!mapRef.current) return;

    setTimeout(() => {
      mapRef.current?.invalidateSize();

      // tenta recentralizar o elemento selecionado
      if (munSelId && refMun.current) {
        refMun.current.eachLayer((layer: any) => {
          const codigo = String(
            layer.feature?.properties?.id ||
            layer.feature?.properties?.code ||
            layer.feature?.properties?.co_municipio ||
            ""
          );
          if (codigo === String(munSelId)) {
            centerAndZoom(layer.getBounds(), 8);
          }
        });
      } else if (selectedUF && refEstados.current) {
        refEstados.current.eachLayer((layer: any) => {
          const p = layer.feature?.properties || {};
          const codigo = String(
            p.codigo_uf || p.code || p.cod || p.id || ""
          );
          const sigla = String(p.sigla || p.SIGLA || "").toUpperCase();
          if (
            codigo === String(selectedUF.codigo_uf) ||
            sigla === selectedUF.sigla.toUpperCase()
          ) {
            centerAndZoom(layer.getBounds(), 6);
          }
        });
      }
    }, 350);
  }, [sideInfo]);

  // -------------------------------------------
  // RESET DO MAPA AO LIMPAR SELEÇÃO
  // -------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Nada selecionado → visão nacional
    if (!selectedUF && !munSelId) {
      map.fitBounds(BR_BOUNDS as any, {
        animate: true,
        padding: [20, 20],
        maxZoom: 5,
      });

      setTimeout(() => {
        map.panTo(map.getCenter(), {
          animate: true,
          duration: 0.4,
        });
      }, 350);
    }
  }, [selectedUF, munSelId]);

  return (
    <div className="flex w-full h-full pt-0">

      {/* Painel principal */}
      <div
        className={`transition-all duration-300 ease-in-out top-20 z-0 ${
          sideInfo ? "w-[calc(100%-576px)] mr-[36rem]" : " w-full"
        }`}
      >
        {/* Info overlay */}
        <div className="absolute z-[1000] m-2 rounded bg-white/80 p-2 text-sm shadow">
          <div><b>UF:</b> {selectedUF ? `${selectedUF.nome} (${selectedUF.sigla})` : "-"}</div>
          <div><b>Hover:</b> {hover}</div>
          {munSelName && <div><b>Municipio Selecionado:</b> {munSelName}</div>}
          {munSelId && <div><b>Municipio ID:</b> {munSelId}</div>}

          <Button
            label="Limpar Selecao"
            icon="pi pi-refresh"
            type="submit"
            className="!h-8 !border-gray-500 !text-gray-600"
            onClick={clearStats}
          />
        </div>

        {/* Mapa */}
        <MapContainer {...mapProps} zoomControl ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="topleft" />

          {estadoGeo && (
            <GeoJSON
              ref={refEstados}
              data={estadoGeo}
              style={(feature) => styleEstado(feature, selectedUF)}
              onEachFeature={(feature, layer) =>
                onEachEstado(feature, layer, selectedUF, setSelectedUF, setHover, setSideInfo)
              }
            />
          )}

          {municipiosGeo && (
            <GeoJSON
              ref={refMun}
              data={municipiosGeo}
              style={(feature) => styleMun(feature, munSelId)}
              onEachFeature={(f, l) =>
                onEachMun(f, l, munSelId, setMunSelId, setHover, setMunSelName, setSideInfo)
              }
            />
          )}
        </MapContainer>
      </div>

      {/* Painel lateral */}
      <div
        className={`absolute right-0 top-20 h-[calc(100vh-80px)] bg-white shadow-lg border-l border-gray-200 transition-all duration-300 ease-in-out z-10 ${
          sideInfo ? "w-[36rem] opacity-100" : "w-0 opacity-0"
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
          onSelectEstadoFromList={(estadoSelecionado: listaEstados) => {
            const codigoUfString =
              estadoSelecionado.co_uf || (estadoSelecionado as any)?.codigo_uf || "";
            const codigoUfNumber = Number(codigoUfString);

            setSelectedUF({
              codigo_uf: codigoUfNumber,
              sigla: estadoSelecionado.sg_uf || "",
              nome: estadoSelecionado.no_uf || estadoSelecionado.sg_uf,
            });

            setMunicipiosGeo(null);
            setMunSelId(null);
            setMunSelName(null);

            setSideInfo({
              type: "estado",
              data: { codigo_uf: codigoUfString },
            });
          }}
        />
      </div>
    </div>
  );
}
