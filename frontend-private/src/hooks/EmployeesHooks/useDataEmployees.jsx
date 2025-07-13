import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataEmployees = () => {
  const API = "http://localhost:4000/api/employees"
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para empleados - usuario no autorizado")
        setEmployees([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los empleados")
      }
      const data = await response.json()
      setEmployees(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener empleados:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar empleados")
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchEmployees()
  }, [])
  const createHandlers = (API) => ({
    data: employees,
    loading,
    onAdd: async (data) => { 
      try {
        const response = await fetch(`${API}/employees`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar empleado")
        }
        toast.success('Empleado registrado exitosamente')
        fetchEmployees()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar empleado")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        const response = await fetch(`${API}/employees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar empleado")
        }
        toast.success('Empleado actualizado exitosamente')
        fetchEmployees()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar empleado")
        throw error
      }
    }, onDelete: deleteEmployee
  })
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el empleado")
      }
      toast.success('Empleado eliminado exitosamente')
      fetchEmployees()
    } catch (error) {
      console.error("Error al eliminar empleado:", error)
      toast.error("Error al eliminar empleado")
    }
  }
  return {
    employees,
    loading,
    deleteEmployee,
    fetchEmployees,
    createHandlers
  }
}
export default useDataEmployees