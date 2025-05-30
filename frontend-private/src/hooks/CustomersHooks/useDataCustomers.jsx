import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataCustomers = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/customers"
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
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCustomers = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los clientes")
      }
      const data = await response.json()
      setCustomers(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
      toast.error("Error al cargar clientes")
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCustomers()
  }, [])
  const saveCustomer = async (e) => {
    e.preventDefault()
    
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
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newCustomer)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar el cliente")
      }
      toast.success('Cliente registrado exitosamente')
      fetchCustomers()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      toast.error(error.message || "Error al registrar cliente")
    }
  }
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
  const updateCustomer = async (dataCustomer) => {
    setId(dataCustomer._id)
    setName(dataCustomer.name)
    setLastName(dataCustomer.lastName)
    setUsername(dataCustomer.username)
    setEmail(dataCustomer.email)
    // No seteamos la contraseña por seguridad
    setPhoneNumber(dataCustomer.phoneNumber)
    setProfilePic(dataCustomer.profilePic || "")
    setIssNumber(dataCustomer.issNumber)
    setIsVerified(dataCustomer.isVerified)
    setActiveTab("form")
  }
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
      // Solo incluir password si se proporciono una nueva
      if (password && password.trim() !== "") {
        editCustomer.password = password
      }
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editCustomer)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar el cliente")
      }
      toast.success('Cliente actualizado exitosamente')
      clearForm()
      setActiveTab("list")
      fetchCustomers()
    } catch (error) {
      console.error("Error al editar cliente:", error)
      toast.error(error.message || "Error al actualizar cliente")
    }
  }
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