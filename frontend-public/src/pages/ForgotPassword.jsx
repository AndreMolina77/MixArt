import TextInput from '../components/Inputs/Input.jsx';
import Button from '../components/Buttons/Button.jsx';
import cartImage from '../assets/cart-image.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await requestPasswordReset(email);
    if (result.success) {
      navigate('/verificar-codigo');
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
          <h2 className="text-3xl font-semibold">Recuperar contraseña</h2>
          <p className="text-sm">Ingresa tu correo electrónico para restablecer tu contraseña</p>
          <TextInput text="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Button Text={"Enviar código"} onClick={handleSubmit}/>
          <p className="text-sm text-center">
            ¿Recordaste tu contraseña?{" "}
            <Link to="/login" className="underline text-[#E07A5F] hover:text-[#E07A5F] transition">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;