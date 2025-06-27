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
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar solo campos realmente obligatorios
    const requiredFields = ['name', 'lastName', 'username', 'email', 'password', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());

    if (missingFields.length > 0) {
      setError('Por favor completa todos los campos obligatorios');
      setLoading(false);
      return;
    }

    try {
      // Preparar datos para el backend
      const customerData = {
        ...formData,
        isVerified: false
      };

      const result = await register(customerData);
      
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