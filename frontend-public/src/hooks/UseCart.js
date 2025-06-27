import { useState, useEffect } from 'react'

export const useCart = () => {
  // Estado para almacenar los ítems del carrito
  const [cartItems, setCartItems] = useState([])

  // Al montar el componente, cargar el carrito guardado en localStorage (si existe)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(savedCart)
  }, [])

  // Función auxiliar para actualizar el estado y el localStorage
  const saveCart = (items) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  // Agregar un producto al carrito (o aumentar la cantidad si ya existe)
  const addToCart = (product, quantity = 1) => {
    // Validar stock para artículos
    if (product.isArticle && product.originalData) {
        const availableStock = product.originalData.stock || 0
        const currentInCart = cartItems.find(item => item.id === product.id)?.quantity || 0
        
        if (currentInCart + quantity > availableStock) {
        alert(`Solo hay ${availableStock} unidades disponibles. Ya tienes ${currentInCart} en el carrito.`)
        return false
        }
    }
    const existingItem = cartItems.find(item => item.id === product.id)

    if (existingItem) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      const updatedItems = cartItems.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
      saveCart(updatedItems)
    } else {
      // Si es un producto nuevo, agregarlo al carrito
      const newItem = {
        id: product.id,
        name: product.ProductName || product.name,
        price: product.originalData?.price || parseFloat(product.Price.replace('$', '')),
        image: product.ImageSrc || product.image,
        quantity,
        isArticle: product.isArticle,
        originalData: product.originalData,
        maxStock: product.isArticle ? product.originalData?.stock : null
      }
      saveCart([...cartItems, newItem])
    }
    return true
  }

  // Eliminar un producto del carrito por su id
  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId)
    saveCart(updatedItems)
  }

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la cantidad es 0 o menor, eliminar el producto
      removeFromCart(productId)
      return
    }
    const item = cartItems.find(item => item.id === productId)
  
    // Validar stock para artículos
    if (item && item.isArticle && item.maxStock && newQuantity > item.maxStock) {
      alert(`Solo hay ${item.maxStock} unidades disponibles`)
      return
    }
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
    saveCart(updatedItems)
  }

  // Vaciar el carrito completamente
  const clearCart = () => {
    saveCart([])
  }

  // Calcular el total del carrito (precio * cantidad de cada producto)
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Calcular la cantidad total de productos en el carrito
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }
}