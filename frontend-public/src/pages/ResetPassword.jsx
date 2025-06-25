
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/Inputs/PasswordInput.jsx';
import Button from '../components/Buttons/Button.jsx';
import cartImage from '../assets/cart-image.jpeg';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { changePassword } = useAuth();
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });

  const handlePasswordReset = async () => {
   if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const result = await changePassword(passwords.newPassword);
    if (result.success) {
      navigate('/login');
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
          <h2 className="text-3xl font-semibold">Restablecer contraseña</h2>
          <p className="text-sm">Crea una nueva contraseña para tu cuenta</p>
          <PasswordInput 
            text="Nueva contraseña" 
            value={passwords.newPassword}
            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
            showPassword={showPassword}
          />
          <PasswordInput 
            text="Confirmar contraseña" 
            value={passwords.newPassword}
            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
            showPassword={showPassword}
          />
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="showPassword" 
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2 h-4 w-4 text-[#E07A5F] border-gray-300 rounded"
            />
            <label htmlFor="showPassword" className="text-sm">
              Mostrar contraseñas
            </label>
          </div>
          <Button 
            Text={"Actualizar contraseña"}
            onClick={handlePasswordReset}
          />
          <p className="text-sm text-center">
            ¿Recordaste tu contraseña?{" "}
            <button 
              onClick={() => navigate('/login')}
              className="underline text-[#E07A5F] hover:text-[#E07A5F] transition"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;