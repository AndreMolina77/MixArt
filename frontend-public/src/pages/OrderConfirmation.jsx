import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Buttons/Button.jsx';
import Breadcrumbs from '../components/Handlers/BreadCrumbs.jsx';
import { FaCheckCircle, FaTruck, FaEnvelope } from 'react-icons/fa';

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener datos de la última orden del localStorage
    const lastOrderData = localStorage.getItem('lastOrder')
    
    if (lastOrderData) {
      const orderData = JSON.parse(lastOrderData)
      setOrderDetails({
        orderId: orderData.orderId,
        date: new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        total: `$${orderData.total.toFixed(2)}`,
        paymentMethod: orderData.paymentMethod === 'cash' ? 'Contra reembolso' : 'Tarjeta de crédito/débito',
        shippingMethod: orderData.total >= 140 ? "Envío gratis (3-5 días hábiles)" : "Envío estándar (3-5 días hábiles)",
        items: orderData.orderData.items.map(item => ({
          id: item.itemId,
          name: item.name || 'Producto',
          price: `$${item.subtotal.toFixed(2)}`,
          image: item.image || '/placeholder-image.jpg',
          quantity: item.quantity
        })),
        shippingAddress: {
          name: `${orderData.billingInfo.firstName}`,
          company: orderData.billingInfo.company || '',
          address: orderData.billingInfo.address,
          apartment: orderData.billingInfo.apartment || '',
          city: orderData.billingInfo.city,
          phone: orderData.billingInfo.phone,
          email: orderData.billingInfo.email
        }
      })
      // Limpiar datos de localStorage después de usar
      localStorage.removeItem('lastOrder')
    } else {
      // Si no hay datos, redirigir al home
      navigate('/')
    }
    
    setLoading(false)
  }, [navigate])

  if (loading) {
    return (
      <div className="bg-[#F4F1DE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E07A5F] mx-auto mb-4"></div>
          <p className="text-[#7A6E6E] font-[Alexandria]">Cargando confirmación...</p>
        </div>
      </div>
    )
  }
  if (!orderDetails) {
    return (
      <div className="bg-[#F4F1DE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#7A6E6E] mb-4">No se encontró información de la orden</h2>
          <Button Text="Volver al inicio" to="/" />
        </div>
      </div>
    )
  }
  return (
    <div className="bg-[#F4F1DE] min-h-screen px-4 sm:px-10 py-8 font-[Alexandria]">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
        
        {/* Encabezado de confirmación */}
        <div className="text-center py-10">
          <FaCheckCircle className="text-[#81B29A] text-6xl mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl text-[#7A6E6E] font-semibold mb-4">
            ¡Pedido confirmado!
          </h1>
          <p className="text-[#7A6E6E] max-w-xl mx-auto">
            Gracias por tu compra en MixArt. Tu pedido <span className="font-semibold">#{orderDetails.orderId}</span> ha sido confirmado y está siendo procesado.
          </p>
          <p className="text-[#7A6E6E] mt-4">
            Hemos enviado un correo electrónico con los detalles de tu pedido a <span className="font-semibold">{orderDetails.shippingAddress.email}</span>.
          </p>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#7A6E6E] mb-4 pb-2 border-b border-[#E8E3CC]">
                Detalles del pedido
              </h3>
              <div className="grid grid-cols-2 gap-4 text-[#7A6E6E]">
                <div>
                  <p className="text-sm opacity-70">Número de pedido</p>
                  <p className="font-medium">{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Fecha</p>
                  <p className="font-medium">{orderDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Total</p>
                  <p className="font-medium">{orderDetails.total}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Método de pago</p>
                  <p className="font-medium">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#7A6E6E] mb-4 pb-2 border-b border-[#E8E3CC]">
                Información de envío
              </h3>
              <div className="text-[#7A6E6E]">
                <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.company}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>{orderDetails.shippingAddress.apartment}</p>
                <p>{orderDetails.shippingAddress.city}</p>
                <p className="mt-2">{orderDetails.shippingAddress.phone}</p>
                <p>{orderDetails.shippingAddress.email}</p>
                <div className="flex items-center mt-4 gap-2 text-[#81B29A]">
                  <FaTruck />
                  <span className="font-medium">{orderDetails.shippingMethod}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Productos */}
          <h3 className="text-lg font-semibold text-[#7A6E6E] mt-8 mb-4 pb-2 border-b border-[#E8E3CC]">
            Productos
          </h3>
          <div className="space-y-4">
            {orderDetails.items.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-[#F4F1DE]">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                  <div>
                    <p className="text-[#7A6E6E] font-medium">{item.name}</p>
                    <p className="text-sm text-[#7A6E6E]/80">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-[#7A6E6E] font-medium">{item.price}</p>
              </div>
            ))}
          </div>
          
          {/* Total */}
          <div className="flex justify-between mt-6 pt-6 border-t border-[#E8E3CC]">
            <span className="text-[#7A6E6E] font-semibold">Total</span>
            <span className="text-[#7A6E6E] font-semibold text-xl">{orderDetails.total}</span>
          </div>
        </div>

        {/* Siguientes pasos */}
        <div className="bg-[#FDF7E3] rounded-lg p-6 mb-10">
          <h3 className="text-lg font-semibold text-[#7A6E6E] mb-4">¿Qué esperar a continuación?</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#E07A5F] text-white rounded-full p-2">
                <FaEnvelope className="text-lg" />
              </div>
              <div>
                <h4 className="text-[#7A6E6E] font-medium mb-1">Confirmación por correo</h4>
                <p className="text-[#7A6E6E]/80 text-sm">
                  Recibirás un correo electrónico con los detalles de tu pedido y la confirmación de envío.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[#E07A5F] text-white rounded-full p-2">
                <FaTruck className="text-lg" />
              </div>
              <div>
                <h4 className="text-[#7A6E6E] font-medium mb-1">Actualizaciones de envío</h4>
                <p className="text-[#7A6E6E]/80 text-sm">
                  Te notificaremos cuando tu pedido haya sido enviado y te proporcionaremos un número de seguimiento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink to="/" className="flex-1 max-w-xs">
            <Button 
              Text="Seguir comprando" 
              customClass="bg-[#81B29A] border-[#81B29A] hover:text-[#81B29A] w-full"
            />
          </NavLink>
          <NavLink to="/mi-cuenta#compras" className="flex-1 max-w-xs">
            <Button 
              Text="Ver mis pedidos" 
              customClass="bg-[#F4F1DE] border border-[#7A6E6E] text-[#7A6E6E] hover:bg-[#E8E3CC] w-full"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;