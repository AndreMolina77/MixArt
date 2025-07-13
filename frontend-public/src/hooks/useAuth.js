import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  const { register, login, logout, user } = context;

  const registerCustomer = async (customerData) => {
    try {
      const response = await fetch('http://localhost:4000/api/signupCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Error en el registro' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message || 'Error de conexión' };
    }
  };

  return {
    register: registerCustomer, // Sobreescribir register con la nueva funcion
    login,
    logout,
    user
  };
};

export default useAuth;