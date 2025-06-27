import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Buttons/Button.jsx'
import Breadcrumbs from '../components/Handlers/BreadCrumbs.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import '../css/checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: user?.email || '',
    saveInfo: false
  })
  
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const subtotal = getCartTotal()
  const shipping = subtotal > 140 ? 0 : 20
  const total = subtotal - discount + shipping
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'descuento10') {
      setDiscount(subtotal * 0.1)
    } else if (couponCode.toLowerCase() === 'enviogratis') {
      setDiscount(shipping)
    } else {
      alert('Cupón no válido')
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Debes iniciar sesión o crear una cuenta para realizar una compra')
      navigate('/signup')
      return
    }
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    // Validaciones básicas
    if (!formData.firstName || !formData.address || !formData.city || !formData.phone) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }
    setIsProcessing(true)
    
    try {
      // Preparar datos de la orden
      const orderData = {
        customerId: user.id,
        items: cartItems.map(item => ({
          itemType: item.isArticle ? 'Article' : 'ArtPiece',
          itemId: item.id,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        total: total,
        status: 'Pendiente'
      }
      // Crear la orden
      const response = await fetch('http://localhost:4000/api/public/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData)
      })
      
      if (!response.ok) {
        throw new Error('Error al crear la orden')
      }
      
      const newOrder = await response.json()
      
      // Simular procesamiento de pago (happy path)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Limpiar carrito
      clearCart()
      
      // Guardar datos de la orden en localStorage para la página de confirmación
      localStorage.setItem('lastOrder', JSON.stringify({
        orderId: newOrder._id || 'ORD-' + Date.now(),
        orderData,
        billingInfo: formData,
        paymentMethod,
        total
      }))
      
      // Redirigir a confirmación
      navigate('/finalizar')
      
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al procesar tu pedido. Inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F4F1DE] min-h-screen px-4 sm:px-10 py-8 font-[Alexandria]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs/>
          <div className="text-center py-20">
            <h2 className="text-3xl text-[#7A6E6E] mb-4">Tu carrito está vacío</h2>
            <p className="text-[#7A6E6E] mb-8">Agrega productos antes de proceder al checkout</p>
            <Button Text="Ir a comprar" to="/" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-[#F4F1DE] min-h-screen px-4 sm:px-10 py-8 font-[Alexandria]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs/>
        <h2 className="text-2xl sm:text-3xl text-[#7A6E6E] font-semibold mb-10">Detalles de facturación</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Columna izquierda - Formulario */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Primer nombre *</label>
                <input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Nombre de la empresa</label>
                <input 
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Dirección *</label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Apartamento, piso, etc. (opcional)</label>
                <input 
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Ciudad/pueblo *</label>
                <input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Número de teléfono *</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <div>
                <label className="mb-1 text-sm text-[#7A6E6E] font-[Alexandria]">Correo electrónico *</label>
                <input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria]"
                />
              </div>
              
              <label className="flex items-start gap-2 mt-4 text-[#7A6E6E] text-sm cursor-pointer">
                <input 
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span>Guarde esta información para realizar un pago más rápido la próxima vez</span>
              </label>
            </div>
            
            {/* Columna derecha - Resumen */}
            <div className="flex flex-col gap-6">
              {/* Productos */}
              <div className="flex flex-col gap-3 border-b border-[#ccc] pb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-[#7A6E6E]">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-sm" />
                      <span>{item.name} x{item.quantity}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {/* Totales */}
              <div className="flex justify-between text-[#7A6E6E]">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-[#7A6E6E]">
                <span>Envío:</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span>
              </div>
              
              <div className="flex justify-between text-[#7A6E6E] font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {/* Métodos de pago */}
              <div className="flex flex-col gap-2 mt-4 text-[#7A6E6E]">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label>Tarjeta de crédito/débito</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label>Contra reembolso</label>
                </div>
              </div>
              
              {/* Cupón */}
              <div className="flex gap-4 items-center mt-2">
                <input 
                  type="text" 
                  placeholder="Código de cupón (opcional)" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border h-12 border-[#7A6E6E] rounded px-4 py-2 flex-1 placeholder-[#A49E9E] text-m text-[#7A6E6E] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                />
                <button type="button" onClick={applyCoupon} className="bg-[#E07A5F] text-white px-4 py-2 rounded hover:bg-[#d46a50]">
                  Aplicar
                </button>
              </div>
              
              {/* Botón de compra */}
              <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full h-12 ${isProcessing ? 'bg-gray-400' : 'bg-[#E07A5F] hover:bg-transparent hover:text-[#E07A5F]'} border-2 border-[#E07A5F] text-white font-semibold rounded-md transition duration-300 font-[Alexandria] cursor-pointer`}
              >
                {isProcessing ? 'Procesando...' : 'Realizar pedido'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Checkout