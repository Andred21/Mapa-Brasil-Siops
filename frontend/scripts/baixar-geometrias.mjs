// scripts/baixar-geometrias.mjs
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// URLs (GeoJSON prontos)
const URL_ESTADOS = "https://raw.githubusercontent.com/giuliano-macedo/geodata-br-states/main/geojson/br_states.json"; // estados
const URL_MUN_BASE = "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson"; // municipios por UF (geojs-XX-mun.json)

// UF -> código IBGE (se preferir, leia de estados.json gerado do seu Excel)
const UF_CODES = {
  AC: 12, AL: 27, AM: 13, AP: 16, BA: 29, CE: 23, DF: 53, ES: 32,
  GO: 52, MA: 21, MG: 31, MS: 50, MT: 51, PA: 15, PB: 25, PE: 26,
  PI: 22, PR: 41, RJ: 33, RN: 24, RO: 11, RR: 14, RS: 43, SC: 42,
  SE: 28, SP: 35, TO: 17,
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "data");
const MUN_DIR = path.join(OUT_DIR, "municipios");

async function ensureDirs() {
  await fs.mkdir(MUN_DIR, { recursive: true });
}

async function fetchToFile(url, outPath) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Falha ao baixar ${url}: ${r.status} ${r.statusText}`);
  const text = await r.text();
  await fs.writeFile(outPath, text, "utf-8");
  console.log("✔ salvo:", outPath);
}

async function main() {
  await ensureDirs();
  // Estados
  await fetchToFile(URL_ESTADOS, path.join(OUT_DIR, "estados.geojson"));
  // Municípios por UF
  for (const [uf, code] of Object.entries(UF_CODES)) {
    const url = `${URL_MUN_BASE}/geojs-${code}-mun.json`;
    await fetchToFile(url, path.join(MUN_DIR, `geojs-${code}-mun.json`));
  }
}
main().catch(e => { console.error(e); process.exit(1); });
