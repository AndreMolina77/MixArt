import { useNavigate } from 'react-router-dom';
import TextInput from '../components/Inputs/Input.jsx';
import PasswordInput from '../components/Inputs/PasswordInput.jsx';
import cartImage from '../assets/cart-image.jpeg';
import Button from '../components/Buttons/Button.jsx';
import useSignUp from '../hooks/useDataCustomers.jsx';

const Signup = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit
  } = useSignUp(navigate);

  return (
    <div className="min-h-screen flex font-[Alexandria] text-[#7A6E6E]">
      <div className="w-1/2 bg-[#CBE4E8] flex items-center justify-center p-6">
        <img src={cartImage} alt="Shopping with phone" className="max-w-full h-auto" />
      </div>
      
      <div className="w-1/2 bg-[#F4F1DE] flex flex-col justify-center p-12">
        <form 
          onSubmit={handleSubmit}
          className="max-w-md w-full mx-auto space-y-6"
        >
          <h2 className="text-3xl font-semibold">Crear una cuenta</h2>
          <p className="text-sm">A continuación, ingresa tu información</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <TextInput 
            text="Nombre" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <TextInput 
            text="Apellido" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          
          <TextInput 
            text="Nombre de usuario" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <TextInput 
            text="Correo electrónico" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          
          <PasswordInput 
            text="Contraseña" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <TextInput 
            text="Número de teléfono" 
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            type="tel"
          />
          
          <TextInput 
            text="Número de ISS (opcional)" 
            name="issNumber"  // Corregido: minúsculas
            value={formData.issNumber}
            onChange={handleChange}
            type="text"
          />
          
          <Button 
            Text={loading ? "Creando cuenta..." : "Crear cuenta"}
            type="submit"
            disabled={loading}
          />
          
          <p className="text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="underline text-[#7A6E6E] hover:text-[#E07A5F] transition">
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;