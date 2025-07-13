import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataSuppliers = () => {
  const API = "http://localhost:4000/api/suppliers"
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para proveedores - usuario no autorizado")
        setSuppliers([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los proveedores")
      }
      const data = await response.json()
      setSuppliers(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener proveedores:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar proveedores")
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSuppliers()
  }, [])
  const createHandlers = (API) => ({
    data: suppliers,
    loading,
    onAdd: async (data) => {
      try {
        const response = await fetch(`${API}/suppliers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar proveedor")
        }
        toast.success('Proveedor registrado exitosamente')
        fetchSuppliers()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar proveedor")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        const response = await fetch(`${API}/suppliers/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar proveedor")
        }
        toast.success('Proveedor actualizado exitosamente')
        fetchSuppliers()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar proveedor")
        throw error
      }
    }, onDelete: deleteSupplier
  })
  const deleteSupplier = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el proveedor")
      }
      toast.success('Proveedor eliminado exitosamente')
      fetchSuppliers()
    } catch (error) {
      console.error("Error al eliminar proveedor:", error)
      toast.error("Error al eliminar proveedor")
    }
  }
  return {
    suppliers,
    loading,
    deleteSupplier,
    fetchSuppliers,
    createHandlers
  }
}
export default useDataSuppliers