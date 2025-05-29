import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

// Un custom hook para manejar la logica de los proveedores
const useDataSuppliers = () => {
  // Estado para controlar la pestana activa (lista o formulario)
  const [activeTab, setActiveTab] = useState("list")
  // URL de la API para los proveedores
  const API = "http://localhost:4000/api/suppliers"
  // Estados para los campos del formulario de proveedor
  const [id, setId] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  // Estado para almacenar los datos de los proveedores
  const [suppliers, setSuppliers] = useState([])
  // Estado para controlar el estado de carga de datos
  const [loading, setLoading] = useState(true)

  // Funcion para obtener los proveedores desde la API
  const fetchSuppliers = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include" // Incluye cookies en la peticion
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los proveedores")
      }
      const data = await response.json()
      setSuppliers(data) // Actualiza el estado con los proveedores obtenidos
      setLoading(false) // Desactiva el estado de carga
    } catch (error) {
      console.error("Error al obtener proveedores:", error)
      toast.error("Error al cargar proveedores") // Muestra una notificacion de error
      setLoading(false)
    }
  }

  // useEffect para cargar los datos iniciales al montar el componente
  useEffect(() => {
    fetchSuppliers()
  }, []) // Se ejecuta solo una vez al inicio

  // Funcion para guardar un nuevo proveedor
  const saveSupplier = async (e) => {
    e.preventDefault() // Evita el comportamiento por defecto del formulario

    // Valida que todos los campos requeridos no esten vacios
    if (!supplierName || !email || !phoneNumber || !address) {
      toast.error("Todos los campos son requeridos")
      return
    }

    try {
      // Objeto con los datos del nuevo proveedor
      const newSupplier = {
        supplierName,
        email,
        phoneNumber,
        address
      }

      // Realiza la peticion POST a la API
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newSupplier) // Envia los datos como JSON
      })

      if (!response.ok) {
        throw new Error("Hubo un error al registrar el proveedor")
      }

      toast.success('Proveedor registrado exitosamente') // Muestra notificacion de exito
      fetchSuppliers() // Refresca la lista de proveedores
      clearForm() // Limpia el formulario
      setActiveTab("list") // Vuelve a la pestana de lista
    } catch (error) {
      console.error("Error al guardar proveedor:", error)
      toast.error("Error al registrar proveedor")
    }
  }

  // Funcion para eliminar un proveedor
  const deleteSupplier = async (id) => {
    try {
      // Realiza la peticion DELETE a la API
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

      toast.success('Proveedor eliminado exitosamente') // Muestra notificacion de exito
      fetchSuppliers() // Refresca la lista de proveedores
    } catch (error) {
      console.error("Error al eliminar proveedor:", error)
      toast.error("Error al eliminar proveedor")
    }
  }

  // Funcion para cargar los datos de un proveedor en el formulario para edicion
  const updateSupplier = async (dataSupplier) => {
    setId(dataSupplier._id)
    setSupplierName(dataSupplier.supplierName)
    setEmail(dataSupplier.email)
    setPhoneNumber(dataSupplier.phoneNumber)
    setAddress(dataSupplier.address)
    setActiveTab("form") // Cambia a la pestana de formulario
  }

  // Funcion para manejar la edicion de un proveedor existente
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!supplierName || !email || !phoneNumber || !address) {
      toast.error("Todos los campos son requeridos")
      return
    }

    try {
      // Objeto con los datos del proveedor a editar
      const editSupplier = {
        supplierName,
        email,
        phoneNumber,
        address
      }

      // Realiza la peticion PUT a la API para actualizar el proveedor
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
      clearForm() // Limpia el formulario
      setActiveTab("list") // Vuelve a la pestana de lista
      fetchSuppliers() // Refresca la lista de proveedores
    } catch (error) {
      console.error("Error al editar proveedor:", error)
      toast.error("Error al actualizar proveedor")
    }
  }

  // Funcion para limpiar el formulario
  const clearForm = () => {
    setId("")
    setSupplierName("")
    setEmail("")
    setPhoneNumber("")
    setAddress("")
  }

  // Retorna los estados y funciones para ser usados por el componente
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
