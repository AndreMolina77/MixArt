import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

// Un custom hook para manejar la logica de las categorias
const useDataCategories = () => {
  // Estado para controlar la pestana activa (lista o formulario)
  const [activeTab, setActiveTab] = useState("list")
  // URL de la API para las categorias
  const API = "http://localhost:4000/api/categories"
  // Estados para los campos del formulario de categoria
  const [id, setId] = useState("")
  const [names, setNames] = useState("") // Estado para el nombre de la categoria
  const [description, setDescription] = useState("")
  // Estado para almacenar los datos de las categorias
  const [categories, setCategories] = useState([])
  // Estado para controlar el estado de carga de datos
  const [loading, setLoading] = useState(true)

  // Funcion para obtener las categorias desde la API
  const fetchCategories = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include" // Incluye cookies en la peticion
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las categorias")
      }
      const data = await response.json()
      setCategories(data) // Actualiza el estado con las categorias obtenidas
      setLoading(false) // Desactiva el estado de carga
    } catch (error) {
      console.error("Error al obtener categorias:", error)
      toast.error("Error al cargar categorias") // Muestra una notificacion de error
      setLoading(false)
    }
  }

  // useEffect para cargar los datos iniciales al montar el componente
  useEffect(() => {
    fetchCategories()
  }, []) // Se ejecuta solo una vez al inicio

  // Funcion para guardar una nueva categoria
  const saveCategory = async (e) => {
    e.preventDefault() // Evita el comportamiento por defecto del formulario

    // Valida que todos los campos requeridos no esten vacios
    if (!names || !description) {
      toast.error("Todos los campos son requeridos")
      return
    }

    try {
      // Objeto con los datos de la nueva categoria
      const newCategory = {
        names, // Nombre de la categoria
        description
      }

      // Realiza la peticion POST a la API
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newCategory) // Envia los datos como JSON
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar la categoria")
      }

      toast.success('Categoria registrada exitosamente') // Muestra notificacion de exito
      fetchCategories() // Refresca la lista de categorias
      clearForm() // Limpia el formulario
      setActiveTab("list") // Vuelve a la pestana de lista
    } catch (error) {
      console.error("Error al guardar categoria:", error)
      toast.error(error.message || "Error al registrar categoria")
    }
  }

  // Funcion para eliminar una categoria
  const deleteCategory = async (id) => {
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
        throw new Error("Hubo un error al eliminar la categoria")
      }

      toast.success('Categoria eliminada exitosamente') // Muestra notificacion de exito
      fetchCategories() // Refresca la lista de categorias
    } catch (error) {
      console.error("Error al eliminar categoria:", error)
      toast.error("Error al eliminar categoria")
    }
  }

  // Funcion para cargar los datos de una categoria en el formulario para edicion
  const updateCategory = async (dataCategory) => {
    setId(dataCategory._id)
    setNames(dataCategory.names) // Setea el nombre de la categoria
    setDescription(dataCategory.description)
    setActiveTab("form") // Cambia a la pestana de formulario
  }

  // Funcion para manejar la edicion de una categoria existente
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!names || !description) {
      toast.error("Todos los campos son requeridos")
      return
    }

    try {
      // Objeto con los datos de la categoria a editar
      const editCategory = {
        names, // Nombre de la categoria
        description
      }

      // Realiza la peticion PUT a la API para actualizar la categoria
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editCategory)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar la categoria")
      }

      toast.success('Categoria actualizada exitosamente')
      clearForm() // Limpia el formulario
      setActiveTab("list") // Vuelve a la pestana de lista
      fetchCategories() // Refresca la lista de categorias
    } catch (error) {
      console.error("Error al editar categoria:", error)
      toast.error(error.message || "Error al actualizar categoria")
    }
  }

  // Funcion para limpiar el formulario
  const clearForm = () => {
    setId("")
    setNames("")
    setDescription("")
  }

  // Retorna los estados y funciones para ser usados por el componente
  return {
    activeTab,
    setActiveTab,
    id,
    names,
    setNames,
    description,
    setDescription,
    categories,
    loading,
    saveCategory,
    deleteCategory,
    updateCategory,
    handleEdit,
    clearForm,
    fetchCategories
  }
}

export default useDataCategories