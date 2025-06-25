import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageCarousel1 from '../assets/imagencarrusel1.png'
import { ChevronRight } from 'lucide-react'
import { FaArrowLeft, FaArrowRight,  FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa'
import InTheRain from '../assets/itrii.png'
import Charlotte from '../assets/charlotte.png'
import SmallLifeForms from '../assets/slfiii.png'
import MorningRain from '../assets/mriii.png'
import Larkspur from '../assets/larkspur.png'
import ProductCard from '../components/Cards/ProductCard.jsx'
import Button from '../components/Buttons/Button.jsx'
import Impressionism from '../assets/impressionism.png'
import Cubism from '../assets/cubism.png'
import Rennaisance from '../assets/rennaisance.png'
import Surrealism from '../assets/surrealism.png'
import Baroque from '../assets/baroque.png'
import PopArt from '../assets/popart.png'
import Expressionism from '../assets/expressionism.png'
import Abstract from '../assets/abstract.png'
import ArtNoveau from '../assets/artnoveau.png'
import Dadaism from '../assets/dadaism.png'
import Minimalism from '../assets/minimalism.png'
import Fauvism from '../assets/fauvism.png'
import Ocean from '../assets/ocean.png'
import TommySimpson from '../assets/tommysimpson.png'
import NewYork from '../assets/newyork.png'
import Sol from '../assets/sol.png'
import Hero from '../assets/herosectionimage.png'
import FigureStudy from '../assets/figurestudy.png'
import Pintura from '../assets/pintura.png'
import WILD from '../assets/wildsculpture.png'
import HelloKitty from '../assets/hellokitty.png'
import AbandonedDreams from '../assets/ab.png'
import MountainPrint from '../assets/mp.png'
import Jacket from '../assets/jacket.png'
import FeaturedProductsGrid from '../components/Main/FeaturedProductsGrid.jsx'
import QuickViewModal from '../components/Modals/QuickViewModal.jsx';


const Home = () => {
  const [activeSlide, setActiveSlide] = useState(3)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentCategoryIndex, setCategoryProductIndex] = useState(0)
  const navigate = useNavigate()
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  const categories = [
    { name: 'Pinturas', hasSubmenu: true },
    { name: 'Materiales', hasSubmenu: true },
    { name: 'Dibujos', hasSubmenu: false },
    { name: 'Esculturas', hasSubmenu: false },
    { name: 'Impresos', hasSubmenu: false },
    { name: 'Fotografía', hasSubmenu: false },
    { name: 'Tarjetas de regalo', hasSubmenu: false },
    { name: 'Decoraciones', hasSubmenu: false },
    { name: 'Exclusivo', hasSubmenu: false }
  ]
  const products = [
    { id: 1, ProductName: "Small Life forms III", Price: "$370", FormerPrice: "$420", ImageSrc: SmallLifeForms, Discount: "30%", ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 99 },
    { id: 2, ProductName: "Morning Rain III", Price: "$500", FormerPrice: "$600", ImageSrc: MorningRain, Discount: "25%", ShowView: true, ShowWishList: true, Rating: 4.5, ReviewCount: 99 },
    { id: 3, ProductName: "In the Rain II", Price: "$5,000", FormerPrice: "$5,990", ImageSrc: InTheRain,  Discount: "40%", ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 88 },
    { id: 4, ProductName: "Larkspur", Price: "$1,560", FormerPrice: "$1,800", ImageSrc: Larkspur, Discount: "25%", ShowView: true, ShowWishList: true, Rating: 4.8, ReviewCount: 75 },
    { id: 5, ProductName: "Charlotte Sometimes Hums as She Paints Painting", Price: "$3,600", FormerPrice: "$4,075", ImageSrc: Charlotte, Discount: "35%", ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 75 }
  ]
  const bestProducts = [
    { id: 6, ProductName: "Ocean (limited edition)", Price: "$5,010", FormerPrice: "$5,300", ImageSrc: Ocean, ShowView: true, ShowWishList: true, Rating: 4.6, ReviewCount: 65 },
    { id: 7, ProductName: "Sol LeWitt", Price: "$53,000", FormerPrice: "$63,600", ImageSrc: Sol, ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 65 },
    { id: 8, ProductName: "Tommy Simpson", Price: "$1,960", FormerPrice: "$2,500", ImageSrc: TommySimpson, ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 65 },
    { id: 9, ProductName: "Fifth Avenue, New York, New York, 2006", Price: "$360", ImageSrc: NewYork, ShowView: true, ShowWishList: true, Rating: 4.8, ReviewCount: 65 }
  ]
  const exploreProducts = [
    { id: 10, ProductName: "Two trees", Price: "$110,000", ImageSrc: Hero, ShowView: true, ShowWishList: true, Rating: 4, ReviewCount: 35 },
    { id: 11, ProductName: "Figure study", Price: "$1,100", ImageSrc: FigureStudy, ShowView: true, ShowWishList: true, Rating: 4, ReviewCount: 35 },
    { id: 12, ProductName: "Pintura reflexión", Price: "$6,200", ImageSrc: Pintura, ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 155 },
    { id: 13, ProductName: "WILD Sculpture", Price: "$3,088", ImageSrc: WILD, ShowView: true, ShowWishList: true, Rating: 4, ReviewCount: 145 },
    { id: 14, ProductName: "Hello, kitty!", Price: "$540", ImageSrc: HelloKitty, IsNew: true, ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 65 },
    { id: 15, ProductName: "ABANDONED DREAMS", Price: "$1,130", ImageSrc: AbandonedDreams, ShowView: true, ShowWishList: true, Rating: 5, ReviewCount: 35 },
    { id: 16, ProductName: "Bai Tho Mountain Print", Price: "$322", ImageSrc: MountainPrint, IsNew: true, ShowView: true, ShowWishList: true, Rating: 4.6, ReviewCount: 55 },
    { id: 17, ProductName: "Quilted Saltin Jacket", Price: "$8,260", ImageSrc: Jacket, ShowView: true, ShowWishList: true, Rating: 4.4, ReviewCount: 55 }
  ]
  const artCategories = [
    { name: 'Impresionismo', icon: Impressionism },
    { name: 'Cubismo', icon: Cubism },
    { name: 'Renacimiento', icon: Rennaisance },
    { name: 'Surrealismo', icon: Surrealism },
    { name: 'Barroco', icon: Baroque },
    { name: 'Pop Art', icon: PopArt },
    { name: 'Expresionismo', icon: Expressionism },
    { name: 'Abstracto', icon: Abstract },
    { name: 'Art Nouveau', icon: ArtNoveau },
    { name: 'Dadaísmo', icon: Dadaism },
    { name: 'Minimalismo', icon: Minimalism },
    { name: 'Fauvismo', icon: Fauvism },
  ]
  const benefits = [
    { id: 1, icon: FaTruck, title: 'ENTREGA GRATUITA Y RÁPIDA', description: 'Entrega gratuita para todos los pedidos superiores a $140' },
    { id: 2, icon: FaHeadset, title: 'SERVICIO AL CLIENTE 24/7', description: 'Atención al cliente amigable 24 horas al día, 7 días a la semana' },
    { id: 3, icon: FaShieldAlt, title: 'GARANTÍA DE DEVOLUCIÓN DE DINERO', description: 'Devolvemos tu dinero en 30 días' }
  ]
  const nextProducts = () => {
    setCurrentProductIndex(prev => prev + 1 >= products.length - 3 ? products.length - 4 : prev + 1 )
  }
  const prevProducts = () => {
    setCurrentProductIndex(prev => prev - 1 < 0 ? 0 : prev - 1)
  }
  const nextCategories = () => {
    setCategoryProductIndex(prev => 
      prev + 6 >= artCategories.length ? artCategories.length - 6 : prev + 6
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
                <button onClick={prevProducts} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentProductIndex === 0}>
                  <FaArrowLeft size={20} className="text-[#7A6E6E]" />
                </button>
                <button onClick={nextProducts} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentProductIndex >= products.length - 4}>
                  <FaArrowRight size={20} className="text-[#7A6E6E]" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-8 overflow-hidden">
            {products.slice(currentProductIndex, currentProductIndex + 4).map(product => (
              <ProductCard key={product.id} Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} ShowView={product.ShowView} ShowWishlist={product.ShowWishList} Rating={product.Rating} ReviewCount={product.ReviewCount} onQuickView={handleQuickView}/>
            ))}
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
              <button onClick={nextCategories} className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer" disabled={currentCategoryIndex >= artCategories.length - 6}>
                <FaArrowRight size={20} className="text-[#7A6E6E]"/>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-8">
            {artCategories.slice(currentCategoryIndex, currentCategoryIndex + 6).map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-42 h-42 border border-[#7A6E6E] border-opacity-20 rounded-md flex flex-col items-center justify-center bg-transparent bg-opacity-60 hover:shadow-md transition-shadow duration-300">
                  <img src={category.icon} alt={category.name} className="w-14 h-14 object-contain mb-5"/>
                  <span className="text-[#7A6E6E] font-[Alexandria] text-center text-md">{category.name}</span>
                </div>
              </div>
            ))}
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
            {bestProducts.slice(currentProductIndex, currentProductIndex + 4).map(bestProducts => (
              <ProductCard key={bestProducts.id} Discount={bestProducts.Discount} ImageSrc={bestProducts.ImageSrc} ProductName={bestProducts.ProductName} Price={bestProducts.Price} FormerPrice={bestProducts.FormerPrice} ShowView={bestProducts.ShowView} ShowWishlist={bestProducts.ShowWishList} Rating={bestProducts.Rating} ReviewCount={bestProducts.ReviewCount} onQuickView={handleQuickView}/>
            ))}
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
            {exploreProducts.slice(currentProductIndex, currentProductIndex + 8).map(exploreProducts => (
              <ProductCard key={exploreProducts.id} Discount={exploreProducts.Discount} ImageSrc={exploreProducts.ImageSrc} ProductName={exploreProducts.ProductName} Price={exploreProducts.Price} FormerPrice={exploreProducts.FormerPrice} ShowView={exploreProducts.ShowView} IsNew={exploreProducts.IsNew} ShowWishlist={exploreProducts.ShowWishList} Rating={exploreProducts.Rating} ReviewCount={exploreProducts.ReviewCount} onQuickView={handleQuickView}/>
            ))}
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