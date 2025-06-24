import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiMeh } from 'react-icons/fi';
import Breadcrumbs from '../components/Handlers/BreadCrumbs';

const NotFoundPage = () => {
  return (
    <div className="font-[Alexandria] bg-[#FAF5E9] min-h-screen">
        {/* Contenedor especial para el Breadcrumbs solo en esta pagina */}
        <div className="pt-8 px-8">
            <Breadcrumbs />
        </div>
        <div className="min-h-screen flex items-center justify-center bg-[#FAF5E9] px-4">
            <div className="text-center max-w-md">
                <div className="mx-auto bg-[#F9F3E9] w-32 h-32 rounded-full flex items-center justify-center mb-6">
                    <FiMeh className="text-[#E07A5F] w-16 h-16" />
                </div>
                
                <h1 className="text-9xl font-bold text-[#E07A5F]">404</h1>
                <h2 className="text-2xl font-semibold text-[#7A6E6E] mt-4">Página no encontrada</h2>
                
                <p className="text-lg text-[#7A6E6E] mt-6">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/" 
                        className="px-6 py-3 bg-[#E07A5F] text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#d0694e] transition-colors"
                    >
                        <FiHome className="w-5 h-5" />
                        <span>Ir al inicio</span>
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()} 
                        className="px-6 py-3 border border-[#E07A5F] text-[#E07A5F] rounded-md flex items-center justify-center gap-2 hover:bg-[#F9F3E9] transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        <span>Volver atrás</span>
                    </button>
                </div>
                
                <div className="mt-12 pt-6 border-t border-[#E0E0E0]">
                    <p className="text-[#7A6E6E]">
                        ¿Necesitas ayuda? <Link to="/contacto" className="text-[#E07A5F] font-medium hover:underline">Contáctanos</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NotFoundPage;