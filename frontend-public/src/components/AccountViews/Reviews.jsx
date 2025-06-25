import { useState } from 'react'
import AfterRain from '../../assets/ariii.png'
import Charlotte from '../../assets/charlotte.png'

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const reviews = [
    { id: '1', product: 'Silla ergonómica de oficina', rating: 4, date: '2024-03-15', review: 'Muy cómoda y fácil de armar. El material parece de buena calidad, aunque el color es ligeramente diferente al de las fotos.', productImage: AfterRain },
    { id: '2', product: 'Lámpara de mesa moderna', rating: 5, date: '2024-02-28', review: 'Excelente iluminación y diseño minimalista. Perfecta para mi escritorio de trabajo.', productImage: Charlotte },
    { id: '3', product: 'Juego de sábanas algodón', rating: 3, date: '2024-01-10', review: 'Suaves al tacto pero se arrugan fácilmente. El color se mantiene bien después de varios lavados.' }
  ]
  const filteredReviews = reviews.filter(review =>
    review.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
    review.review.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))
  }
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <h2 className="text-[#DE7A58] font-semibold text-lg mb-6">Mis reseñas</h2>
      <div className="sticky top-0 pt-2 pb-4 z-10 bg-white">
        <div className="mb-6 relative">
          <input  type="text" placeholder="Buscar en mis reseñas..." className="w-full pl-10 pr-4 py-2 border border-[#81B29A] text-[#7A6E6E] bg-[#EBFEF5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <svg className="w-5 h-5 absolute left-3 top-3 text-[#7A6E6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      <div className="space-y-6 h-[calc(75vh-260px)] overflow-y-auto">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-6 text-[#7A6E6E]">No se encontraron reseñas</div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="p-4 hover:bg-gray-50 rounded-lg transition-colors border border-[#81B29A]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {review.productImage ? (
                    <img src={review.productImage} alt={review.product} className="w-20 h-20 object-cover rounded-lg"/>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-[#81B29A] flex items-center justify-center text-white font-medium">
                      {review.product.split(' ').map(word => word[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-[#7A6E6E] truncate">{review.product}</h3>
                    <span className="text-sm text-[#7A6E6E]">• {new Date(review.date).toLocaleDateString()}</span>
                  </div> 
                  <div className="flex items-center gap-1 mb-3">{renderStars(review.rating)}</div>
                  <p className="text-[#7A6E6E] text-sm leading-relaxed">{review.review}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default Reviews