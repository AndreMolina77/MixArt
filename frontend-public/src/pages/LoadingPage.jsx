import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';

const LoadingPage = () => {
  return (
    <div className="font-[Alexandria] bg-[#FAF5E9] min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center mb-12">
        <div className="mx-auto mb-8">
          {/* Logo de carga animado */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-[#F9F3E9] rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-4 bg-[#E07A5F] rounded-full flex items-center justify-center">
              <Loader size="lg" color="#FAF5E9" />
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-[#7A6E6E]">Cargando contenido</h1>
          <p className="text-[#7A6E6E] opacity-75 mt-2">Por favor espera un momento...</p>
        </div>
        
        {/* Barra de progreso animada */}
        <div className="w-full bg-[#F9F3E9] rounded-full h-2 mb-6 overflow-hidden">
          <div 
            className="bg-[#E07A5F] h-full rounded-full animate-progress"
            style={{ width: '75%' }}
          ></div>
        </div>
        
        {/* Mini esqueleto de lo que se está cargando */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="bg-[#F9F3E9] rounded-full w-12 h-12 mr-3"></div>
            <div className="flex-1">
              <Skeleton type="text" lines={1} />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} type="image" />
            ))}
          </div>
          
          <Skeleton type="text" lines={3} />
          
          <div className="flex justify-center mt-6">
            <Skeleton type="button" />
          </div>
        </div>
      </div>
      
      {/* Consejos de carga */}
      <div className="max-w-lg w-full mt-12">
        <h2 className="text-lg font-semibold text-[#7A6E6E] mb-4">¿Tarda mucho la carga?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Verifica tu conexión', desc: 'Asegúrate de tener una conexión a internet estable' },
            { title: 'Intenta recargar', desc: 'Presiona F5 o el botón de recargar de tu navegador' },
            { title: 'Limpia la caché', desc: 'Un caché lleno puede ralentizar la carga de páginas' }
          ].map((tip, i) => (
            <div 
              key={i} 
              className="bg-white p-4 rounded-lg border border-[#F9F3E9] shadow-sm"
            >
              <h3 className="font-semibold text-[#E07A5F] mb-2">{tip.title}</h3>
              <p className="text-sm text-[#7A6E6E]">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Estilos para la animación de la barra de progreso */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 75%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;