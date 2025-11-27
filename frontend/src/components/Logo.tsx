
import logo from '../assets/logo.png';

{/* Logo para a Aplicação */}

export default function Logo() {
    return (
        <div>
            <img src={logo} alt="Logo" className="h-28 w-28" />
        </div>
    );
}