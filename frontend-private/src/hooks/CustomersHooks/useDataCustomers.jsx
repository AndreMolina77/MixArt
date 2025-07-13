import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataCustomers = () => {
  const API = "http://localhost:4000/api/customers"
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCustomers = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para clientes - usuario no autorizado")
        setCustomers([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los clientes")
      }
      const data = await response.json()
      setCustomers(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar clientes")
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCustomers()
  }, [])
  const createHandlers = (API) => ({
    data: customers,
    loading,
    onAdd: async (data) => { 
      try {
        const response = await fetch(`${API}/customers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar cliente")
        }
        toast.success('Cliente registrado exitosamente')
        fetchCustomers()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar cliente")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        const response = await fetch(`${API}/customers/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar cliente")
        }
        toast.success('Cliente actualizado exitosamente')
        fetchCustomers()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar cliente")
        throw error
      }
    }, onDelete: deleteCustomer
  })
  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el cliente")
      }
      toast.success('Cliente eliminado exitosamente')
      fetchCustomers()
    } catch (error) {
      console.error("Error al eliminar cliente:", error)
      toast.error("Error al eliminar cliente")
    }
  }
  return {
    customers,
    loading,
    deleteCustomer,
    fetchCustomers,
    createHandlers
  }
}
export default useDataCustomers