import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataCategories = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/categories"
  const [id, setId] = useState("")
  const [names, setNames] = useState("") // Corregido: debe ser 'names' según el modelo
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las categorías")
      }
      const data = await response.json()
      setCategories(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener categorías:", error)
      toast.error("Error al cargar categorías")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const saveCategory = async (e) => {
    e.preventDefault()
    
    if (!names || !description) {
      toast.error("Todos los campos son requeridos")
      return
    }

    try {
      const newCategory = {
        names, // Corregido: debe ser 'names' según el modelo
        description
      }

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newCategory)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar la categoría")
      }

      toast.success('Categoría registrada exitosamente')
      fetchCategories()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar categoría:", error)
      toast.error(error.message || "Error al registrar categoría")
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la categoría")
      }

      toast.success('Categoría eliminada exitosamente')
      fetchCategories()
    } catch (error) {
      console.error("Error al eliminar categoría:", error)
      toast.error("Error al eliminar categoría")
    }
  }

  const updateCategory = async (dataCategory) => {
    setId(dataCategory._id)
    setNames(dataCategory.names) // Corregido: debe ser 'names' según el modelo
    setDescription(dataCategory.description)
    setActiveTab("form")
  }

  const handleEdit = async (e) => {
    e.preventDefault()

    if (!names || !description) {
      toast.error("Todos los campos son requeridos")
      return
    }

    try {
      const editCategory = {
        names, // Corregido: debe ser 'names' según el modelo
        description
      }

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
        throw new Error(errorData.message || "Error al actualizar la categoría")
      }

      toast.success('Categoría actualizada exitosamente')
      clearForm()
      setActiveTab("list")
      fetchCategories()
    } catch (error) {
      console.error("Error al editar categoría:", error)
      toast.error(error.message || "Error al actualizar categoría")
    }
  }

  const clearForm = () => {
    setId("")
    setNames("")
    setDescription("")
  }

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