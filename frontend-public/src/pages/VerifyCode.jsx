
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/Inputs/Input.jsx';
import Button from '../components/Buttons/Button.jsx';
import cartImage from '../assets/cart-image.jpeg';
import { useAuth } from '../hooks/useAuth';

const VerifyCode = () => {
  const { verifyResetCode } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus al siguiente input
    if (value && index < 5) {
      document.getElementById(code-${index + 1}).focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    // Validación básica
    if (fullCode.length === 6) {
      const result = await verifyResetCode(fullCode);
      if (result.success) {
        navigate('/restablecer-contrasena');
      } else {
        alert(result.message);
      }
    } else {
      alert('Por favor ingresa el código completo');
    }
  };

  return (
    <div className="min-h-screen flex font-[Alexandria] text-[#7A6E6E]">
      <div className="w-1/2 bg-[#CBE4E8] flex items-center justify-center p-6">
        <img src={cartImage} alt="Shopping with phone" className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col justify-center p-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">Verificar código</h2>
          <p className="text-sm">Ingresa el código de verificación enviado a tu correo</p>
          <div className="flex space-x-4 justify-center">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                id={code-${index}}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-12 text-center"
                maxLength={1}
              />
            ))}
          </div>
          <Button 
            Text={"Verificar código"}
            onClick={handleVerify}
          />
          <p className="text-sm text-center">
            ¿No recibiste el código?{" "}
            <button 
              className="underline text-[#E07A5F] hover:text-[#E07A5F] transition"
              onClick={() => alert('Código reenviado')}
            >
              Reenviar código
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default VerifyCode;