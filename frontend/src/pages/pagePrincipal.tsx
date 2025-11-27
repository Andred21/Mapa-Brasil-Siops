import { useState } from "react";
import NavBar from "@/components/NavBar";
import AbstractPanel from "@/components/Panel/Abstract/AbstractPanel";
import Map from "./Map";
import Search, { type SearchSelection } from "./Search/Search";
import About from "./About/About";

type Tab = "Mapa" | "Pesquisar" | "Sobre";

export default function PagePrincipal() {
  const [activeTab, setActiveTab] = useState<Tab>("Mapa");
  const [searchOpen, setSearchOpen] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<SearchSelection | null>(null);

  const handleSelectNav = (value: string) => {
    const tab = value as Tab;

    if (tab === "Pesquisar") {
      setSearchOpen(true);
      setActiveTab("Pesquisar");
      return;
    }

    setActiveTab(tab);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setActiveTab("Mapa");
  };

  const handleSearchSelection = (selection: SearchSelection) => {
    setPendingSelection(selection);
    handleCloseSearch();
  };

  const handleSelectionHandled = () => {
    setPendingSelection(null);
  };

  const navSelection = searchOpen ? "Pesquisar" : activeTab;
  const showMap = activeTab !== "Sobre" || searchOpen;

  return (
    <div className="w-screen h-screen overflow-hidden">
      <NavBar selected={navSelection} onSelect={handleSelectNav} />

      <main className="pt-20 h-[calc(100vh-80px)]">
      {showMap ? (
       
            <Map
            externalSelection={pendingSelection}
            onExternalSelectionHandled={handleSelectionHandled}
          />
        ) : (
         
      <About />
        )}
      </main>

      <AbstractPanel
        visible={searchOpen}
        onClose={handleCloseSearch}
        title="Pesquisar entes"
      >
        <Search onSelect={handleSearchSelection} />
      </AbstractPanel>
    </div>
  );
}
