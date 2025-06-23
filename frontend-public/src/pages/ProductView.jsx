import { useState } from 'react'
import { FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCw, FiCheck } from 'react-icons/fi'
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
  const handleWishlistClick = () => {
    setWishlisted(true);
    setTimeout(() => setWishlisted(false), 3000);
  }
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="font-[Alexandria] bg-[#FAF5E9] min-h-screen py-10 px-8">
      <Breadcrumbs />
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-6 max-w-6xl w-full">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex md:flex-col gap-4 order-1 md:order-none">
              <img src={Image1} alt="Thumb 1" className="w-[80px] h-[80px] object-cover rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-[#7A6E6E]" onClick={() => setSelectedImage(Image1)}/>
              <img src={Image2} alt="Thumb 2" className="w-[80px] h-[80px] object-cover rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-[#7A6E6E]" onClick={() => setSelectedImage(Image2)}/>
            </div>
            <div className="flex justify-center items-center">
              <img src={selectedImage} alt="Main Product" className="w-full max-w-[450px] h-auto rounded-xl shadow-md" />
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-[#7A6E6E] text-xl font-semibold text-center md:text-left">Missing part - Limited Edition of 5 Photograph</h2>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`text-xl ${i <= 4 ? 'text-[#FFAD33]' : 'text-[#A9A9A9]'}`}>★</span>
              ))}
              <span className="text-[#A9A9A9] text-sm">(150 Reseñas)</span>
              <span className="text-[#00FF66] text-sm font-medium ml-2">In Stock</span>
            </div>   
            <p className="text-[#7A6E6E] text-2xl font-semibold mt-4 text-center md:text-left">$3,490.00</p>   
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
        </div>
      </div>
      <div className="bg-[#F9F3E9] py-16 px-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-2">
        <div className="bg-[#E07A5F] w-6 h-12 rounded-lg mr-2"></div>
        <h2 className="text-[#E07A5F] text-xl font-semibold ml-3 font-[Alexandria] text-center md:text-left">Productos relacionados</h2>
        </div>
          <div className="flex justify-center">
            <div className="flex gap-8 overflow-x-auto max-w-[90vw] px-4 py-6">
              <ProductCard Discount="-40%" ImageSrc={IntheRain} ProductName="In the rain II" Price="$5000" FormerPrice="$5990" Rating={5} ReviewCount={88} ShowWishlist={true} ShowView={true}/>
              <ProductCard Discount="-35%" ImageSrc={Ocean} ProductName="Ocean (limited edition)" Price="$4300" FormerPrice="$4700" Rating={4} ReviewCount={75} ShowWishlist={true} ShowView={true}/>
              <ProductCard Discount="-30%" ImageSrc={SmallLifeForms} ProductName="Small life forms III" Price="$370" FormerPrice="$420" Rating={5} ReviewCount={99} ShowView={true}/>
              <ProductCard ImageSrc={Charlotte} ProductName="Charlotte Sometimes Hums as She Paints Painting" Price="$3,600" FormerPrice="$4,075" Rating={4.5} ReviewCount={65} ShowWishlist={true} ShowView={true}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailPage