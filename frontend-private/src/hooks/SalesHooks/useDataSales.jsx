import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataSales = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/sales"
  const [id, setId] = useState("")
  const [orderId, setOrderId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [address, setAddress] = useState("")
  const [status, setStatus] = useState("")
  const [sales, setSales] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSales = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las ventas")
      }
      const data = await response.json()
      setSales(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener ventas:", error)
      toast.error("Error al cargar ventas")
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
      // o pedidos con status 'Entregado' que podrían convertirse en venta
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

  const saveSale = async (e) => {
    e.preventDefault()
    
    if (!orderId || !paymentMethod || !address || !status) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const newSale = {
        orderId,
        paymentMethod,
        address,
        status
      }
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newSale)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar la venta")
      }
      toast.success('Venta registrada exitosamente')
      fetchSales()
      fetchOrders() // Actualizar la lista de pedidos disponibles
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar venta:", error)
      toast.error(error.message || "Error al registrar venta")
    }
  }
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
  const updateSale = async (dataSale) => {
    setId(dataSale._id)
    setOrderId(dataSale.orderId?._id || dataSale.orderId)
    setPaymentMethod(dataSale.paymentMethod)
    setAddress(dataSale.address)
    setStatus(dataSale.status)
    setActiveTab("form")
  }
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!orderId || !paymentMethod || !address || !status) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const editSale = {
        orderId,
        paymentMethod,
        address,
        status
      }
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editSale)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar la venta")
      }
      toast.success('Venta actualizada exitosamente')
      clearForm()
      setActiveTab("list")
      fetchSales()
    } catch (error) {
      console.error("Error al editar venta:", error)
      toast.error(error.message || "Error al actualizar venta")
    }
  }
  const clearForm = () => {
    setId("")
    setOrderId("")
    setPaymentMethod("")
    setAddress("")
    setStatus("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    orderId,
    setOrderId,
    paymentMethod,
    setPaymentMethod,
    address,
    setAddress,
    status,
    setStatus,
    sales,
    orders,
    loading,
    saveSale,
    deleteSale,
    updateSale,
    handleEdit,
    clearForm,
    fetchSales,
    fetchOrders
  }
}
export default useDataSales