import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

// Hook personalizado para manejar empleados
const useDataEmployees = () => {
  // Estado para cambiar entre pestañas: lista o formulario
  const [activeTab, setActiveTab] = useState("list")

  // URL de la API
  const API = "http://localhost:4000/api/employees"

  // Estados del formulario
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

  // Lista de empleados y estado de carga
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  // Obtener empleados desde la API
  const fetchEmployees = async () => {
    try {
      const response = await fetch(API, { credentials: "include" })
      if (!response.ok) throw new Error("Hubo un error al obtener los empleados")
      const data = await response.json()
      setEmployees(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener empleados:", error)
      toast.error("Error al cargar empleados")
      setLoading(false)
    }
  }

  // Ejecutar fetch al montar el componente
  useEffect(() => {
    fetchEmployees()
  }, [])

  // Guardar nuevo empleado
  const saveEmployee = async (e) => {
    e.preventDefault()

    // Validacion de campos obligatorios
    if (!name || !lastName || !username || !email || !password || !phoneNumber || !userType || !issNumber) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }

    // Validacion del tipo de usuario
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
        headers: { "Content-Type": "application/json" },
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

  // Eliminar empleado por ID
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })

      if (!response.ok) throw new Error("Hubo un error al eliminar el empleado")

      toast.success('Empleado eliminado exitosamente')
      fetchEmployees()
    } catch (error) {
      console.error("Error al eliminar empleado:", error)
      toast.error("Error al eliminar empleado")
    }
  }

  // Cargar datos del empleado para edicion
  const updateEmployee = async (dataEmployee) => {
    setId(dataEmployee._id)
    setName(dataEmployee.name)
    setLastName(dataEmployee.lastName)
    setUsername(dataEmployee.username)
    setEmail(dataEmployee.email)
    // No se carga la contrasena por seguridad
    setPhoneNumber(dataEmployee.phoneNumber)
    setUserType(dataEmployee.userType)
    setProfilePic(dataEmployee.profilePic || "")
    setIssNumber(dataEmployee.issNumber)
    setIsVerified(dataEmployee.isVerified)
    setActiveTab("form")
  }

  // Guardar cambios de empleado editado
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!name || !lastName || !username || !email || !phoneNumber || !userType || !issNumber) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }

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

      // Incluir contrasena si fue proporcionada
      if (password && password.trim() !== "") {
        editEmployee.password = password
      }

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

  // Limpiar formulario
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

  // Valores y funciones expuestas para el componente que use este hook
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
