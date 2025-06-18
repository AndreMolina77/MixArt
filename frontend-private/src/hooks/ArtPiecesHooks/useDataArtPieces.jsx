import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useDataArtPieces = () => {
  const [activeTab, setActiveTab] = useState("list")
  const API = "http://localhost:4000/api/artpieces"
  const [id, setId] = useState("")
  const [artPieceName, setArtPieceName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [artist, setArtist] = useState("")
  const [discount, setDiscount] = useState("")
  const [artPieces, setArtPieces] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArtPieces = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las piezas de arte")
      }
      const data = await response.json()
      setArtPieces(data)
      setLoading(false)
    } catch (error) {
      console.error("Error al obtener piezas de arte:", error)
      toast.error("Error al cargar piezas de arte")
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
  const saveArtPiece = async (e) => {
    e.preventDefault()
    
    if (!artPieceName || !price || !description || !categoryId || !artist) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const formData = new FormData()
      formData.append('artPieceName', artPieceName)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('categoryId', categoryId)
      formData.append('artist', artist)
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
        throw new Error(errorData.message || "Hubo un error al registrar la pieza de arte")
      }
      toast.success('Pieza de arte registrada exitosamente')
      fetchArtPieces()
      clearForm()
      setActiveTab("list")
    } catch (error) {
      console.error("Error al guardar pieza de arte:", error)
      toast.error(error.message || "Error al registrar pieza de arte")
    }
  }
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
  const updateArtPiece = async (dataArtPiece) => {
    setId(dataArtPiece._id)
    setArtPieceName(dataArtPiece.artPieceName)
    setPrice(dataArtPiece.price)
    setDescription(dataArtPiece.description)
    setCategoryId(dataArtPiece.categoryId?._id || dataArtPiece.categoryId)
    setArtist(dataArtPiece.artist)
    setDiscount(dataArtPiece.discount || 0)
    // No seteamos la imagen para evitar problemas
    setImage(null)
    setActiveTab("form")
  }
  const handleEdit = async (e) => {
    e.preventDefault()

    if (!artPieceName || !price || !description || !categoryId || !artist) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }
    try {
      const formData = new FormData()
      formData.append('artPieceName', artPieceName)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('categoryId', categoryId)
      formData.append('artist', artist)
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
        throw new Error(errorData.message || "Error al actualizar la pieza de arte")
      }
      toast.success('Pieza de arte actualizada exitosamente')
      clearForm()
      setActiveTab("list")
      fetchArtPieces()
    } catch (error) {
      console.error("Error al editar pieza de arte:", error)
      toast.error(error.message || "Error al actualizar pieza de arte")
    }
  }
  const clearForm = () => {
    setId("")
    setArtPieceName("")
    setPrice("")
    setDescription("")
    setImage(null)
    setCategoryId("")
    setArtist("")
    setDiscount("")
  }
  return {
    activeTab,
    setActiveTab,
    id,
    artPieceName,
    setArtPieceName,
    price,
    setPrice,
    description,
    setDescription,
    image,
    setImage,
    categoryId,
    setCategoryId,
    artist,
    setArtist,
    discount,
    setDiscount,
    artPieces,
    categories,
    loading,
    saveArtPiece,
    deleteArtPiece,
    updateArtPiece,
    handleEdit,
    clearForm,
    fetchArtPieces,
    fetchCategories
  }
}
export default useDataArtPieces