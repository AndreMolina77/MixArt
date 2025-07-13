import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/Inputs/Input.jsx'
import PasswordInput from '../components/Inputs/PasswordInput.jsx'
import GoogleButton from '../components/Buttons/GoogleButton.jsx'
import cartImage from '../assets/cart-image.jpeg'
import Button from '../components/Buttons/Button.jsx'
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(credentials.email, credentials.password);
    if (result.success) {
      navigate('/'); // Redirigir al dashboard/home
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="min-h-screen flex font-[Alexandria] text-[#7A6E6E]">
      <div className="w-1/2 bg-[#CBE4E8] flex items-center justify-center p-6">
        <img src={cartImage} alt="Shopping with phone" className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col justify-center p-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">Iniciar sesión</h2>
          <p className="text-sm">A continuación, ingresa tu información</p>
          <TextInput text="Correo electrónico o número de teléfono" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
          <PasswordInput text="Contraseña" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
          <Button Text={"Iniciar sesión"} onClick={handleLogin}/>
          <GoogleButton />
          <p className="text-sm text-center">
            ¿Olvidaste tu contraseña? <a href="/forpassword" className="underline text-[#E07A5F] hover:text-[#E07A5F] transition">Haz clic aquí</a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login
