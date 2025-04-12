import React from 'react'
import TextInput from '../components/input.jsx'
import PasswordInput from '../components/passwordinput.jsx'
import GoogleButton from '../components/googlebutton.jsx'
import cartImage from '../assets/cart-image.jpeg'

const Login = () => {
  return (
    <div className="min-h-screen flex font-[Alexandria] text-[#7A6E6E]">
      <div className="w-1/2 bg-[#CBE4E8] flex items-center justify-center p-6">
        <img src={cartImage} alt="Shopping with phone" className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col justify-center p-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">Iniciar sesión</h2>
          <p className="text-sm">A continuación, ingresa tu información</p>
          <TextInput text="Correo electrónico o número de teléfono" />
          <PasswordInput text="Contraseña" />
          <button className="w-full bg-[#E07A5F] text-white py-2 rounded-md font-semibold hover:bg-[#d26d55] transition">
            Iniciar sesión
          </button>
          <GoogleButton />
          <p className="text-sm text-center">
            ¿Olvidaste tu contraseña? <a href="/recpassword" className="underline text-[#E07A5F] hover:text-[#E07A5F] transition">Haz clic aquí</a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login