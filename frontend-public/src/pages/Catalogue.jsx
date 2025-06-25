// src/pages/CatalogPage.jsx
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter, FaSort } from 'react-icons/fa';
import Button from '../components/Buttons/Button.jsx';

const CatalogPage = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [sortOption, setSortOption] = useState('Relevancia');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filters = ['Todos', 'Pinturas', 'Esculturas', 'Fotografía', 'Dibujos', 'Impresos'];
  const sortOptions = ['Relevancia', 'Más vendidos', 'Precio: menor a mayor', 'Precio: mayor a menor', 'Más recientes'];
  const totalPages = 5;

  return (
    <div className="flex flex-col bg-[#F4F1DE] min-h-screen">
      {/* Encabezado de la página */}
      <div className="w-full px-16 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">Productos</h2>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">Catálogo de Productos</h1>
          </div>
          <p className="text-[#7A6E6E] font-[Alexandria] mb-12 max-w-3xl">
            Explora nuestra amplia gama de productos de arte. Encuentra pinturas, dibujos, esculturas y más, 
            creados por artistas talentosos de todo el mundo.
          </p>
        </div>
      </div>

      {/* Controles de filtro y ordenamiento */}
      <div className="w-full px-16 pb-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-[Alexandria] text-sm transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-white text-[#7A6E6E] border border-[#7A6E6E]/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center text-[#7A6E6E] font-[Alexandria]">
              <FaSort className="mr-2" />
              <span className="mr-2">Ordenar por:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-[#7A6E6E]/30 rounded-lg px-3 py-2"
              >
                {sortOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Área de productos */}
      <div className="w-full px-16 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Espacio reservado para productos */}
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-[#F4F1DE] border-2 border-dashed border-[#7A6E6E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaFilter className="text-[#7A6E6E] text-xl" />
                </div>
                <h3 className="text-2xl font-medium text-[#7A6E6E] font-[Alexandria] mb-4">
                  Tus productos aparecerán aquí
                </h3>
                <p className="text-[#7A6E6E] font-[Alexandria] mb-6">
                  Cuando tengas productos en tu catálogo, se mostrarán en esta sección. 
                  Puedes usar los filtros arriba para organizar tu colección.
                </p>
                <div className="max-w-xs">
                  <Button Text="Añadir productos" customClass="bg-[#81B29A] border-[#81B29A] hover:text-[#81B29A]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Paginación */}
          <div className="flex justify-center items-center mt-12 gap-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                currentPage === 1 
                  ? 'bg-[#F5F5F5] text-[#7A6E6E]/50' 
                  : 'bg-[#F5F5F5] text-[#7A6E6E]'
              }`}
            >
              <FaArrowLeft size={20} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === i + 1
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-[#F5F5F5] text-[#7A6E6E]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                currentPage === totalPages 
                  ? 'bg-[#F5F5F5] text-[#7A6E6E]/50' 
                  : 'bg-[#F5F5F5] text-[#7A6E6E]'
              }`}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;