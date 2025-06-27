import { useState } from 'react'
import Button from '../components/Buttons/Button.jsx'
import { useNavigate } from 'react-router-dom'
import ImageCarousel1 from '../assets/imagencarrusel1.png'
import { ChevronRight } from 'lucide-react'
import { FaArrowLeft, FaArrowRight,  FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import usePublicDataCategories from '../hooks/useDataCategories.jsx'
import usePublicDataArtPieces from '../hooks/useDataArtPieces.jsx'
import usePublicDataArticles from '../hooks/useDataArticles.jsx'
import FeaturedProductsGrid from '../components/Main/FeaturedProductsGrid.jsx'
import QuickViewModal from '../components/Modals/QuickViewModal.jsx';
import Hero from '../assets/herosectionimage.png'
import ProductCard from '../components/Cards/ProductCard.jsx'


const Home = () => {
  const [activeSlide, setActiveSlide] = useState(3)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentCategoryIndex, setCategoryProductIndex] = useState(0)
  const navigate = useNavigate()
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { categories, loading: categoriesLoading } = usePublicDataCategories()
  const { articles, loading: articlesLoading } = usePublicDataArticles()
  const { artPieces, loading: artPiecesLoading } = usePublicDataArtPieces()

  // Combinar productos para las diferentes secciones
  const allProducts = [...(articles || []), ...(artPieces || [])]
  console.log('🏠 HOME - All products:', allProducts) // ← AGREGAR ESTO
  console.log('🏠 HOME - Sample product:', allProducts[0]) // ← Y ESTO

  const isLoadingProducts = articlesLoading || artPiecesLoading

  
  const benefits = [
    { id: 1, icon: FaTruck, title: 'ENTREGA GRATUITA Y RÁPIDA', description: 'Entrega gratuita para todos los pedidos superiores a $140' },
    { id: 2, icon: FaHeadset, title: 'SERVICIO AL CLIENTE 24/7', description: 'Atención al cliente amigable 24 horas al día, 7 días a la semana' },
    { id: 3, icon: FaShieldAlt, title: 'GARANTÍA DE DEVOLUCIÓN DE DINERO', description: 'Devolvemos tu dinero en 30 días' }
  ]
  const nextProducts = () => {
    setCurrentProductIndex(prev => prev + 1 >= flashSaleProducts.length - 3 ? flashSaleProducts.length - 4 : prev + 1 )
  }
  const prevProducts = () => {
    setCurrentProductIndex(prev => prev - 1 < 0 ? 0 : prev - 1)
  }
  const nextCategories = () => {
    setCategoryProductIndex(prev => 
      prev + 6 >= categories.length ? categories.length - 6 : prev + 6
    )
  }
  const prevCategories = () => {
    setCategoryProductIndex(prev => prev - 6 < 0 ? 0 : prev - 6);
  }
  const counterItems = [
    { number: '23', label: 'Horas' },
    { number: '05', label: 'Días' },
    { number: '59', label: 'Minutos' },
    { number: '35', label: 'Segundos' }
  ]
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };
  const closeQuickView = () => {
    setQuickViewProduct(null);
  };
  const handleAddToWishlist = (product) => {
    setWishlistItems(prev => [...prev, product]);
    // Aqui hay que escoger si guardar en localStorage o en backend
  };
  // Función para transformar datos del backend al formato del ProductCard
  const transformProductData = (item, index) => {
    console.log('🔄 HOME - Transforming item:', item) 
    
    if (!item) {
      console.log('❌ HOME - Item is null/undefined')
      return null
    }
    
    const isArticle = item.hasOwnProperty('stock')
    const productId = item._id
    
    console.log('🆔 HOME - Product ID:', productId, 'isArticle:', isArticle)   
    
    if (!productId) {
      console.log('❌ HOME - No _id found in item:', item)
      return null
    }
    const transformedProduct = {
      id: productId,
      ProductName: isArticle ? item.articleName : item.artPieceName,
      Price: `$${item.price}`,
      FormerPrice: item.discount > 0 ? `$${(item.price / (1 - item.discount/100)).toFixed(0)}` : null,
      ImageSrc: item.image || '/placeholder-image.jpg',
      Discount: item.discount > 0 ? `${item.discount}%` : null,
      ShowView: true,
      ShowWishList: true,
      Rating: Math.floor(Math.random() * 2) + 4, // 4 o 5 (temporal)
      ReviewCount: Math.floor(Math.random() * 50) + 50, // 50-99 (temporal)
      IsNew: Math.random() > 0.8, // 20% chance de ser nuevo (temporal)
      // Mantener datos originales para otras funcionalidades
      isArticle: isArticle,
      originalData: item
    }
    console.log('✅ HOME - Transformed product:', transformedProduct) // ← DEBUG
    return transformedProduct
  }
  // Dividir productos en secciones
  const flashSaleProducts = allProducts.map(transformProductData).filter(product => product !== null).slice(0, 8)
  const bestProducts = allProducts.map(transformProductData) .filter(product => product !== null).slice(8, 12)
  const exploreProducts = allProducts.map(transformProductData).filter(product => product !== null).slice(4, 12)
  console.log('🏠 HOME - Flash sale products:', flashSaleProducts)
  console.log('🏠 HOME - First flash sale product ID:', flashSaleProducts[0]?.id)
  return (
    <div className="flex flex-col bg-[#F4F1DE]">
      <div className="flex">
        <div className="w-64 py-12 pl-12 pr-8 ml-8 mr-4">
          <nav>
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-[#7A6E6E] font-[Alexandria]">{category.name}</span>
                  {category.hasSubmenu && ( <ChevronRight size={18} className="text-[#7A6E6E]"/> )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="w-px bg-[#7A6E6E] h-[60vh] my-auto"></div>
        <div className="flex-1 p-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="flex">
                <div className="w-1/2 p-12">
                  <p className="text-[#7A6E6E] font-[Alexandria] mb-4">Muestra por Ernst Ludwig Kirchner</p>
                  <h2 className="text-4xl font-[Alexandria] text-[#7A6E6E] font-medium mb-8">Cupón de<br/>descuento de<br/>hasta el 10%</h2>
                  <button className="flex items-center text-[#7A6E6E] font-[Alexandria]">Comprar ahora<FaArrowRight size={18} className="ml-2"/></button>
                </div>
                <div className="w-1/2">
                  <img src={ImageCarousel1} alt="Artwork by Ernst Ludwig Kirchner" className="w-full h-full object-cover"/>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 py-4">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <button key={dot} onClick={() => setActiveSlide(dot)} className={`w-4 h-4 rounded-full ${ activeSlide === dot ? 'bg-[#E07A5F]' : 'bg-[#7A6E6E]' }`} aria-label={`Go to slide ${dot + 1}`}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-16 pt-24 pb-12 bg-[#F4F1DE]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">De hoy</h2>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">Ventas flash</h1>
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <div className="flex flex-col items-center mr-2">
                  <span className="text-xs text-[#7A6E6E] font-[Alexandria]">Días</span>
                  <span className="text-3xl text-[#7A6E6E] font-[Alexandria] font-medium">03</span>
                </div>
                <span className="text-3xl text-[#87A318] font-[Alexandria] mx-1">:</span>
                <div className="flex flex-col items-center mx-2">
                  <span className="text-xs text-[#7A6E6E] font-[Alexandria]">Horas</span>
                  <span className="text-3xl text-[#7A6E6E] font-[Alexandria] font-medium">23</span>
                </div>
                <span className="text-3xl text-[#87A318] font-[Alexandria] mx-1">:</span>
                <div className="flex flex-col items-center mx-2">
                  <span className="text-xs text-[#7A6E6E] font-[Alexandria]">Minutos</span>
                  <span className="text-3xl text-[#7A6E6E] font-[Alexandria] font-medium">19</span>
                </div>
                <span className="text-3xl text-[#87A318] font-[Alexandria] mx-1">:</span>
                <div className="flex flex-col items-center ml-2">
                  <span className="text-xs text-[#7A6E6E] font-[Alexandria]">Segundos</span>
                  <span className="text-3xl text-[#7A6E6E] font-[Alexandria] font-medium">56</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={prevProducts} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentProductIndex >= flashSaleProducts.length - 4}>
                  <FaArrowLeft size={20} className="text-[#7A6E6E]" />
                </button>
                <button onClick={nextProducts} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentProductIndex >= flashSaleProducts.length - 4}>
                  <FaArrowRight size={20} className="text-[#7A6E6E]" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-8 overflow-hidden">
            {isLoadingProducts ? (
              // Skeleton loading para 4 productos
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-[270px] bg-white rounded-lg shadow-sm animate-pulse">
                  <div className="h-[180px] bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              flashSaleProducts.slice(currentProductIndex, currentProductIndex + 4).map(product => (
                <ProductCard  key={product.id}  {...product} onQuickView={handleQuickView}/> 
              ))
            )}
          </div>
          <div className="flex justify-center mt-6 max-w-[300px] mx-auto">
            <Button Text="Ver todos los productos" to={'/catalogo'}/>
          </div>
        </div>
      </div>
      <div className="my-8 w-full">
        <div className="mx-auto w-4/5 border-t border-[#7A6E6E]/60"></div>
      </div>
      <div className="w-full px-16 pb-12 pt-12 bg-[#F4F1DE]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">Subcategorías</h2>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">Buscar por subcategoría</h1>
            <div className="flex space-x-2">
              <button onClick={prevCategories} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentCategoryIndex === 0}>
                <FaArrowLeft size={20} className="text-[#7A6E6E]"/>
              </button>
              <button onClick={nextCategories} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentCategoryIndex >= categories.length - 6}>
                <FaArrowRight size={20} className="text-[#7A6E6E]"/>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-8">
            {categoriesLoading ? (
              // Skeleton loading para 6 categorias
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-42 h-42 border border-[#7A6E6E] border-opacity-20 rounded-md flex flex-col items-center justify-center bg-gray-200 animate-pulse">
                    <div className="w-14 h-14 bg-gray-300 rounded mb-5"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              categories.slice(currentCategoryIndex, currentCategoryIndex + 6).map((category, index) => (
                <div key={category._id || index} className="flex flex-col items-center">
                  <div className="w-42 h-42 border border-[#7A6E6E] border-opacity-20 rounded-md flex flex-col items-center justify-center bg-transparent bg-opacity-60 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    {/* Icono por defecto ya que el backend no tiene iconos */}
                    <div className="w-14 h-14 bg-[#E07A5F] rounded-full flex items-center justify-center mb-5">
                      <span className="text-white text-2xl">🎨</span>
                    </div>
                    <span className="text-[#7A6E6E] font-[Alexandria] text-center text-md">{category.categoryName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="my-8 w-full">
        <div className="mx-auto w-4/5 border-t border-[#7A6E6E]/60"></div>
      </div>
      <div className="w-full px-16 pt-12 pb-12 bg-[#F4F1DE]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">Este mes</h2>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">Productos más vendidos</h1>
            <div className="w-64"><Button Text="Ver todos los productos" to={'/catalogo'}/></div>
          </div>
          <div className="flex gap-4 mb-8 overflow-hidden">
          {isLoadingProducts ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-[270px] bg-white rounded-lg shadow-sm animate-pulse">
                <div className="h-[180px] bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            bestProducts.map(product => (
              <ProductCard key={product.id} Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} ShowView={product.ShowView} ShowWishlist={product.ShowWishList} Rating={product.Rating} ReviewCount={product.ReviewCount} onQuickView={handleQuickView}/>
            ))
          )}
        </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto pt-12 pb-12 font-[Alexandria] bg-gradient-to-r from-[#194338] to-[#194338]/90 rounded-lg p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <p className="text-sm text-white mb-4">Categorias</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 leading-tight">Decora tu espacio<br/>de trabajo</h1>
            <div className="flex flex-wrap gap-4 mb-12">
              {counterItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center bg-white rounded-full h-19 w-19">
                  <span className="text-[#7A6E6E] text-xl font-bold">{item.number}</span>
                  <span className="text-[#7A6E6E] text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="max-w-xs">
              <Button Text="¡Compra ahora!" to={'/catalogo'} customClass="bg-[#81B29A] border-[#81B29A] hover:text-[#81B29A]"/>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={Hero} alt="Forest painting" className="w-[317px] h-[415px] rounded-lg object-cover"/>
          </div>
        </div>
      </div>
      <div className="w-full px-16 pt-24 pb-12 bg-[#F4F1DE]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">Nuestros productos</h2>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">Explora nuestros productos</h1>
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer">
                <FaArrowLeft size={20} className="text-[#7A6E6E]"/>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer">
                <FaArrowRight size={20} className="text-[#7A6E6E]"/>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {isLoadingProducts ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-[270px] bg-white rounded-lg shadow-sm animate-pulse">
                  <div className="h-[180px] bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              exploreProducts.map(product => (
                <ProductCard key={product.id} Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} ShowView={product.ShowView} IsNew={product.IsNew} ShowWishlist={product.ShowWishList} Rating={product.Rating} ReviewCount={product.ReviewCount} onQuickView={handleQuickView}/>
              ))
            )}
          </div>
          <div className="flex justify-center mt-6 max-w-[300px] mx-auto">
            <Button Text="Ver todos los productos"/>
          </div>
        </div>
      </div>
      <div className="w-full px-16 pt-12 pb-12 bg-[#F4F1DE]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-[#E07A5F] w-6 h-12 rounded-md mr-2"></div>
            <h2 className="text-lg font-semibold text-[#E07A5F] font-[Alexandria]">Destacado</h2>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-[#7A6E6E] font-[Alexandria] font-medium">Destacado</h1>
          </div>
          <FeaturedProductsGrid/>
        </div>
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-24 pt-12">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div key={benefit.id} className="flex flex-col items-center text-center p-6 font-[Alexandria] text-[#7A6E6E]">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#D3D3D3] mb-4">
                <Icon className="text-2xl"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-base font-regular">{benefit.description}</p>
            </div>
          )
        })}
      </div>
      {/* Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={closeQuickView} onAddToWishlist={handleAddToWishlist}/>
      )}
    </div>
  )
}
export default Home