import { ArrowRight } from 'lucide-react' // Importa el icono de flecha de lucide-react
//Prop `text` para manejar el texto según la pantalla
function RoundedButton({Text}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <button className="bg-[#e68a6a] text-white font-inter font-bold py-4 px-8 rounded-full shadow-lg flex items-center justify-center hover:bg-[#d17858] transition-colors duration-300 text-2xl sm:text-3xl lg:text-4xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        {Text}
        <span className="ml-4 bg-white text-[#e68a6a] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
          <ArrowRight size={24} /> {/* Usando el icono de lucide-react */}
        </span>
      </button>
    </div>
  )
}
export default RoundedButton