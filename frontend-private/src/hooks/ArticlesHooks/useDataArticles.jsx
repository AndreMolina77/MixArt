import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataArticles = () => {
  const API = "http://localhost:4000/api/articles"
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArticles = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para artículos - usuario no autorizado")
        setArticles([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los artículos")
      }
      const data = await response.json()
      setArticles(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener artículos:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar artículos")
      }
      setLoading(false)
    }
  }
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener categorías de productos")
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error al obtener categorías:", error)
    }
  }
  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/suppliers", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener proveedores de productos")
      }
      const data = await response.json()
      setSuppliers(data)
    } catch (error) {
      console.error("Error al obtener proveedores:", error)
    }
  }
  useEffect(() => {
    fetchArticles()
    fetchCategories()
    fetchSuppliers()
  }, [])
  const createHandlers = (API) => ({
    data: articles,
    loading,
    onAdd: async (data) => {
      try {
        // Usar FormData si hay imagen
        let body
        let headers = { credentials: "include" }
        
        if (data.image && data.image instanceof File) {
          const formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          body = formData
          // No se establece el Content-Type para FormData, dejar que el navegador lo establezca
        } else {
          headers["Content-Type"] = "application/json"
          body = JSON.stringify(data)
        }
        const response = await fetch(`${API}/articles`, {
          method: "POST",
          headers,
          credentials: "include",
          body
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar artículo")
        }
        toast.success('Artículo registrado exitosamente')
        fetchArticles()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar artículo")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        // Usar FormData si hay imagen
        let body
        let headers = { credentials: "include" }
        
        if (data.image && data.image instanceof File) {
          const formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          body = formData
          // No se establece el Content-Type para FormData, dejar que el navegador lo establezca
        } else {
          headers["Content-Type"] = "application/json"
          body = JSON.stringify(data)
        }
        const response = await fetch(`${API}/articles/${id}`, {
          method: "PUT",
          headers,
          credentials: "include",
          body
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar artículo")
        }
        toast.success('Artículo actualizado exitosamente')
        fetchArticles()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar artículo")
        throw error
      }
    }, onDelete: deleteArticle
  })
  const deleteArticle = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el artículo")
      }
      toast.success('Artículo eliminado exitosamente')
      fetchArticles()
    } catch (error) {
      console.error("Error al eliminar artículo:", error)
      toast.error("Error al eliminar artículo")
    }
  }
  return {
    articles,
    categories,
    suppliers,
    loading,
    fetchArticles,
    fetchCategories,
    fetchSuppliers,
    deleteArticle,
    createHandlers
  }
}
export default useDataArticles