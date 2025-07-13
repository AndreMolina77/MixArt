import { useState } from 'react';
import useAuth  from './useAuth.js';

const useSignUp = (navigate) => {
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    issNumber: '' // Campo opcional
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log('En la función')
    e.preventDefault();
    setLoading(true);
    setError(null);

 

     try {
      // Depurar antes de enviar
      console.log('Datos enviados:', {
        ...formData,
        isVerified: false
      });
      
      const result = await register({
        ...formData,
        isVerified: false
      });
      
      if (result.success) {
        navigate('/verificar-codigo');
      } else {
        setError(result.message || 'Error en el registro');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Error en registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit
  };
};

export default useSignUp;