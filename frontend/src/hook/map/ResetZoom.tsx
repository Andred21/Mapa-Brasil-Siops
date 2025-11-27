import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { BR_BOUNDS } from "@/pages/Map/constants"; 

type Props = {
  selectedUF: any;
  munSelId: string | number | null;
};

/**
 * Reseta o zoom do mapa para o padrão
 */
export default function ResetZoom({ selectedUF, munSelId }: Props) {

  const map = useMap();

  useEffect(() => {

    if (!selectedUF && !munSelId) {
      map.fitBounds(BR_BOUNDS as any, { padding: [10, 10] });
    }
    
  }, [selectedUF, munSelId, map]);

  return null;

}
