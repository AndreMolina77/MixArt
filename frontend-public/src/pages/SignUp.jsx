import TextInput from '../components/Inputs/Input.jsx'
import PasswordInput from '../components/Inputs/PasswordInput.jsx'
import GoogleButton from '../components/Buttons/GoogleButton.jsx'
import cartImage from '../assets/cart-image.jpeg'
import Button from '../components/Buttons/Button.jsx'

const Signup = () => {
  return (
    <div className="min-h-screen flex font-[Alexandria] text-[#7A6E6E]">
      <div className="w-1/2 bg-[#CBE4E8] flex items-center justify-center p-6">
        <img src={cartImage} alt="Shopping with phone" className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col justify-center p-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">Crear una cuenta</h2>
          <p className="text-sm">A continuación, ingresa tu información</p>
          <TextInput text="Nombre completo" />
          <TextInput text="Correo electrónico o número de teléfono" />
          <PasswordInput text="Contraseña" />
          <Button Text={"Crear cuenta"}/>
          <GoogleButton />
          <p className="text-sm text-center">
            ¿Ya tienes una cuenta?{" "}<a href="/login" className="underline text-[#7A6E6E] hover:text-[#E07A5F] transition">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Signup