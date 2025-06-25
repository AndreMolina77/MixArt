import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/Inputs/Input.jsx';
import PasswordInput from '../components/Inputs/PasswordInput.jsx';
import GoogleButton from '../components/Buttons/GoogleButton.jsx';
import cartImage from '../assets/cart-image.jpeg';
import Button from '../components/Buttons/Button.jsx';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    issNumber: '', // Agregado para coincidir con el modelo
    isVerified: false // Valor por defecto
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.lastName || !formData.email || !formData.password || !formData.phoneNumber) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Generar username si no se proporcionó
    const finalData = {
      ...formData,
      username: formData.username || `${formData.name.toLowerCase()}${formData.lastName.toLowerCase().substring(0, 3)}${Math.floor(Math.random() * 1000)}`
    };

    const result = await register(finalData);
    if (result.success) {
      navigate('/verificar-codigo');
    } else {
      alert(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="min-h-screen flex font-[Alexandria] text-[#7A6E6E]">
      <div className="w-1/2 bg-[#CBE4E8] flex items-center justify-center p-6">
        <img src={cartImage} alt="Shopping with phone" className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col justify-center p-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">Crear una cuenta</h2>
          <p className="text-sm">A continuación, ingresa tu información</p>
          
          <TextInput 
            text="Nombre" 
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          
          <TextInput 
            text="Apellido" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          
          <TextInput 
            text="Nombre de usuario (opcional)" 
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          
          <TextInput 
            text="Correo electrónico" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <PasswordInput 
            text="Contraseña" 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <TextInput 
            text="Número de teléfono" 
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          
          <TextInput 
            text="Número de ISS (opcional)" 
            name="issNumber"
            value={formData.issNumber}
            onChange={handleChange}
          />
          
          <Button 
            Text={"Crear cuenta"}
            onClick={handleSubmit}
          />
          
          <GoogleButton />
          
          <p className="text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="underline text-[#7A6E6E] hover:text-[#E07A5F] transition">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;