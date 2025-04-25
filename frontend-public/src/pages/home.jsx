import { React, useState } from 'react'
import ImageCarousel1 from '../assets/imagencarrusel1.png';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/breadcrumbs.jsx'

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(3);
  
  const totalSlides = 5;
  return (
    <div className="flex bg-[#FFF7E5] min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 px-6 py-8 relative">
        <nav className="flex flex-col space-y-4">
          <div className="flex items-center justify-between text-gray-700 cursor-pointer">
            <span className="font-[Alexandria] text-lg">Pinturas</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
          <div className="flex items-center justify-between text-gray-700 cursor-pointer">
            <span className="font-[Alexandria] text-lg">Materiales</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Dibujos</div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Esculturas</div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Impresos</div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Fotografía</div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Tarjetas de regalo</div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Decoraciones</div>
          <div className="font-[Alexandria] text-lg text-gray-700 cursor-pointer">Exclusivo</div>
        </nav>
        
        {/* Vertical Divider */}
        <div className="absolute top-0 right-0 w-px h-full bg-[#7A6E6E] opacity-20"></div>
      </div>
      
      {/* Main Carousel Area */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex p-8">
              {/* Carousel Text Content */}
              <div className="w-1/2 pr-4 flex flex-col justify-center">
                <p className="text-gray-600 font-[Alexandria] mb-4">Muestra por Ernst Ludwig Kirchner</p>
                <h2 className="text-gray-700 font-[Alexandria] text-4xl font-medium mb-6">
                  Cupón de<br/>descuento de<br/>hasta el 10%
                </h2>
                <div className="mt-4">
                  <button className="flex items-center text-gray-700 font-[Alexandria] hover:text-gray-900">
                    <span className="mr-2">Comprar ahora</span>
                    <ChevronRight size={20} className="ml-1" />
                  </button>
                </div>
              </div>
              
              {/* Carousel Image */}
              <div className="w-1/2">
                <img 
                  src={ImageCarousel1} 
                  alt="Dibujo de Ernst Ludwig Kirchner" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center pb-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    index === activeSlide ? 'bg-[#E07A5F]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home