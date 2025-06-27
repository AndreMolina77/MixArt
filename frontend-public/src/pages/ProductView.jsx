import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCw, FiCheck, FiStar, FiUser } from 'react-icons/fi'
import Breadcrumbs from '../components/Handlers/BreadCrumbs.jsx'
import Button from '../components/Buttons/Button.jsx'
import ProductCard from '../components/Cards/ProductCard.jsx'
import usePublicDataArticles from '../hooks/useDataArticles.jsx'
import usePublicDataArtPieces from '../hooks/useDataArtPieces.jsx'
import { useCart } from '../hooks/useCart.js'

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(2)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { articles } = usePublicDataArticles()
  const { artPieces } = usePublicDataArtPieces()
  const { id } = useParams() // Para obtener el ID de la URL
  console.log('🆔 ProductView - ID from URL:', id)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const { addToCart } = useCart()

  // Función de transformación (igual que en las otras páginas)
  const transformRelatedProduct = (item, index) => {
    if (!item || !item._id) return null
    
    const isArticle = item.hasOwnProperty('stock')
    return {
      id: item._id,  // ← ASEGURAR QUE ESTÉ EL ID
      ProductName: isArticle ? item.articleName : item.artPieceName,
      Price: `$${item.price}`,
      FormerPrice: item.discount > 0 ? `$${(item.price / (1 - item.discount/100)).toFixed(0)}` : null,
      ImageSrc: item.image || '/placeholder-image.jpg',
      Discount: item.discount > 0 ? `${item.discount}%` : null,
      ShowView: true,
      ShowWishList: true,
      Rating: Math.floor(Math.random() * 2) + 4,
      ReviewCount: Math.floor(Math.random() * 50) + 50,
      isArticle: isArticle,
      originalData: item
    }
  }
  const relatedProducts = [...(articles || []), ...(artPieces || [])]
    .slice(0, 4)
    .map(transformRelatedProduct)
    .filter(product => product !== null)

  console.log('🔗 ProductView - Related products:', relatedProducts)

  const handleWishlistClick = () => {
    setWishlisted(true);
    setTimeout(() => setWishlisted(false), 3000);
  }
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => Math.max(1, prev - 1));
  
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;
    
    const newReview = {
      id: Date.now(), // Usar timestamp como ID único
      name: "Tú",
      rating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    // Guardar en localStorage específico para este producto
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    
    setRating(0);
    setReviewText('');
  };
  // Cargar producto por ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        console.log('🔍 Buscando producto con ID:', id)
        
        if (!id) {
          console.log('❌ No hay ID')
          setProduct(null)
          setLoading(false)
          return
        }
        
        // PASO 1: Intentar como artículo
        console.log('📦 Buscando en articles...')
        let response = await fetch(`http://localhost:4000/api/public/articles`)
        
        if (!response.ok) {
          console.log(`❌ Error articles: ${response.status}`)
        } else {
          let data = await response.json()
          console.log('📦 Articles response:', data)
          
          let foundProduct = data.find(item => item._id === id)
          console.log('📦 Found in articles:', foundProduct)
          
          if (foundProduct) {
            const productData = {
              ...foundProduct,
              isArticle: true,
              name: foundProduct.articleName
            }
            console.log('✅ Setting article product:', productData)
            setProduct(productData)
            setLoading(false)
            return
          }
        }
        
        // PASO 2: Si no se encuentra, buscar en artPieces
        console.log('🎨 No encontrado en articles, buscando en artpieces...')
        response = await fetch(`http://localhost:4000/api/public/artpieces`)
        
        if (!response.ok) {
          console.log(`❌ Error artpieces: ${response.status}`)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        let data = await response.json()
        console.log('🎨 ArtPieces response:', data)
        
        let foundProduct = data.find(item => item._id === id)
        console.log('🎨 Found in artpieces:', foundProduct)
        
        if (foundProduct) {
          const productData = {
            ...foundProduct,
            isArticle: false,
            name: foundProduct.artPieceName
          }
          console.log('✅ Setting artpiece product:', productData)
          setProduct(productData)
        } else {
          console.log('❌ Producto no encontrado en ningún lado')
          setProduct(null)
        }
        
      } catch (error) {
        console.error('❌ Error completo:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  // Cargar reviews del localStorage
  useEffect(() => {
    if (product) {
      const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`) || '[]')
      setReviews(savedReviews)
    }
  }, [product, id])
  // Calcular promedio de calificaciones
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  // Calcular distribución de estrellas
  const starDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      starDistribution[5 - review.rating]++;
    }
  })
  if (loading) {
  return (
      <div className="font-[Alexandria] bg-[#FAF5E9] min-h-screen py-10 px-4 sm:px-8">
        <Breadcrumbs />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E07A5F] mx-auto mb-4"></div>
            <p className="text-[#7A6E6E]">Cargando producto... ID: {id}</p>
            <p className="text-[#7A6E6E] text-sm mt-2">Check console for details</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="font-[Alexandria] bg-[#FAF5E9] min-h-screen py-10 px-4 sm:px-8">
      <Breadcrumbs />
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mt-6 max-w-6xl w-full">
          {/* Columna izquierda - Imágenes */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-full max-w-[450px] h-[450px] bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            ) : (
              <div className="flex justify-center items-start">
                <img 
                  src={product?.image || '/placeholder-image.jpg'} 
                  alt={product?.name || 'Product'} 
                  className="w-full max-w-[400px] sm:max-w-[450px] h-auto rounded-xl shadow-md" 
                />
              </div>
            )}
          </div>

          {/* Columna derecha - Detalles y reseñas */}
          <div className="max-w-md mx-auto mt-6 md:mt-0 w-full">
            <h2 className="text-[#7A6E6E] text-xl font-semibold text-center md:text-left">{loading ? 'Cargando...' : product?.name || 'Producto no encontrado'}</h2>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`text-xl ${i <= Math.round(averageRating) ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>★</span>
              ))}
              <span className="text-[#A9A9A9] text-sm">({reviews.length} Reseñas)</span>
              <span className="text-[#00FF66] text-sm font-medium ml-2">In Stock</span>
            </div>   
            <p className="text-[#7A6E6E] text-2xl font-semibold mt-4 text-center md:text-left">
              {loading ? '$0.00' : `$${product?.price || 0}`}
              {product?.discount > 0 && (
                <span className="ml-3 text-lg text-gray-400 line-through">
                  ${((product.price / (1 - product.discount/100)).toFixed(0))}
                </span>
              )}
            </p>   
            
            {/* Pestañas */}
            <div className="flex border-b border-[#A9A9A9] mt-6">
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'description' ? 'text-[#E07A5F] border-b-2 border-[#E07A5F]' : 'text-[#7A6E6E]'}`}
                onClick={() => setActiveTab('description')}
              >
                Descripción
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'reviews' ? 'text-[#E07A5F] border-b-2 border-[#E07A5F]' : 'text-[#7A6E6E]'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reseñas ({reviews.length})
              </button>
            </div>
            
            {activeTab === 'description' ? (
              <div>
                <p className="text-[#7A6E6E] text-sm mt-4 text-center md:text-left">
                  {loading ? 'Cargando descripción...' : (
                    product?.description || 'Descripción no disponible'
                  )}
                  {product?.isArticle && (
                    <span className="block mt-2 text-xs text-green-600">
                      En stock: {product.stock} unidades disponibles
                    </span>
                  )}
                  {!product?.isArticle && (
                    <span className="block mt-2 text-xs text-blue-600">
                      Obra de arte por: {product?.artist}
                    </span>
                  )}
                </p>
                <div className="flex flex-col items-center md:items-start gap-4 mt-6">
                  <div className="flex items-center gap-4">
                  <div className="flex items-center overflow-hidden border border-[#A9A9A9] rounded-md">
                    <button onClick={decreaseQty} className="w-11 h-11 text-[#7A6E6E] border-r border-[#A9A9A9] flex items-center justify-center"><FiMinus/></button>
                    <div className="px-4 text-[#7A6E6E] text-m">{quantity}</div>
                    <button onClick={increaseQty} className="w-11 h-11 bg-[#E07A5F] text-white text-m flex items-center justify-center"><FiPlus/></button>
                  </div>
                    <div className="min-w-[180px]">
                      <Button 
                        Text="Añadir al carrito" 
                        onClick={() => {
                          const success = addToCart({
                            id: product._id,
                            ProductName: product.name,
                            Price: `$${product.price}`,
                            ImageSrc: product.image,
                            originalData: product,
                            isArticle: product.isArticle
                          }, quantity)
                          if (success) {
                            alert(`${quantity} producto(s) agregado(s) al carrito`)
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                    <button onClick={handleWishlistClick} className={`p-2 border border-[#A9A9A9] rounded-full ${wishlisted ? 'bg-[#E0FFE5]' : 'bg-white'}`}>
                      <FiHeart className={`w-5 h-5 ${wishlisted ? 'text-[#00C36D]' : 'text-[#7A6E6E]'}`} />
                    </button>
                  </div>
                  {wishlisted && (
                    <div className="mt-2 text-[#00C36D] text-sm font-medium flex items-center gap-2">
                      <FiCheck className="w-4 h-4" /> Añadido a la lista de deseos!
                    </div>
                  )}
                </div>
                <div className="mt-6 border border-[#A9A9A9] rounded-md divide-y divide-[#A9A9A9]">
                  <div className="p-4 flex items-start gap-4">
                    <FiTruck className="w-6 h-6 text-[#7A6E6E] flex-shrink-0" />
                    <div>
                      <p className="text-[#7A6E6E] font-medium">Envío gratis</p>
                      <a href="#" className="text-[#7A6E6E] text-sm underline">Ingresa tu código postal para ver Disponibilidad de Envíos</a>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-4">
                    <FiRefreshCw className="w-6 h-6 text-[#7A6E6E] flex-shrink-0" />
                    <div>
                      <p className="text-[#7A6E6E] font-medium">Entrega de devolución</p>
                      <p className="text-[#7A6E6E] text-sm">Devoluciones con entrega gratuita en 30 días. <a href="#" className="underline">Detalles</a></p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                {/* Resumen de reseñas */}
                <div className="bg-[#F9F3E9] rounded-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <div className="text-4xl font-bold text-[#7A6E6E]">{averageRating.toFixed(1)}</div>
                      <div className="flex justify-center md:justify-start mt-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={`avg-star-${i}`} className={`text-xl ${i <= Math.round(averageRating) ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>★</span>
                        ))}
                      </div>
                      <p className="text-[#7A6E6E] mt-1">{reviews.length} reseñas</p>
                    </div>  
                    
                    <div className="w-full md:w-2/3">
                      {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={`star-dist-${star}`} className="flex items-center mb-2">
                          <div className="w-10 text-[#7A6E6E]">{star}★</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                              <div 
                                className="bg-[#FFAD33] h-2.5 rounded-full" 
                                style={{ width: `${(starDistribution[index] / reviews.length) * 100}%` }}
                              ></div>
                            </div>
                          <div className="w-10 text-[#7A6E6E] text-right">{starDistribution[index]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Formulario para nueva reseña */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                  <h3 className="text-lg font-semibold text-[#7A6E6E] mb-4">Escribe tu reseña</h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-[#7A6E6E] mb-2">Tu calificación</label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button 
                            key={star}
                            type="button"
                            className="text-2xl mr-1 focus:outline-none"
                            onClick={() => setRating(star)}
                          >
                            <FiStar className={star <= rating ? "text-[#FFAD33] fill-[#FFAD33]" : "text-[#A9A9A9]"} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#7A6E6E] mb-2">Tu reseña</label>
                      <textarea 
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full h-32 p-3 border border-[#A9A9A9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                        placeholder="Comparte tu experiencia con este producto..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={rating === 0 || !reviewText.trim()}
                      className={`px-6 py-2 rounded-md font-medium ${
                        rating === 0 || !reviewText.trim() 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-[#E07A5F] text-white hover:bg-[#d0694e]'
                      }`}
                    >
                      Enviar reseña
                    </button>
                  </form>
                </div>
                
                {/* Lista de reseñas con scroll */}
                <div>
                  <h3 className="text-lg font-semibold text-[#7A6E6E] mb-4">Reseñas de clientes</h3>
                  {reviews.length === 0 ? (
                    <p className="text-[#7A6E6E] text-center py-8">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
                  ) : (
                    <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-6">
                        {reviews.map(review => (
                          <div key={review.id} className="border-b border-[#E0E0E0] pb-6">
                            <div className="flex items-start">
                              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                                <FiUser className="text-[#7A6E6E]" />
                              </div>
                              <div>
                                <div className="flex justify-between">
                                  <h4 className="font-semibold text-[#7A6E6E]">{review.name}</h4>
                                  <span className="text-sm text-[#A9A9A9]">{review.date}</span>
                                </div>
                                <div className="flex mt-1 mb-2">
                                  {[1, 2, 3, 4, 5].map(i => (
                                    <span key={`star-${i}`} className={`${i <= review.rating ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>
                                      <FiStar className={i <= review.rating ? "fill-[#FFAD33]" : ""} />
                                    </span>
                                  ))}
                                </div>
                                <p className="text-[#7A6E6E]">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Solo mostrar productos relacionados si estamos en la pestaña de descripción */}
      {activeTab === 'description' && (
        <div className="bg-[#F9F3E9] py-16 px-4 sm:px-8 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-2">
              <div className="bg-[#E07A5F] w-6 h-12 rounded-lg mr-2"></div>
              <h2 className="text-[#E07A5F] text-xl font-semibold ml-3 font-[Alexandria] text-center md:text-left">Productos relacionados</h2>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} id={product.id} Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName= {product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} Rating={product.Rating} ReviewCount={product.ReviewCount} ShowWishlist={product.ShowWishList} ShowView={product.ShowView}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Estilos para la barra de desplazamiento personalizada */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F9F3E9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E07A5F;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d0694e;
        }
      `}</style>
    </div>
  )
}

export default ProductDetailPage