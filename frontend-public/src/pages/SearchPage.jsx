import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch, FaTimes, FaFilter, FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import ProductCard from '../components/Cards/ProductCard.jsx';
import Button from '../components/Buttons/Button.jsx';
import usePublicDataArticles from '../hooks/useDataArticles.jsx'
import usePublicDataArtPieces from '../hooks/useDataArtPieces.jsx'
import usePublicDataCategories from '../hooks/useDataCategories.jsx'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    sort: 'relevance',
    availability: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { articles } = usePublicDataArticles()
  const { artPieces } = usePublicDataArtPieces()
  const { categories } = usePublicDataCategories()
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Combinar productos
  const allProducts = [...(articles || []), ...(artPieces || [])]
  
  // Categorias para los filtros
  const filterCategories = [
    { value: '', label: 'Todas las categorías' },
    ...(categories?.map(cat => ({ value: cat.categoryName, label: cat.categoryName })) || [])
  ];
  
  // Precios para los filtros
  const priceRanges = [
    { value: '', label: 'Cualquier precio' },
    { value: '0-500', label: 'Menos de $500' },
    { value: '500-2000', label: '$500 - $2,000' },
    { value: '2000-5000', label: '$2,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: 'Más de $10,000' }
  ];
  
  // Calificaciones para los filtros
  const ratings = [
    { value: '', label: 'Cualquier calificación' },
    { value: '5', label: '5 estrellas' },
    { value: '4', label: '4 estrellas y más' },
    { value: '3', label: '3 estrellas y más' }
  ];
  
  // Opciones de ordenamiento
  const sortOptions = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'rating', label: 'Mejor calificados' },
    { value: 'newest', label: 'Más recientes' }
  ];
  // Funcion de transformación (igual que en las otras páginas)
  const transformProductData = (item, index) => {
    const isArticle = item.hasOwnProperty('stock')
    return {
      id: item._id || index,
      ProductName: isArticle ? item.articleName : item.artPieceName,
      Price: `$${item.price}`,
      FormerPrice: item.discount > 0 ? `$${(item.price / (1 - item.discount/100)).toFixed(0)}` : null,
      ImageSrc: item.image || '/placeholder-image.jpg',
      Discount: item.discount > 0 ? `${item.discount}%` : null,
      ShowView: true,
      ShowWishList: true,
      ShowTrash: true, // Para wishlist
      Rating: Math.floor(Math.random() * 2) + 4,
      ReviewCount: Math.floor(Math.random() * 50) + 50,
      originalData: item,
      isArticle
    }
  }
  // Manejar la busqueda cuando cambian los parametros
  useEffect(() => {
    const term = searchParams.get('q') || '';
    setSearchTerm(term);
    
    const performSearch = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        let results = allProducts.map(transformProductData)
        
        // Filtrar por término de búsqueda
        if (term) {
          results = results.filter(product => 
            product.ProductName.toLowerCase().includes(term.toLowerCase()) ||
            product.categoryName.toLowerCase().includes(term.toLowerCase())
          )
        }
        
        // Aplicar filtros adicionales
        if (filters.category) {
          results = results.filter(product => 
            product.categoryName === filters.category
          )
        }
        
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number)
          results = results.filter(product => {
            const price = product.originalData.price
            if (filters.priceRange === '10000+') return price >= 10000
            return price >= min && price <= max
          })
        }
        
        if (filters.rating) {
          const minRating = parseInt(filters.rating)
          results = results.filter(product => product.Rating >= minRating)
        }
        
        // Aplicar ordenamiento
        switch (filters.sort) {
          case 'price-asc':
            results.sort((a, b) => a.originalData.price - b.originalData.price)
            break
          case 'price-desc':
            results.sort((a, b) => b.originalData.price - a.originalData.price)
            break
          case 'rating':
            results.sort((a, b) => b.Rating - a.Rating)
            break
          case 'newest':
            results.sort((a, b) => new Date(b.originalData.createdAt) - new Date(a.originalData.createdAt))
            break
        }
        
        // Filtrar por disponibilidad
        if (filters.availability === 'in-stock') {
          results = results.filter(product => 
            !product.isArticle || product.originalData.stock > 0
          )
        }
        
        setSearchResults(results);
        setIsLoading(false);
      }, 800);
    };
    performSearch();
  }, [searchParams]);

  // Manejar el envio del formulario de busqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  // Aplicar filtros
  const applyFilters = () => {
    // Aquí se enviarian los filtros a la API
    setSearchParams({ 
      q: searchTerm,
      ...filters 
    });
    setShowFilters(false);
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: '',
      sort: 'relevance',
      availability: 'all'
    });
    setSearchParams({ q: searchTerm });
  };

  return (
    <div className="bg-[#F4F1DE] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de búsqueda */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">Búsqueda</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <h1 className="text-3xl md:text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">
              Resultados de búsqueda {searchTerm && `para "${searchTerm}"`}
            </h1>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#7A6E6E]/30 text-[#7A6E6E] font-[Alexandria]"
              >
                <FaFilter /> Filtros
              </button>
              
              <div className="relative">
                <select 
                  value={filters.sort}
                  onChange={(e) => setFilters({...filters, sort: e.target.value})}
                  className="appearance-none bg-white border border-[#7A6E6E]/30 rounded-lg px-4 py-2 pr-8 text-[#7A6E6E] font-[Alexandria] cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#7A6E6E]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="relative max-w-3xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos, artistas, categorías..."
                className="w-full bg-white border border-[#7A6E6E]/30 rounded-full py-4 pl-6 pr-14 text-[#7A6E6E] font-[Alexandria] focus:outline-none focus:ring-2 focus:ring-[#81B29A]"
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#E07A5F] rounded-full p-3 hover:bg-[#d46a50] transition-colors"
              >
                <FaSearch className="text-white text-lg" />
              </button>
            </div>
          </form>
          
          <p className="text-[#7A6E6E] font-[Alexandria]">
            {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'} encontrados
          </p>
        </div>
        
        {/* Panel de filtros (responsive) */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#7A6E6E] font-[Alexandria]">Filtros</h3>
              <button 
                onClick={clearAllFilters}
                className="text-[#E07A5F] font-[Alexandria] hover:underline"
              >
                Limpiar todo
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-[#7A6E6E] font-[Alexandria] mb-3">Categoría</h4>
                <select 
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full bg-white border border-[#7A6E6E]/30 rounded-lg px-4 py-2 text-[#7A6E6E] font-[Alexandria]"
                >
                  {filterCategories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <h4 className="font-medium text-[#7A6E6E] font-[Alexandria] mb-3">Rango de precios</h4>
                <select 
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  className="w-full bg-white border border-[#7A6E6E]/30 rounded-lg px-4 py-2 text-[#7A6E6E] font-[Alexandria]"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <h4 className="font-medium text-[#7A6E6E] font-[Alexandria] mb-3">Calificación</h4>
                <select 
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  className="w-full bg-white border border-[#7A6E6E]/30 rounded-lg px-4 py-2 text-[#7A6E6E] font-[Alexandria]"
                >
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>{rating.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <h4 className="font-medium text-[#7A6E6E] font-[Alexandria] mb-3">Disponibilidad</h4>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all"
                    name="availability"
                    value="all"
                    checked={filters.availability === 'all'}
                    onChange={() => setFilters({...filters, availability: 'all'})}
                    className="mr-2 text-[#E07A5F] focus:ring-[#E07A5F]"
                  />
                  <label htmlFor="all" className="text-[#7A6E6E] font-[Alexandria] mr-4">Todos</label>
                  
                  <input
                    type="radio"
                    id="in-stock"
                    name="availability"
                    value="in-stock"
                    checked={filters.availability === 'in-stock'}
                    onChange={() => setFilters({...filters, availability: 'in-stock'})}
                    className="mr-2 text-[#E07A5F] focus:ring-[#E07A5F]"
                  />
                  <label htmlFor="in-stock" className="text-[#7A6E6E] font-[Alexandria]">En stock</label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-3">
              <button 
                onClick={() => setShowFilters(false)}
                className="px-6 py-2 border border-[#7A6E6E]/30 rounded-lg text-[#7A6E6E] font-[Alexandria] hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button 
                onClick={applyFilters}
                className="px-6 py-2 bg-[#E07A5F] rounded-lg text-white font-[Alexandria] hover:bg-[#d46a50]"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        )}
        
        {/* Resultados de búsqueda */}
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E07A5F]"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {searchResults.map(product => (
                <ProductCard 
                  key={product.id}
                  Discount={product.Discount}
                  ImageSrc={product.ImageSrc}
                  ProductName={product.ProductName}
                  Price={product.Price}
                  FormerPrice={product.FormerPrice}
                  ShowView={product.ShowView}
                  ShowWishlist={product.ShowWishList}
                  Rating={product.Rating}
                  ReviewCount={product.ReviewCount}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-8 flex justify-center">
                <div className="bg-[#F4F1DE] border-2 border-dashed border-[#7A6E6E] rounded-full w-24 h-24 flex items-center justify-center">
                  <FaSearch className="text-[#7A6E6E] text-4xl" />
                </div>
              </div>
              <h3 className="text-2xl font-medium text-[#7A6E6E] font-[Alexandria] mb-4">
                No encontramos resultados para "{searchTerm}"
              </h3>
              <p className="text-[#7A6E6E] font-[Alexandria] max-w-xl mx-auto mb-8">
                Intenta con diferentes palabras clave, verifica la ortografía o ajusta tus filtros para encontrar lo que buscas.
              </p>
              <div className="max-w-xs mx-auto">
                <Button 
                  Text="Explorar todos los productos" 
                  onClick={() => navigate('/')}
                  customClass="bg-[#81B29A] border-[#81B29A] hover:text-[#81B29A]"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Sugerencias de búsqueda cuando no hay resultados */}
        {searchResults.length === 0 && !isLoading && (
          <div className="mt-16">
            <h3 className="text-xl font-medium text-[#7A6E6E] font-[Alexandria] mb-4">Sugerencias de búsqueda:</h3>
            <div className="flex flex-wrap gap-3">
              {['Pinturas abstractas', 'Esculturas modernas', 'Fotografía artística', 'Arte contemporáneo', 'Dibujos a lápiz', 'Impresiones limitadas'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setSearchParams({ q: suggestion });
                  }}
                  className="px-4 py-2 bg-white rounded-lg border border-[#7A6E6E]/30 text-[#7A6E6E] font-[Alexandria] hover:bg-[#F4F1DE]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;