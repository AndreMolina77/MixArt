import { FiTrash2, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const ProductCard = ({
  id,
  Discount, 
  ImageSrc, 
  ProductName, 
  Price, 
  FormerPrice, 
  Rating, 
  ReviewCount, 
  IsNew, 
  ShowWishlist, 
  ShowView, 
  ShowTrash,
  onQuickView // Nueva prop para manejar la vista rápida
}) => {
  const filledStars = Rating ? Math.floor(Rating) : 0
  const emptyStars = 5 - filledStars

  return (
    <div className="w-[270px] font-[Alexandria] rounded-lg">
      <div className="relative">
        <div className="absolute top-2.5 left-2 flex flex-col gap-2 items-start">
          {Discount && (
            <span className="bg-[#E07A5F] text-white text-sm px-2 py-1 rounded font-normal">{Discount}</span>
          )}
          {IsNew && (
            <span className="bg-[#81B29A] text-white text-sm px-2 py-1 rounded font-normal">Nuevo</span>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {ShowTrash && (
            <div className="bg-white rounded-full p-2 shadow cursor-pointer">
              <FiTrash2 className="text-[#7A6E6E] text-sm w-5 h-5" />
            </div>
          )}
          {ShowWishlist && (
            <div className="bg-white rounded-full p-2 shadow cursor-pointer">
              <FiHeart className="text-[#7A6E6E] text-sm w-5 h-5" />
            </div>
          )}
          {ShowView && (
            <div 
              className="bg-white rounded-full p-2 shadow cursor-pointer"
              onClick={() => onQuickView({ id, Discount, ImageSrc, ProductName, Price, FormerPrice, Rating, ReviewCount, IsNew })}
            >
              <FiEye className="text-[#7A6E6E] text-sm w-5 h-5" />
            </div>
          )}
        </div>
        <div className="bg-white pt-4 px-0 pb-0 rounded-b-lg shadow-sm flex flex-col items-center">
          <NavLink to={`/producto/${id}`} className="h-[180px] flex items-center justify-center w-full">
            <img src={ImageSrc} alt={ProductName} className="max-w-[180px] max-h-[180px] object-cover" />
          </NavLink>
          <button className="w-full h-10 bg-[#E07A5F] text-white text-sm py-2 rounded-b-lg font-normal flex items-center justify-center gap-2 mt-4 hover:bg-transparent border-2 border-[#E07A5F] hover:border-[#E07A5F] hover:text-[#E07A5F] transition duration-300 cursor-pointer">
            <FiShoppingCart />
            Añadir al carrito
          </button>
        </div>
      </div>
      <div className="px-1 pt-3 pb-4 bg-transparent">
        <p className="text-[#7A6E6E] text-base font-medium">{ProductName}</p>
        {Rating && (
          <div className="flex items-center gap-1 mt-1">
            {[...Array(filledStars)].map((_, i) => ( <FaStar key={`filled-${i}`} className="text-[#FFAD33] text-xs" /> ))}
            {[...Array(emptyStars)].map((_, i) => ( <FaStar key={`empty-${i}`} className="text-[#A9A9A9] text-xs" />))}
            {ReviewCount && ( <span className="text-[#A9A9A9] text-xs ml-1">({ReviewCount})</span> )}
          </div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#E07A5F] text-base font-medium">{Price}</span>
          {FormerPrice && (
            <span className="text-[#A9A9A9] text-base font-medium line-through">{FormerPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductCard;