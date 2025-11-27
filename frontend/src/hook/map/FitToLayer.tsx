import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

/**
 * 
 * Zoom Automático para o layer passado
 * @param refLayer - referência para o GeoJson selecionado
 * 
 */
export default function FitToLayer({ refLayer }: { refLayer: React.RefObject<L.GeoJSON | null>}) {

    const map = useMap();

    useEffect(() => {

        if (!refLayer.current) return;
        const bounds = refLayer.current.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
        
    }, [refLayer, map]);

    return null;
    
}