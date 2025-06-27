import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import Breadcrumbs from '../components/Handlers/BreadCrumbs.jsx'
import Button from '../components/Buttons/Button.jsx'
import TransparentButton from '../components/Buttons/TransparentButton.jsx'
import QuantityInput from '../components/Inputs/QuantityInput.jsx'
import { useCart } from '../hooks/useCart.js'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  
  const subtotal = getCartTotal()
  const shipping = subtotal > 140 ? 0 : 20
  const total = subtotal - discount + shipping
  
  const applyCoupon = () => {
    // Logica simple de cupones
    if (couponCode.toLowerCase() === 'descuento10') {
      setDiscount(subtotal * 0.1)
    } else if (couponCode.toLowerCase() === 'enviogratis') {
      setDiscount(shipping)
    } else {
      alert('Cupón no válido')
    }
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F1DE] font-[Alexandria] text-[#7A6E6E] px-20 py-10">
        <Breadcrumbs />
        <div className="text-center py-20">
          <h2 className="text-3xl mb-4">Tu carrito está vacío</h2>
          <p className="text-lg mb-8">¡Agrega algunos productos para comenzar!</p>
          <Button Text="Ir a comprar" to="/" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F1DE] font-[Alexandria] text-[#7A6E6E] px-20 py-10">
      <Breadcrumbs />
      
      <div className="mt-10 grid grid-cols-4 font-semibold text-sm py-4 px-6 rounded-t-md bg-[#FDF7E3] border-b border-[#E8E3CC]">
        <span>Producto</span>
        <span>Precio</span>
        <span>Cantidad</span>
        <span>Subtotal</span>
      </div>
      
      {cartItems.map((item, index) => (
        <div key={item.id} className={`grid grid-cols-4 items-center py-6 px-6 ${index % 2 === 0 ? 'bg-[#F4F1DE]' : 'bg-[#FDF7E3]'} shadow-inner`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <FiTrash2 size={18} />
            </button>
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <span>{item.name}</span>
          </div>
          <span>${item.price}</span>
          <QuantityInput 
            value={item.quantity}
            onChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
          />
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      
      <div className="flex justify-between gap-4 items-center mt-10 w-full">
        <div className="flex-1 max-w-[300px] flex-shrink-0">
          <TransparentButton Text="Volver a la tienda" to="/" />
        </div>
        <div className="flex-1 max-w-[300px] flex-shrink-0">
          <TransparentButton Text="Actualizar carrito" onClick={() => window.location.reload()} />
        </div>
      </div>
      
      <div className="flex gap-10 mt-10 justify-between items-start">
        <div className="flex gap-4 items-center">
          <input 
            type="text" 
            placeholder="Código de cupón (opcional)" 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border h-12 border-[#7A6E6E] rounded px-4 py-2 w-[450px] placeholder-[#A49E9E] text-m focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
          />
          <Button Text="Aplicar cupón" onClick={applyCoupon} />
        </div>
        
        <div className="w-[400px] border border-[#7A6E6E] rounded-md p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Total del carrito ({getCartItemsCount()} productos)</h3>
          <div className="flex justify-between text-sm mb-4">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm mb-4 text-green-600">
              <span>Descuento:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm mb-4">
            <span>Envío:</span>
            <span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t pt-4 mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <Button Text="Proceder al pago" to="/carrito/checkout"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart