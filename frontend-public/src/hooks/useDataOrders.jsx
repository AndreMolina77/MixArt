import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useDataOrders = () => {
  const API = "http://localhost:4000/api/orders";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener todas las órdenes
  const fetchOrders = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      });
      
      if (response.status === 403) {
        setError("No tienes permisos para ver órdenes");
        return;
      }
      
      if (!response.ok) throw new Error("Error al obtener órdenes");
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
      toast.error("Error al cargar órdenes");
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva orden (simplificado para frontend)
  const createOrder = async (orderData) => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear orden");
      }

      const newOrder = await response.json();
      setOrders(prev => [...prev, newOrder]);
      toast.success("Orden creada con éxito");
      return newOrder; // Útil para redirección
    } catch (error) {
      toast.error(error.message);
      throw error; // Para manejo en el componente
    }
  };

  // Actualizar estado de una orden
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API}/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Error al actualizar orden");

      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success("Estado actualizado");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    refetch: fetchOrders
  };
};

export default useDataOrders;