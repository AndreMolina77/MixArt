import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useDataSales = () => {
  const API = "http://localhost:4000/api/sales";
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener ventas con datos esenciales
  const fetchSales = async () => {
    try {
      const response = await fetch(`${API}?simple=true`, {
        credentials: "include"
      });

      if (!response.ok) throw new Error("Error al obtener ventas");
      
      const data = await response.json();
      setSales(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Registrar venta (para checkout)
  const registerSale = async (saleData) => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(saleData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar venta");
      }

      const newSale = await response.json();
      setSales(prev => [...prev, newSale]);
      toast.success("Venta registrada con éxito");
      return newSale; // Para redirección
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return {
    sales,
    loading,
    registerSale,
    fetchSales
  };
};

export default useDataSales;