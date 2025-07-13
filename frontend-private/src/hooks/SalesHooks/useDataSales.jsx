import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataSales = () => {
  const API = "http://localhost:4000/api/sales"
  const [sales, setSales] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSales = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para ventas - usuario no autorizado")
        setSales([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las ventas")
      }
      const data = await response.json()
      setSales(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener ventas:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar ventas")
      }
      setLoading(false)
    }
  }
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener pedidos")
      }
      const data = await response.json()
      // Solo mostrar pedidos que no tienen una venta asociada
      // o pedidos con status 'Entregado' que podrian convertirse en venta
      const availableOrders = data.filter(order => 
        order.status === 'Entregado' || order.status === 'Enviado'
      )
      setOrders(availableOrders)
    } catch (error) {
      console.error("Error al obtener pedidos:", error)
    }
  }
  useEffect(() => {
    fetchSales()
    fetchOrders()
  }, [])
  const createHandlers = (API) => ({
    data: sales,
    loading,
    onAdd: async (data) => {
      try {
        const response = await fetch(`${API}/sales`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar venta")
        }
        toast.success('Venta registrada exitosamente')
        fetchSales()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar venta")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        const response = await fetch(`${API}/sales/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar venta")
        }
        toast.success('Venta actualizada exitosamente')
        fetchSales()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar venta")
        throw error
      }
    }, onDelete: deleteSale
  })
  const deleteSale = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la venta")
      }

      toast.success('Venta eliminada exitosamente')
      fetchSales()
      fetchOrders() // Actualizar la lista de pedidos disponibles
    } catch (error) {
      console.error("Error al eliminar venta:", error)
      toast.error("Error al eliminar venta")
    }
  }
  return {
    sales,
    orders,
    loading,
    deleteSale,
    fetchSales,
    fetchOrders,
    createHandlers
  }
}
export default useDataSales