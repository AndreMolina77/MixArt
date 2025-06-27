import { useState, useEffect } from 'react'

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([])
  
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlistItems(savedWishlist)
  }, [])
  
  const saveWishlist = (items) => {
    setWishlistItems(items)
    localStorage.setItem('wishlist', JSON.stringify(items))
  }
  
  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id)
    
    if (!isAlreadyInWishlist) {
      const wishlistItem = {
        id: product.id,
        name: product.ProductName || product.name,
        price: product.originalData?.price || parseFloat(product.Price.replace('$', '')),
        image: product.ImageSrc || product.image,
        discount: product.originalData?.discount || 0,
        isArticle: product.isArticle,
        originalData: product.originalData
      }
      saveWishlist([...wishlistItems, wishlistItem])
      return true // Agregado exitosamente
    }
    return false // Ya estaba en la lista
  }
  
  const removeFromWishlist = (productId) => {
    const updatedItems = wishlistItems.filter(item => item.id !== productId)
    saveWishlist(updatedItems)
  }
  
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }
  
  const clearWishlist = () => {
    saveWishlist([])
  }
  
  const moveAllToCart = () => {
    // Esta función se implementará cuando integres con useCart
    return wishlistItems
  }
  
  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    moveAllToCart
  }
}