import NavBar from "@/components/NavBar";
import Map from "./Map";


export default function PagePrincipal() {

    return (
        <div className="w-screen h-screen overflow-hidden">

            <NavBar />

            <div className="pt-20 h-[calc(100vh-80px)]">
                <Map />
            </div>
            
        </div>
    );
}