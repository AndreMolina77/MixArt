import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

// Hook personalizado para manejar clientes
const useDataCustomers = () => {
  // Estado para cambiar entre lista y formulario
  const [activeTab, setActiveTab] = useState("list")

  // URL de la API
  const API = "http://localhost:4000/api/customers"

  // Estados del formulario
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [issNumber, setIssNumber] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  // Lista de clientes y estado de carga
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  // Obtener clientes desde la API
  const fetchCustomers = async () => {
    try {
      const response = await fetch(API, { credentials: "include" })
      if (!response.ok) throw new Error("Error al obtener clientes")
      const data = await response.json()
      setCustomers(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
      toast.error("Error al cargar clientes")
      setLoading(false)
    }
  }

  // Ejecutar al montar el componente
  useEffect(() => {
    fetchCustomers()
  }, [])

  // Guardar nuevo cliente
  const saveCustomer = async (e) => {
    e.preventDefault()

    // Validar campos obligatorios
    if (!name || !lastName || !username || !email || !password || !phoneNumber || !issNumber) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }

    try {
      const newCustomer = {
        name,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        profilePic,
        issNumber,
        isVerified
      }

      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newCustomer)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al registrar cliente")
      }

      toast.success("Cliente registrado exitosamente")
      fetchCustomers()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      toast.error(error.message || "Error al registrar cliente")
    }
  }

  // Eliminar cliente por ID
  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })

      if (!response.ok) throw new Error("Error al eliminar cliente")

      toast.success("Cliente eliminado exitosamente")
      fetchCustomers()
    } catch (error) {
      console.error("Error al eliminar cliente:", error)
      toast.error("Error al eliminar cliente")
    }
  }

  // Cargar datos en el formulario para editar
  const updateCustomer = async (dataCustomer) => {
    setId(dataCustomer._id)
    setName(dataCustomer.name)
    setLastName(dataCustomer.lastName)
    setUsername(dataCustomer.username)
    setEmail(dataCustomer.email)
    // No se carga password por seguridad
    setPhoneNumber(dataCustomer.phoneNumber)
    setProfilePic(dataCustomer.profilePic || "")
    setIssNumber(dataCustomer.issNumber)
    setIsVerified(dataCustomer.isVerified)
    setActiveTab("form")
  }

  // Guardar cambios del cliente editado
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!name || !lastName || !username || !email || !phoneNumber || !issNumber) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }

    try {
      const editCustomer = {
        name,
        lastName,
        username,
        email,
        phoneNumber,
        profilePic,
        issNumber,
        isVerified
      }

      // Incluir password solo si fue ingresado
      if (password && password.trim() !== "") {
        editCustomer.password = password
      }

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editCustomer)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar cliente")
      }

      toast.success("Cliente actualizado exitosamente")
      clearForm()
      setActiveTab("list")
      fetchCustomers()
    } catch (error) {
      console.error("Error al editar cliente:", error)
      toast.error(error.message || "Error al actualizar cliente")
    }
  }

  // Limpiar formulario
  const clearForm = () => {
    setId("")
    setName("")
    setLastName("")
    setUsername("")
    setEmail("")
    setPassword("")
    setPhoneNumber("")
    setProfilePic("")
    setIssNumber("")
    setIsVerified(false)
  }

  // Exportar funciones y estados
  return {
    activeTab,
    setActiveTab,
    id,
    name,
    setName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    profilePic,
    setProfilePic,
    issNumber,
    setIssNumber,
    isVerified,
    setIsVerified,
    customers,
    loading,
    saveCustomer,
    deleteCustomer,
    updateCustomer,
    handleEdit,
    clearForm,
    fetchCustomers
  }
}

export default useDataCustomers
