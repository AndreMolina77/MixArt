import { useState } from 'react'
import { FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCw, FiCheck, FiStar, FiUser } from 'react-icons/fi'
import Breadcrumbs from '../components/breadcrumbs.jsx'
import Button from '../components/button.jsx'
import SmallLifeForms from '../assets/slfiii.png'
import Ocean from '../assets/ocean.png'
import IntheRain from '../assets/itrii.png'
import Charlotte from '../assets/charlotte.png'
import Image1 from '../assets/missing-part-1.png'
import Image2 from '../assets/missing-part-2.png'
import ProductCard from '../components/productcard.jsx'

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(2)
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(Image1)
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ana Pérez",
      rating: 4,
      comment: "Me encanta la calidad de la impresión. El envío fue rápido y el embalaje muy seguro.",
      date: "2024-05-10"
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      rating: 5,
      comment: "Increíble obra de arte, vale cada centavo. La atención al detalle es asombrosa.",
      date: "2024-04-22"
    },
    {
      id: 3,
      name: "Marta López",
      rating: 5,
      comment: "Compré esta pieza como regalo y quedaron encantados. La calidad es excelente.",
      date: "2024-04-15"
    },
    {
      id: 4,
      name: "Javier González",
      rating: 3,
      comment: "Buena calidad, pero el tiempo de entrega fue un poco largo. En general estoy satisfecho.",
      date: "2024-03-28"
    },
    {
      id: 5,
      name: "Lucía Fernández",
      rating: 5,
      comment: "La fotografía llegó perfectamente embalada y en el tiempo estimado. La calidad superó mis expectativas. Definitivamente recomendaría esta tienda a otros coleccionistas de arte.",
      date: "2024-03-15"
    },
    {
      id: 6,
      name: "Roberto Jiménez",
      rating: 4,
      comment: "La impresión tiene una calidad excepcional y los colores son muy vibrantes. Me hubiera gustado que el certificado de autenticidad viniera con más detalles sobre el proceso de creación.",
      date: "2024-02-20"
    }
  ]);
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
      id: reviews.length + 1,
      name: "Tú",
      rating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText('');
  };
  // Calcular promedio de calificaciones
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  // Calcular distribución de estrellas
  const starDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      starDistribution[5 - review.rating]++;
    }
  })
  return (
    <div className="font-[Alexandria] bg-[#FAF5E9] min-h-screen py-10 px-4 sm:px-8">
      <Breadcrumbs />
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mt-6 max-w-6xl w-full">
          {/* Columna izquierda - Imágenes */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
            <div className="flex md:flex-col gap-3 md:gap-4 order-1 md:order-none">
              <img src={Image1} alt="Thumb 1" className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-cover rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-[#7A6E6E]" onClick={() => setSelectedImage(Image1)}/>
              <img src={Image2} alt="Thumb 2" className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-cover rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-[#7A6E6E]" onClick={() => setSelectedImage(Image2)}/>
            </div>
            <div className="flex justify-center items-start">
              <img src={selectedImage} alt="Main Product" className="w-full max-w-[400px] sm:max-w-[450px] h-auto rounded-xl shadow-md" />
            </div>
          </div>

          {/* Columna derecha - Detalles y reseñas */}
          <div className="max-w-md mx-auto mt-6 md:mt-0 w-full">
            <h2 className="text-[#7A6E6E] text-xl font-semibold text-center md:text-left">Missing part - Limited Edition of 5 Photograph</h2>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`text-xl ${i <= Math.round(averageRating) ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>★</span>
              ))}
              <span className="text-[#A9A9A9] text-sm">({reviews.length} Reseñas)</span>
              <span className="text-[#00FF66] text-sm font-medium ml-2">In Stock</span>
            </div>   
            <p className="text-[#7A6E6E] text-2xl font-semibold mt-4 text-center md:text-left">$3,490.00</p>   
            
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
                  Cada fotografía existe en un máximo de cinco piezas numeradas y firmadas a mano. Impresiones de inyección de tinta pigmentada de la más alta calidad sobre lienzo.
                </p>
                <div className="flex flex-col items-center md:items-start gap-4 mt-6">
                  <div className="flex items-center gap-4">
                  <div className="flex items-center overflow-hidden border border-[#A9A9A9] rounded-md">
                    <button onClick={decreaseQty} className="w-11 h-11 text-[#7A6E6E] border-r border-[#A9A9A9] flex items-center justify-center"><FiMinus/></button>
                    <div className="px-4 text-[#7A6E6E] text-m">{quantity}</div>
                    <button onClick={increaseQty} className="w-11 h-11 bg-[#E07A5F] text-white text-m flex items-center justify-center"><FiPlus/></button>
                  </div>
                    <div className="min-w-[180px]">
                      <Button Text="Comprar" className="w-full"/>
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
                          <span key={i} className={`text-xl ${i <= Math.round(averageRating) ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>★</span>
                        ))}
                      </div>
                      <p className="text-[#7A6E6E] mt-1">{reviews.length} reseñas</p>
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={star} className="flex items-center mb-2">
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
                                    <span key={i} className={`${i <= review.rating ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>
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
                <ProductCard Discount="-40%" ImageSrc={IntheRain} ProductName="In the rain II" Price="$5000" FormerPrice="$5990" Rating={5} ReviewCount={88} ShowWishlist={true} ShowView={true}/>
                <ProductCard Discount="-35%" ImageSrc={Ocean} ProductName="Ocean (limited edition)" Price="$4300" FormerPrice="$4700" Rating={4} ReviewCount={75} ShowWishlist={true} ShowView={true}/>
                <ProductCard Discount="-30%" ImageSrc={SmallLifeForms} ProductName="Small life forms III" Price="$370" FormerPrice="$420" Rating={5} ReviewCount={99} ShowView={true}/>
                <ProductCard ImageSrc={Charlotte} ProductName="Charlotte Sometimes Hums as She Paints Painting" Price="$3,600" FormerPrice="$4,075" Rating={4.5} ReviewCount={65} ShowWishlist={true} ShowView={true}/>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Estilos para la barra de desplazamiento personalizada */}
      <style jsx>{`
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