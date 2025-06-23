import { FcGoogle } from 'react-icons/fc'

const GoogleButton = () => {
  return (
    <button className="w-full h-12 flex items-center cursor-pointer justify-center gap-2 border-2 border-[#E07A5F] rounded-md py-2 text-[#7A6E6E] font-[Alexandria] hover:bg-[#fbeeea] transition">
      <FcGoogle className="text-xl" />
      Iniciar sesión con Google
    </button>
  )
}
export default GoogleButton