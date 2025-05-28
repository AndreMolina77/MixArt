import { ArrowRight } from 'lucide-react'
// Prop text para manejar el texto del boton y onClick para poder manejar estados
function RoundedButton({ Text, onClick }) {
  return (
    <button className={`group inline-flex items-center justify-center bg-[#E07A5F] text-white font-[Alexandria] font-normal px-6 lg:px-8 py-1.5 rounded-full shadow-lg text-xl transition-colors duration-300 gap-x-3 border-4 border-transparent hover:bg-transparent hover:text-[#E07A5F] hover:border-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#f46161] active:ring-2 active:ring-[#f46161] cursor-pointer`} onClick={onClick}>
      {Text}
      <span className={`flex-shrink-0 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl transition-all duration-300 bg-white text-[#E07A5F] group-hover:bg-transparent group-hover:border-2 group-hover:border-[#E07A5F] group-hover:text-[#E07A5F]`}>
        <ArrowRight size={24}/>{/*Utiliza la flecha de lucide-react para el icono */}
      </span>
    </button>
  )
}
export default RoundedButton
