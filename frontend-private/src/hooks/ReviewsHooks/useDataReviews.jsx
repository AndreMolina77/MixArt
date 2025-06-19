import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataReviews = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/reviews"
  const [id, setId] = useState("")
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
  const [itemType, setItemType] = useState("")
  const [itemId, setItemId] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [reviews, setReviews] = useState([])
  const [customers, setCustomers] = useState([])
  const [articles, setArticles] = useState([])
  const [artPieces, setArtPieces] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para reseñas - usuario no autorizado")
        setReviews([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las reseñas")
      }
      const data = await response.json()
      setReviews(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener reseñas:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar reseñas")
      }
      setLoading(false)
    }
  }
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/customers", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener clientes")
      }
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
    }
  }
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/articles", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener artículos")
      }
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error("Error al obtener artículos:", error)
    }
  }
  const fetchArtPieces = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/artpieces", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener piezas de arte")
      }
      const data = await response.json()
      setArtPieces(data)
    } catch (error) {
      console.error("Error al obtener piezas de arte:", error)
    }
  }
  useEffect(() => {
    fetchReviews()
    fetchCustomers()
    fetchArticles()
    fetchArtPieces()
  }, [])

  const saveReview = async (e) => {
    e.preventDefault()
    
    if (!rating || !comment || !itemType || !itemId || !customerId) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const newReview = {
        rating: parseInt(rating),
        comment,
        itemType,
        itemId,
        customerId
      }
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newReview)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar la reseña")
      }
      toast.success('Reseña registrada exitosamente')
      fetchReviews()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar reseña:", error)
      toast.error(error.message || "Error al registrar reseña")
    }
  }

  const deleteReview = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la reseña")
      }
      toast.success('Reseña eliminada exitosamente')
      fetchReviews()
    } catch (error) {
      console.error("Error al eliminar reseña:", error)
      toast.error("Error al eliminar reseña")
    }
  }
  const updateReview = async (dataReview) => {
    setId(dataReview._id)
    setRating(dataReview.rating)
    setComment(dataReview.comment)
    setItemType(dataReview.itemType)
    setItemId(dataReview.itemId?._id || dataReview.itemId)
    setCustomerId(dataReview.customerId?._id || dataReview.customerId)
    setActiveTab("form")
  }

  const handleEdit = async (e) => {
    e.preventDefault()

    if (!rating || !comment || !itemType || !itemId || !customerId) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const editReview = {
        rating: parseInt(rating),
        comment,
        itemType,
        itemId,
        customerId
      }
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editReview)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar la reseña")
      }
      toast.success('Reseña actualizada exitosamente')
      clearForm()
      setActiveTab("list")
      fetchReviews()
    } catch (error) {
      console.error("Error al editar reseña:", error)
      toast.error(error.message || "Error al actualizar reseña")
    }
  }
  const clearForm = () => {
    setId("")
    setRating("")
    setComment("")
    setItemType("")
    setItemId("")
    setCustomerId("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    rating,
    setRating,
    comment,
    setComment,
    itemType,
    setItemType,
    itemId,
    setItemId,
    customerId,
    setCustomerId,
    reviews,
    customers,
    articles,
    artPieces,
    loading,
    saveReview,
    deleteReview,
    updateReview,
    handleEdit,
    clearForm,
    fetchReviews,
    fetchCustomers,
    fetchArticles,
    fetchArtPieces
  }
}
export default useDataReviews