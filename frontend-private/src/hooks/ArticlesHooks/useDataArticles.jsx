import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

// Un custom hook para manejar la logica de los articulos
const useDataArticles = () => {
  // Estado para controlar la pestana activa (lista o formulario)
  const [activeTab, setActiveTab] = useState("list")
  // URL de la API para los articulos
  const API = "http://localhost:4000/api/articles"
  // Estados para los campos del formulario de articulo
  const [id, setId] = useState("")
  const [articleName, setArticleName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [stock, setStock] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [supplierId, setSupplierId] = useState("")
  const [discount, setDiscount] = useState("")
  // Estados para almacenar los datos de articulos, categorias y proveedores
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  // Estado para controlar el estado de carga de datos
  const [loading, setLoading] = useState(true)

  // Funcion para obtener los articulos desde la API
  const fetchArticles = async () => {
    try {
      const response = await fetch(API, {
        credentials: "include" // Incluye cookies en la peticion
      })
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los articulos")
      }
      const data = await response.json()
      setArticles(data) // Actualiza el estado con los articulos obtenidos
      setLoading(false) // Desactiva el estado de carga
    } catch (error) {
      console.error("Error al obtener articulos:", error)
      toast.error("Error al cargar articulos") // Muestra una notificacion de error
      setLoading(false)
    }
  }

  // Funcion para obtener las categorias desde la API
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener categorias")
      }
      const data = await response.json()
      setCategories(data) // Actualiza el estado con las categorias obtenidas
    } catch (error) {
      console.error("Error al obtener categorias:", error)
    }
  }

  // Funcion para obtener los proveedores desde la API
  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/suppliers", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Error al obtener proveedores")
      }
      const data = await response.json()
      setSuppliers(data) // Actualiza el estado con los proveedores obtenidos
    } catch (error) {
      console.error("Error al obtener proveedores:", error)
    }
  }

  // useEffect para cargar los datos iniciales al montar el componente
  useEffect(() => {
    fetchArticles()
    fetchCategories()
    fetchSuppliers()
  }, []) // Se ejecuta solo una vez al inicio

  // Funcion para guardar un nuevo articulo
  const saveArticle = async (e) => {
    e.preventDefault() // Evita el comportamiento por defecto del formulario

    // Valida que los campos requeridos no esten vacios
    if (!articleName || !price || !description || !stock || !categoryId || !supplierId) {
      toast.error("Los campos marcados con * son requeridos")
      return
    }

    try {
      const formData = new FormData() // Crea un objeto FormData para enviar datos de formulario (incluyendo archivos)
      formData.append('articleName', articleName)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('stock', stock)
      formData.append('categoryId', categoryId)
      formData.append('supplierId', supplierId)
      formData.append('discount', discount || 0)

      if (image) {
        formData.append('image', image) // Agrega la imagen si existe
      }

      // Realiza la peticion POST a la API
      const response = await fetch(API, {
        method: "POST",
        credentials: "include",
        body: formData // Envia el FormData como cuerpo de la peticion
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Hubo un error al registrar el articulo")
      }

      toast.success('Articulo registrado exitosamente') // Muestra notificacion de exito
      fetchArticles() // Refresca la lista de articulos
      clearForm() // Limpia el formulario
      setActiveTab("list") // Vuelve a la pestana de lista
    } catch (error) {
      console.error("Error al guardar articulo:", error)
      toast.error(error.message || "Error al registrar articulo")
    }
  }

  // Funcion para eliminar un articulo
  const deleteArticle = async (id) => {
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
        throw new Error("Hubo un error al eliminar el articulo")
      }

      toast.success('Articulo eliminado exitosamente') // Muestra notificacion de exito
      fetchArticles() // Refresca la lista de articulos
    } catch (error) {
      console.error("Error al eliminar articulo:", error)
      toast.error("Error al eliminar articulo")
    }
  }

  // Funcion para cargar los datos de un articulo en el formulario para edicion
  const updateArticle = async (dataArticle) => {
    setId(dataArticle._id)
    setArticleName(dataArticle.articleName)
    setPrice(dataArticle.price)
    setDescription(dataArticle.description)
    setStock(dataArticle.stock)
    setCategoryId(dataArticle.categoryId?._id || dataArticle.categoryId) // Maneja si categoryId es un objeto o solo el ID
    setSupplierId(dataArticle.supplierId?._id || dataArticle.supplierId) // Maneja si supplierId es un objeto o solo el ID
    setDiscount(dataArticle.discount || 0)
    setImage(null) // No setea la imagen para evitar problemas
    setActiveTab("form") // Cambia a la pestana de formulario
  }

  // Funcion para manejar la edicion de un articulo existente
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

      // Realiza la peticion PUT a la API para actualizar el articulo
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar el articulo")
      }

      toast.success('Articulo actualizado exitosamente')
      clearForm() // Limpia el formulario
      setActiveTab("list") // Vuelve a la pestana de lista
      fetchArticles() // Refresca la lista de articulos
    } catch (error) {
      console.error("Error al editar articulo:", error)
      toast.error(error.message || "Error al actualizar articulo")
    }
  }

  // Funcion para limpiar el formulario
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

  // Retorna los estados y funciones para ser usados por el componente
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