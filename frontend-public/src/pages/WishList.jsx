import ProductCard from '../components/Cards/ProductCard.jsx'
import TransparentButton from '../components/transparentbutton.jsx'
import SmallLifeForms from '../assets/slfiii.png'
import MorningRain from '../assets/mriii.png'
import AfterRain from '../assets/ariii.png'
import Larkspur from '../assets/larkspur.png'
import Charlotte from '../assets/charlotte.png'
import BlackBird from '../assets/blackbird.png'
import Ocean from '../assets/ocean.png'
import Mudflat from '../assets/mudflat.png'

const Wishlist = () => {
  const wishlistProducts = [
    { id: 1, ProductName: "Small Life forms III", Price: "$370", FormerPrice: "$420", ImageSrc: SmallLifeForms, Discount: "30%", ShowTrash: true },
    { id: 2, ProductName: "Morning Rain III", Price: "$500", ImageSrc: MorningRain, ShowTrash: true },
    { id: 3, ProductName: "After Rain III", Price: "$1,120", ImageSrc: AfterRain,  ShowTrash: true },
    { id: 4, ProductName: "Larkspur", Price: "$1,560", ImageSrc: Larkspur,  ShowTrash: true }
  ]
  const recommendedProducts = [
    { id: 5, ProductName: "Charlotte Sometimes Hums as She Paints Painting", Price: "$3,600", FormerPrice: "$4,075", ImageSrc: Charlotte, Discount: "35%", ShowView: true, Rating: 5, ReviewCount: 65 },
    { id: 6, ProductName: "Black Bird #2", Price: "$5,010", ImageSrc: BlackBird, ShowView: true, Rating: 5, ReviewCount: 65 },
    { id: 7, ProductName: "Ocean (limited edition)", Price: "$4,300", ImageSrc: Ocean, Discount: "40%", IsNew: true, ShowView: true, Rating: 4.5, ReviewCount: 65 },
    { id: 8, ProductName: "Pintura Mudflat", Price: "$490", ImageSrc: Mudflat, ShowView: true, Rating: 5, ReviewCount: 65 }
  ]
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl font-[Alexandria]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-normal text-[#7A6E6E]">Lista de deseos (4)</h2>
        <div className="w-64">
          <TransparentButton Text="Mover todo al carrito" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {wishlistProducts.map(product => (
          <div key={product.id} className="flex justify-center">
            <ProductCard Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} ShowTrash={product.ShowTrash}/>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="bg-[#E07A5F] w-6 h-12 rounded-lg mr-2"></div>
          <h2 className="text-lg font-normal text-[#7A6E6E]">Sólo para ti</h2>
        </div>
        <div className="w-64">
          <TransparentButton Text="Ver todo" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map(product => (
          <div key={product.id} className="flex justify-center">
            <ProductCard Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} Rating={product.Rating} ReviewCount={product.ReviewCount} IsNew={product.IsNew} ShowView={product.ShowView}/>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Wishlist