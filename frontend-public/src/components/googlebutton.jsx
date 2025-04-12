import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleButton = () => {
  return (
    <button className="w-full flex items-center justify-center gap-2 border border-[#E07A5F] rounded-md py-2 text-[#7A6E6E] font-[Alexandria] hover:bg-[#fbeeea] transition">
      <FcGoogle className="text-xl" />
      Iniciar sesión con Google
    </button>
  )
}
export default GoogleButton