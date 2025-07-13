import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataArtPieces = () => {
  const API = "http://localhost:4000/api/artpieces"
  const [artPieces, setArtPieces] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArtPieces = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      // Si es 403 (sin permisos), no mostrar error
      if (response.status === 403) {
        console.log("⚠️ Sin permisos para piezas de arte - usuario no autorizado")
        setArtPieces([])
        setLoading(false)
        return
      }
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las piezas de arte")
      }
      const data = await response.json()
      setArtPieces(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener piezas de arte:", error)
      // Solo mostrar toast si NO es error de permisos
      if (!error.message.includes("403") && !error.message.includes("sin permisos")) {
        toast.error("Error al cargar piezas de arte")
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
        throw new Error("Error al obtener categorías")
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error al obtener categorías:", error)
    }
  }
  useEffect(() => {
    fetchArtPieces()
    fetchCategories()
  }, [])
  const createHandlers = (API) => ({
    data: artPieces,
    loading,
    onAdd: async (data) => {
      try {
        let body
        let headers = { credentials: "include" }
        
        if (data.image && data.image instanceof File) {
          const formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          body = formData
        } else {
          console.log('📝 No file, using JSON')
          headers["Content-Type"] = "application/json"
          body = JSON.stringify(data)
        }
        const response = await fetch(`${API}/artpieces`, {
          method: "POST",
          headers,
          credentials: "include",
          body
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al registrar pieza de arte")
        }
        toast.success('Pieza de arte registrada exitosamente')
        fetchArtPieces()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al registrar pieza de arte")
        throw error
      }
    }, onEdit: async (id, data) => {
      try {
        let body
        let headers = { credentials: "include" }
        
        if (data.image && data.image instanceof File) {
          const formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          body = formData
        } else {
          headers["Content-Type"] = "application/json"
          body = JSON.stringify(data)
        }
        const response = await fetch(`${API}/artpieces/${id}`, {
          method: "PUT",
          headers,
          credentials: "include",
          body
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al actualizar pieza de arte")
        }
        toast.success('Pieza de arte actualizada exitosamente')
        fetchArtPieces()
      } catch (error) {
        console.error("Error:", error)
        toast.error(error.message || "Error al actualizar pieza de arte")
        throw error
      }
    }, onDelete: deleteArtPiece
  })
  const deleteArtPiece = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la pieza de arte")
      }
      toast.success('Pieza de arte eliminada exitosamente')
      fetchArtPieces()
    } catch (error) {
      console.error("Error al eliminar pieza de arte:", error)
      toast.error("Error al eliminar pieza de arte")
    }
  }
  return {
    artPieces,
    categories,
    loading,
    deleteArtPiece,
    fetchArtPieces,
    fetchCategories,
    createHandlers
  }
}
export default useDataArtPieces