import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataArticles = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/articles"
  const [id, setId] = useState("")
  const [articleName, setArticleName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [stock, setStock] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [supplierId, setSupplierId] = useState("")
  const [discount, setDiscount] = useState("")
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

  const saveArticle = async (e) => {
    e.preventDefault()
    
    if (!articleName || !price || !description || !stock || !categoryId || !supplierId) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }

    try {
      const formData = new FormData()
      formData.append('articleName', articleName)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('stock', stock)
      formData.append('categoryId', categoryId)
      formData.append('supplierId', supplierId)
      formData.append('discount', discount || 0)
      
      if (image) {
        formData.append('image', image)
      }

      const response = await fetch(API, {
        method: "POST",
        credentials: "include",
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar el artículo")
      }

      toast.success('Artículo registrado exitosamente')
      fetchArticles()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar artículo:", error)
      toast.error(error.message || "Error al registrar artículo")
    }
  }

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

  const updateArticle = async (dataArticle) => {
    setId(dataArticle._id)
    setArticleName(dataArticle.articleName)
    setPrice(dataArticle.price)
    setDescription(dataArticle.description)
    setStock(dataArticle.stock)
    setCategoryId(dataArticle.categoryId?._id || dataArticle.categoryId)
    setSupplierId(dataArticle.supplierId?._id || dataArticle.supplierId)
    setDiscount(dataArticle.discount || 0)
    // No seteamos la imagen para evitar problemas
    setImage(null)
    setActiveTab("form")
  }

  const handleEdit = async (e) => {
    e.preventDefault()

    if (!articleName || !price || !description || !stock || !categoryId || !supplierId) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const formData = new FormData()
      formData.append('articleName', articleName)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('stock', stock)
      formData.append('categoryId', categoryId)
      formData.append('supplierId', supplierId)
      formData.append('discount', discount || 0)
      
      if (image) {
        formData.append('image', image)
      }
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar el artículo")
      }
      toast.success('Artículo actualizado exitosamente')
      clearForm()
      setActiveTab("list")
      fetchArticles()
    } catch (error) {
      console.error("Error al editar artículo:", error)
      toast.error(error.message || "Error al actualizar artículo")
    }
  }
  const clearForm = () => {
    setId("")
    setArticleName("")
    setPrice("")
    setDescription("")
    setImage(null)
    setStock("")
    setCategoryId("")
    setSupplierId("")
    setDiscount("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    articleName,
    setArticleName,
    price,
    setPrice,
    description,
    setDescription,
    image,
    setImage,
    stock,
    setStock,
    categoryId,
    setCategoryId,
    supplierId,
    setSupplierId,
    discount,
    setDiscount,
    articles,
    categories,
    suppliers,
    loading,
    saveArticle,
    deleteArticle,
    updateArticle,
    handleEdit,
    clearForm,
    fetchArticles,
    fetchCategories,
    fetchSuppliers
  }
}
export default useDataArticles