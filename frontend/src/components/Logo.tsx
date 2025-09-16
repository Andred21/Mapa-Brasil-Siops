
import logo from '../assets/logo.png';

{/* Logo Fictícia para a Aplicação */}

export default function Logo() {
    return (
        <div>
            <img src={logo} alt="Logo" className="h-24 w-24" />
        </div>
    );
}