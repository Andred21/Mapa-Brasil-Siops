import { useEffect, useState } from "react";
import {
  useCrescimentoPopulacaoEstadual,
  useIndicadoresPopulacaoEstadual,
} from "@/hook/";

interface UseMenuEstadoProps {
  estado: any;
  municipioSelecionadoExterno?: any;
}

export function useMenuEstado({ estado, municipioSelecionadoExterno }: UseMenuEstadoProps) {
  const [listaAberta, setListaAberta] = useState(true);
  const [ultimoUf, setUltimoUf] = useState<string | number | null>(null);

  // 🔹 Hooks de dados reais
  const { data: crescimento, isLoading: loadingCrescimento } =
    useCrescimentoPopulacaoEstadual(estado?.co_uf, "2010", "2024");

  const { data: indicadores, isLoading: loadingIndicadores } =
    useIndicadoresPopulacaoEstadual(estado?.co_uf, "2010", "2024");

  // 🔹 Controle de abertura/fechamento
  useEffect(() => {
    if (municipioSelecionadoExterno) setListaAberta(false);
  }, [municipioSelecionadoExterno]);

  useEffect(() => {
    if (estado?.codigo_uf && estado?.codigo_uf !== ultimoUf) {
      setListaAberta(true);
      setUltimoUf(estado?.codigo_uf);
    }
  }, [estado?.codigo_uf, ultimoUf]);

  // 🔹 Debug temporário
  useEffect(() => {
    if (indicadores) {
      console.log("📊 Indicadores populacionais:", indicadores);
    }
  }, [indicadores]);

  // 🔹 Cálculo do crescimento percentual
  const crescimentoPercentual = (() => {
    if (!crescimento || crescimento.length < 2) return null;
    const inicio = Number(crescimento[0]?.populacao);
    const fim = Number(crescimento[crescimento.length - 1]?.populacao);
    if (isNaN(inicio) || isNaN(fim)) return null;
    const percentual = ((fim - inicio) / inicio) * 100;
    return percentual.toFixed(2);
  })();

  return {
    listaAberta,
    setListaAberta,
    crescimentoPercentual,
    indicadores,
    loadingCrescimento,
    loadingIndicadores,
  };
}
