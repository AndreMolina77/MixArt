import { useState, useEffect } from 'react'
import { FiTrash2, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { Toaster } from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useWishlist } from '../hooks/useWishlist.js'

const ProductCard = ({
  id,
  Discount, 
  ImageSrc, 
  ProductName, 
  Price, 
  FormerPrice, 
  Rating, 
  ReviewCount, 
  IsNew, 
  ShowWishlist, 
  ShowView, 
  ShowTrash,
  onQuickView // Nueva prop para manejar la vista rápida
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(id)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const success = addToCart({
      id,
      ProductName,
      Price,
      ImageSrc,
      originalData,
      isArticle
    })
    if (success) {
      Toaster.success('Producto añadido al carrito')
    }
  }
  // Validacion de stock en el render:
  const isOutOfStock = isArticle && originalData?.stock === 0
  const lowStock = isArticle && originalData?.stock <= 5 && originalData?.stock > 0
  const filledStars = Rating ? Math.floor(Rating) : 0
  const emptyStars = 5 - filledStars
  const [actualRating, setActualRating] = useState(Rating || 0)
  const [actualReviewCount, setActualReviewCount] = useState(ReviewCount || 0)

  useEffect(() => {
    if (id) {
      // Obtener reviews del localStorage para este producto
      const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`) || '[]')
      
      if (savedReviews.length > 0) {
        const averageRating = savedReviews.reduce((acc, review) => acc + review.rating, 0) / savedReviews.length
        setActualRating(averageRating)
        setActualReviewCount(savedReviews.length)
      }
    }
  }, [id, Rating, ReviewCount])

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(id)
    } else {
      const added = addToWishlist({
        id,
        ProductName,
        Price,
        ImageSrc,
        originalData,
        isArticle
      })
      if (added) {
        // Opcional: mostrar toast de confirmación
        Toaster.success('Producto añadido al carrito')
      }
    }
  }
  return (
    <div className="w-[270px] font-[Alexandria] rounded-lg">
      <div className="relative">
        <div className="absolute top-2.5 left-2 flex flex-col gap-2 items-start">
          {Discount && (
            <span className="bg-[#E07A5F] text-white text-sm px-2 py-1 rounded font-normal">{Discount}</span>
          )}
          {IsNew && (
            <span className="bg-[#81B29A] text-white text-sm px-2 py-1 rounded font-normal">Nuevo</span>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {ShowTrash && (
            <div className="bg-white rounded-full p-2 shadow cursor-pointer">
              <FiTrash2 className="text-[#7A6E6E] text-sm w-5 h-5" />
            </div>
          )}
          {ShowWishlist && (
            <div className={`bg-white rounded-full p-2 shadow cursor-pointer ${inWishlist ? 'bg-red-100' : ''}`} onClick={handleWishlistClick}>
              <FiHeart className={`text-sm w-5 h-5 ${inWishlist ? 'text-red-500 fill-red-500' : 'text-[#7A6E6E]'}`} />
            </div>
          )}
          {ShowView && (
            <div 
              className="bg-white rounded-full p-2 shadow cursor-pointer"
              onClick={() => onQuickView({ id, Discount, ImageSrc, ProductName, Price, FormerPrice, Rating, ReviewCount, IsNew })}
            >
              <FiEye className="text-[#7A6E6E] text-sm w-5 h-5" />
            </div>
          )}
        </div>
        <div className="bg-white pt-4 px-0 pb-0 rounded-b-lg shadow-sm flex flex-col items-center">
          <NavLink to={`/producto/${id}`} className="h-[180px] flex items-center justify-center w-full">
            <img src={ImageSrc} alt={ProductName} className="max-w-[180px] max-h-[180px] object-cover" />
          </NavLink>
          <button onClick={handleAddToCart} disabled={isOutOfStock} className={`w-full h-10 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E07A5F] hover:bg-transparent hover:text-[#E07A5F]'} text-white text-sm py-2 rounded-b-lg font-normal flex items-center justify-center gap-2 mt-4 border-2 border-[#E07A5F] transition duration-300`}>
            <FiShoppingCart />
            {isOutOfStock ? 'Agotado' : 'Añadir al carrito'}
          </button>
          {/* Indicador de stock bajo */}
          {lowStock && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              ¡Últimas {originalData.stock}!
            </div>
          )}
        </div>
      </div>
      <div className="px-1 pt-3 pb-4 bg-transparent">
        <p className="text-[#7A6E6E] text-base font-medium">{ProductName}</p>
        {Rating && (
          <div className="flex items-center gap-1 mt-1">
            {[...Array(Math.floor(actualRating))].map((_, i) => ( <FaStar key={`filled-${i}`} className="text-[#FFAD33] text-xs" /> ))}
            {[...Array(5 - Math.floor(actualRating))].map((_, i) => ( <FaStar key={`empty-${i}`} className="text-[#A9A9A9] text-xs" />))}
            {actualReviewCount > 0 && ( <span className="text-[#A9A9A9] text-xs ml-1">({actualReviewCount})</span> )}
            {[...Array(emptyStars)].map((_, i) => ( <FaStar key={`empty-${i}`} className="text-[#A9A9A9] text-xs" />))}
            {ReviewCount && ( <span className="text-[#A9A9A9] text-xs ml-1">({ReviewCount})</span> )}
          </div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#E07A5F] text-base font-medium">{Price}</span>
          {FormerPrice && (
            <span className="text-[#A9A9A9] text-base font-medium line-through">{FormerPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductCard;