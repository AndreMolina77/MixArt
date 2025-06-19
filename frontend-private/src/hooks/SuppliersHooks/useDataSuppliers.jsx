import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataSuppliers = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/suppliers"
  const [id, setId] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
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
  const saveSupplier = async (e) => {
    e.preventDefault()
    
    if (!supplierName || !email || !phoneNumber || !address) {
      toast.error("Todos los campos son requeridos")
      return
    }
    try {
      const newSupplier = {
        supplierName,
        email,
        phoneNumber,
        address
      }
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newSupplier)
      })
      if (!response.ok) {
        throw new Error("Hubo un error al registrar el proveedor")
      }
      toast.success('Proveedor registrado exitosamente')
      fetchSuppliers()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar proveedor:", error)
      toast.error("Error al registrar proveedor")
    }
  }
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
  const updateSupplier = async (dataSupplier) => {
    setId(dataSupplier._id)
    setSupplierName(dataSupplier.supplierName)
    setEmail(dataSupplier.email)
    setPhoneNumber(dataSupplier.phoneNumber)
    setAddress(dataSupplier.address)
    setActiveTab("form")
  }
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!supplierName || !email || !phoneNumber || !address) {
      toast.error("Todos los campos son requeridos")
      return
    }
    try {
      const editSupplier = {
        supplierName,
        email,
        phoneNumber,
        address
      }
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editSupplier)
      })
      if (!response.ok) {
        throw new Error("Error al actualizar el proveedor")
      }
      toast.success('Proveedor actualizado exitosamente')
      clearForm()
      setActiveTab("list")
      fetchSuppliers()
    } catch (error) {
      console.error("Error al editar proveedor:", error)
      toast.error("Error al actualizar proveedor")
    }
  }
  const clearForm = () => {
    setId("")
    setSupplierName("")
    setEmail("")
    setPhoneNumber("")
    setAddress("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    supplierName,
    setSupplierName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    suppliers,
    loading,
    saveSupplier,
    deleteSupplier,
    updateSupplier,
    handleEdit,
    clearForm,
    fetchSuppliers
  }
}
export default useDataSuppliers