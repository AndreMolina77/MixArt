import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'

const PasswordInput = ({ placeholder }) => {
    const [show, setShow] = useState(false)
  
    return (
      <div className="relative w-full">
        <input type={show ? 'text' : 'password'} placeholder={placeholder} className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 pr-10 outline-none text-[#7A6E6E] font-[Alexandria] appearance-none" style={{ WebkitTextSecurity: show ? 'none' : 'disc' }}/>
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A6E6E]">
          {show ? <FaEyeSlash/> : <FaEye />}
        </button>
      </div>
    )
}
const Form = () => {
    return (
        <>
            <h2 className="text-[#DE7A58] font-semibold text-lg mb-6">Editar tu perfil</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-[#7A6E6E] text-sm">Nombre</label>
                    <input type="text" placeholder="Md" className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"/>
                </div>
                <div>
                    <label className="text-[#7A6E6E] text-sm">Apellido</label>
                    <input type="text" placeholder="Rimel" className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"/>
                </div>
                <div>
                    <label className="text-[#7A6E6E] text-sm">Correo electrónico</label>
                    <input type="email" placeholder="rimel1111@gmail.com" className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"/>
                </div>
                <div>
                    <label className="text-[#7A6E6E] text-sm">Dirección</label>
                    <input type="text" placeholder="Kingston, 5236, Estados Unidos" className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"/>
                </div>
                </div>
                <div className="space-y-4">
                <label className="text-[#7A6E6E] text-sm block">Cambiar contraseña</label>
                <PasswordInput placeholder="Contraseña actual" />
                <PasswordInput placeholder="Nueva contraseña" />
                <PasswordInput placeholder="Confirmar nueva contraseña" />
                </div>
                <div className="flex justify-end items-center space-x-4 pt-4">
                <button type="button" className="text-[#7A6E6E]">Cancelar</button>
                <button type="submit" className="bg-[#DE7A58] hover:bg-transparent border-2 border-[#E07A5F] hover:border-[#E07A5F] text-white hover:text-[#E07A5F] px-6 py-2 rounded-md text-base font-semibold transition duration-300 shadow-sm cursor-pointer">
                    Guardar cambios
                </button>
                </div>
            </form>
            </>
    )
}
export default Form