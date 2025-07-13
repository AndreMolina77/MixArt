import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataReviews = () => {
  const API = "http://localhost:4000/api/reviews"
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
  const createHandlers = (API) => ({
    data: reviews,
    loading,
    onAdd: async (data) => {
      try {
        const response = await fetch(`${API}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar reseña")
        }
        toast.success('Reseña registrada exitosamente')
        fetchReviews()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar reseña")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        const response = await fetch(`${API}/reviews/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar reseña")
        }
        toast.success('Reseña actualizada exitosamente')
        fetchReviews()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar reseña")
        throw error
      }
    }, onDelete: deleteReview
  })
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
  return {
    reviews,
    customers,
    articles,
    artPieces,
    loading,
    deleteReview,
    fetchReviews,
    fetchCustomers,
    fetchArticles,
    fetchArtPieces,
    createHandlers
  }
}
export default useDataReviews