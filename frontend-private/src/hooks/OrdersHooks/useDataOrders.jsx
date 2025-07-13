import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataOrders = () => {
  const API = "http://localhost:4000/api/orders"
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [articles, setArticles] = useState([])
  const [artPieces, setArtPieces] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para pedidos - usuario no autorizado")
        setOrders([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los pedidos")
      }
      const data = await response.json()
      setOrders(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener pedidos:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar pedidos")
      }
      setLoading(false)
    }
  }
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/customers", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener clientes")
      }
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
    }
  }
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/articles", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener artículos")
      }
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error("Error al obtener artículos:", error)
    }
  }
  const fetchArtPieces = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/artpieces", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener piezas de arte")
      }
      const data = await response.json()
      setArtPieces(data)
    } catch (error) {
      console.error("Error al obtener piezas de arte:", error)
    }
  }
  useEffect(() => {
    fetchOrders()
    fetchCustomers()
    fetchArticles()
    fetchArtPieces()
  }, [])
  const createHandlers = (API) => ({
    data: orders,
    loading,
    onAdd: async (data) => {
      try {
        const response = await fetch(`${API}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar pedido")
        }
        toast.success('Pedido registrado exitosamente')
        fetchOrders()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar pedido")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        // Validar que los datos estén correctos
        if (!data.customerId || !data.items || !Array.isArray(data.items) || data.items.length === 0) {
          throw new Error("Datos de pedido incompletos")
        }
        // Preparar los datos para enviar
        const orderData = {
          customerId: data.customerId,
          items: data.items.map(item => ({
            itemType: item.itemType,
            itemId: item.itemId,
            quantity: parseInt(item.quantity),
            subtotal: parseFloat(item.subtotal || 0)
          })),
          total: parseFloat(data.total || 0),
          status: data.status
        }
        const response = await fetch(`${API}/orders/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(orderData)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar pedido")
        }
        toast.success('Pedido actualizado exitosamente')
        fetchOrders()
      } catch (error) {
        toast.error(error.message || "Error al actualizar pedido")
        throw error
      }
    }, onDelete: deleteOrder
  })
  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el pedido")
      }
      toast.success('Pedido eliminado exitosamente')
      fetchOrders()
    } catch (error) {
      console.error("Error al eliminar pedido:", error)
      toast.error("Error al eliminar pedido")
    }
  }
  return {
    orders,
    customers,
    articles,
    artPieces,
    loading,
    deleteOrder,
    fetchOrders,
    fetchCustomers,
    fetchArticles,
    fetchArtPieces,
    createHandlers
  }
}
export default useDataOrders