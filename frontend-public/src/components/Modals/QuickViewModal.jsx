import { useState, useEffect } from 'react';
import { FiX, FiShoppingCart, FiHeart, FiMinus, FiPlus, FiTruck, FiRefreshCw } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Button from '../Buttons/Button.jsx';

const QuickViewModal = ({ product, onClose, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.ImageSrc);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => Math.max(1, prev - 1));
  
  const handleWishlistClick = () => {
    setIsWishlisted(true);
    onAddToWishlist(product);
    setTimeout(() => setIsWishlisted(false), 3000);
  };

  // Manejar el cierre con la tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-[Alexandria]"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF5E9] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-[#7A6E6E] hover:text-[#E07A5F] transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Columna izquierda - Imágenes */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center">
              <img 
                src={selectedImage} 
                alt={product.ProductName} 
                className="max-w-full max-h-[350px] object-contain"
              />
            </div>
            <div className="flex gap-3">
              {[product.ImageSrc, ...(product.AdditionalImages || [])].map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Thumb ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-[#7A6E6E]"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          
          {/* Columna derecha - Detalles del producto */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7A6E6E]">{product.ProductName}</h2>
            
            {product.Rating && (
              <div className="flex items-center gap-2 mt-2">
                {[...Array(Math.floor(product.Rating))].map((_, i) => (
                  <FaStar key={i} className="text-[#FFAD33] text-sm" />
                ))}
                {[...Array(5 - Math.floor(product.Rating))].map((_, i) => (
                  <FaStar key={i} className="text-[#A9A9A9] text-sm" />
                ))}
                <span className="text-[#A9A9A9] text-sm">({product.ReviewCount})</span>
              </div>
            )}
            
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xl text-[#E07A5F] font-semibold">{product.Price}</span>
              {product.FormerPrice && (
                <span className="text-[#A9A9A9] line-through">{product.FormerPrice}</span>
              )}
            </div>
            
            <p className="text-[#7A6E6E] mt-4 text-sm">
              {product.ShortDescription || "Descripción breve del producto. Haz clic en 'Ver detalles' para más información."}
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center overflow-hidden border border-[#A9A9A9] rounded-md">
                <button 
                  onClick={decreaseQty} 
                  className="w-11 h-11 text-[#7A6E6E] border-r border-[#A9A9A9] flex items-center justify-center"
                >
                  <FiMinus/>
                </button>
                <div className="px-4 text-[#7A6E6E] text-m">{quantity}</div>
                <button 
                  onClick={increaseQty} 
                  className="w-11 h-11 bg-[#E07A5F] text-white text-m flex items-center justify-center"
                >
                  <FiPlus/>
                </button>
              </div>
              
              <div className="min-w-[180px]">
                <Button Text="Añadir al carrito" className="w-full"/>
              </div>
              
              <button 
                onClick={handleWishlistClick} 
                className={`p-3 border border-[#A9A9A9] rounded-full ${isWishlisted ? 'bg-[#E0FFE5]' : 'bg-white'}`}
              >
                <FiHeart className={`w-5 h-5 ${isWishlisted ? 'text-[#00C36D]' : 'text-[#7A6E6E]'}`} />
              </button>
            </div>
            
            {isWishlisted && (
              <div className="mt-2 text-[#00C36D] text-sm font-medium flex items-center gap-2">
                ¡Añadido a la lista de deseos!
              </div>
            )}
            
            <div className="mt-6 border border-[#A9A9A9] rounded-md divide-y divide-[#A9A9A9]">
              <div className="p-4 flex items-start gap-4">
                <FiTruck className="w-6 h-6 text-[#7A6E6E] flex-shrink-0" />
                <div>
                  <p className="text-[#7A6E6E] font-medium">Envío gratis</p>
                  <p className="text-[#7A6E6E] text-sm">Envío gratuito para pedidos superiores a $140</p>
                </div>
              </div>
              <div className="p-4 flex items-start gap-4">
                <FiRefreshCw className="w-6 h-6 text-[#7A6E6E] flex-shrink-0" />
                <div>
                  <p className="text-[#7A6E6E] font-medium">Entrega de devolución</p>
                  <p className="text-[#7A6E6E] text-sm">Devoluciones gratuitas en 30 días</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button 
                Text="Ver detalles completos" 
                to={`/producto/${product.id}`}
                onClick={onClose}
                customClass="bg-transparent border border-[#7A6E6E] text-[#7A6E6E] hover:bg-[#F4F1DE]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;