import { ArrowRight } from 'lucide-react';
//Prop `text` para manejar el texto segun la pantalla
function RoundedButton({ Text }) {
  return (
    <button className={` inline-flex items-center justify-center bg-[#E07A5F] hover:bg-[#D17858] text-white font-inter font-bold px-6 lg:px-8 py-4 lg:py-5 rounded-full shadow-lg text-xl lg:text-2xl transition-colors duration-300 gap-x-4`}>
      {Text}
      <span className="flex-shrink-0 bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl text-[#E07A5F]">
        <ArrowRight size={24} /> {/*Usando el ícono de lucide-react para la flecha de derecha */}
      </span>
    </button>
  )
}
export default RoundedButton