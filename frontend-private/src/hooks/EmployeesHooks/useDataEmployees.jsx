import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataEmployees = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/employees"
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userType, setUserType] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [issNumber, setIssNumber] = useState("")
  const [isVerified, setIsVerified] = useState(false)
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
  const saveEmployee = async (e) => {
    e.preventDefault()  
    if (!name || !lastName || !username || !email || !password || !phoneNumber || !userType || !issNumber) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    // Validar que el userType sea valido
    if (!['vendedor', 'artista'].includes(userType)) {
      toast.error("El tipo de usuario debe ser 'vendedor' o 'artista'")
      return
    }
    try {
      const newEmployee = {
        name,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        userType,
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
        body: JSON.stringify(newEmployee)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar el empleado")
      }
      toast.success('Empleado registrado exitosamente')
      fetchEmployees()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar empleado:", error)
      toast.error(error.message || "Error al registrar empleado")
    }
  }
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
  const updateEmployee = async (dataEmployee) => {
    setId(dataEmployee._id)
    setName(dataEmployee.name)
    setLastName(dataEmployee.lastName)
    setUsername(dataEmployee.username)
    setEmail(dataEmployee.email)
    // No seteamos la contraseña por seguridad
    setPhoneNumber(dataEmployee.phoneNumber)
    setUserType(dataEmployee.userType)
    setProfilePic(dataEmployee.profilePic || "")
    setIssNumber(dataEmployee.issNumber)
    setIsVerified(dataEmployee.isVerified)
    setActiveTab("form")
  }
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!name || !lastName || !username || !email || !phoneNumber || !userType || !issNumber) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    // Validar que el userType sea valido
    if (!['vendedor', 'artista'].includes(userType)) {
      toast.error("El tipo de usuario debe ser 'vendedor' o 'artista'")
      return
    }
    try {
      const editEmployee = {
        name,
        lastName,
        username,
        email,
        phoneNumber,
        userType,
        profilePic,
        issNumber,
        isVerified
      }
      // Solo incluir password si se proporcionó una nueva
      if (password && password.trim() !== "") {
        editEmployee.password = password
      }
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editEmployee)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar el empleado")
      }
      toast.success('Empleado actualizado exitosamente')
      clearForm()
      setActiveTab("list")
      fetchEmployees()
    } catch (error) {
      console.error("Error al editar empleado:", error)
      toast.error(error.message || "Error al actualizar empleado")
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
    setUserType("")
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
    userType,
    setUserType,
    profilePic,
    setProfilePic,
    issNumber,
    setIssNumber,
    isVerified,
    setIsVerified,
    employees,
    loading,
    saveEmployee,
    deleteEmployee,
    updateEmployee,
    handleEdit,
    clearForm,
    fetchEmployees
  }
}
export default useDataEmployees