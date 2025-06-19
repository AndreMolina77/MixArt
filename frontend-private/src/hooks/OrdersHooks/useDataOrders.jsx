import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataOrders = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/orders"
  const [id, setId] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [items, setItems] = useState([])
  const [total, setTotal] = useState("")
  const [status, setStatus] = useState("")
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
  const saveOrder = async (e) => {
    e.preventDefault()
    if (!customerId || !items.length || !total || !status) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    // Validar que todos los items tengan los campos requeridos
    const invalidItems = items.filter(item => 
      !item.itemType || !item.itemId || !item.quantity || item.quantity < 1
    )
    if (invalidItems.length > 0) {
      toast.error("Todos los productos deben tener tipo, producto y cantidad válidos")
      return
    }
    try {
      const newOrder = {
        customerId,
        items: items.map(item => ({
          itemType: item.itemType,
          itemId: item.itemId,
          quantity: parseInt(item.quantity),
          subtotal: parseFloat(item.subtotal || 0)
        })),
        total: parseFloat(total),
        status
      }
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newOrder)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar el pedido")
      }

      toast.success('Pedido registrado exitosamente')
      fetchOrders()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar pedido:", error)
      toast.error(error.message || "Error al registrar pedido")
    }
  }
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
  const updateOrder = async (dataOrder) => {
    console.log('🔧 === UPDATE ORDER ===')
    console.log('📦 Data recibido:', dataOrder)
    
    setId(dataOrder._id)
    // Manejar customerId que puede ser objeto o string
    const customerId = dataOrder.customerId?._id || dataOrder.customerId
    setCustomerId(customerId)
    // Manejar items array
    setItems(dataOrder.items || [])
    setTotal(dataOrder.total)
    setStatus(dataOrder.status)
    setActiveTab("form")
  }
  const handleEdit = async (e) => {
    e.preventDefault()

    console.log('📝 === HANDLE EDIT ORDER ===')
    console.log('📊 Estado actual:')
    console.log('  - customerId:', customerId)
    console.log('  - items:', items)
    console.log('  - total:', total)
    console.log('  - status:', status)

    if (!customerId || !items.length || !total || !status) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    const invalidItems = items.filter(item => 
      !item.itemType || !item.itemId || !item.quantity || item.quantity < 1
    )
    if (invalidItems.length > 0) {
      toast.error("Todos los productos deben tener tipo, producto y cantidad válidos")
      return
    }
    try {
      const editOrder = {
        customerId,
        items: items.map(item => ({
          itemType: item.itemType,
          itemId: item.itemId,
          quantity: parseInt(item.quantity),
          subtotal: parseFloat(item.subtotal || 0)
        })),
        total: parseFloat(total),
        status
      }
      console.log('📤 Enviando al servidor:', editOrder)
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editOrder)
      })
      console.log('🌐 Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log('❌ Error del servidor:', errorData)
        throw new Error(errorData.message || "Error al actualizar el pedido")
      }
      const responseData = await response.json()
      console.log('✅ Respuesta exitosa:', responseData)

      toast.success('Pedido actualizado exitosamente')
      clearForm()
      setActiveTab("list")
      fetchOrders()
    } catch (error) {
      console.error("Error al editar pedido:", error)
      toast.error(error.message || "Error al actualizar pedido")
    }
  }
  const clearForm = () => {
    setId("")
    setCustomerId("")
    setItems([])
    setTotal("")
    setStatus("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    customerId,
    setCustomerId,
    items,
    setItems,
    total,
    setTotal,
    status,
    setStatus,
    orders,
    customers,
    articles,
    artPieces,
    loading,
    saveOrder,
    deleteOrder,
    updateOrder,
    handleEdit,
    clearForm,
    fetchOrders,
    fetchCustomers,
    fetchArticles,
    fetchArtPieces
  }
}
export default useDataOrders