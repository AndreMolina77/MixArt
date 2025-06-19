import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataCategories = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/categories"
  const [id, setId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para categorías - usuario no autorizado")
        setCategories([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las categorías")
      }
      const data = await response.json()
      setCategories(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener categorías:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar categorías")
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  const saveCategory = async (e) => {
    e.preventDefault()
    
    console.log('💾 === DEBUG HOOK - SAVE CATEGORY ===')
    console.log('📊 Estado actual del hook:')
    console.log('  - categoryName:', categoryName)
    console.log('  - description:', description)
    console.log('  - categoryName tipo:', typeof categoryName)
    console.log('  - description tipo:', typeof description)
    console.log('  - categoryName length:', categoryName?.length)
    console.log('  - description length:', description?.length)
    
    if (!categoryName || !description) {
      console.log('❌ VALIDACIÓN FALLÓ en hook:')
      console.log('  - categoryName válido:', !!categoryName)
      console.log('  - description válido:', !!description)
      toast.error("Todos los campos son requeridos")
      return
    }
    try {
      const newCategory = {
        categoryName,
        description
      }
      console.log('📦 Objeto a enviar al servidor:', newCategory)
      
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newCategory)
      })
      console.log('🌐 Response status:', response.status)
      console.log('🌐 Response ok:', response.ok)
      if (!response.ok) {
        const errorData = await response.json()
        console.log('❌ Error del servidor:', errorData)
        throw new Error(errorData.message || "Hubo un error al registrar la categoría")
      }
      const responseData = await response.json()
      console.log('✅ Respuesta del servidor:', responseData)
      
      toast.success('Categoría registrada exitosamente')
      fetchCategories()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("❌ Error en saveCategory:", error)
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
    setCategoryName(dataCategory.categoryName)
    setDescription(dataCategory.description)
    setActiveTab("form")
  }
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!categoryName || !description) {
      toast.error("Todos los campos son requeridos")
      return
    }
    try {
      const editCategory = {
        categoryName, 
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
    setCategoryName("")
    setDescription("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    categoryName,
    setCategoryName,
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