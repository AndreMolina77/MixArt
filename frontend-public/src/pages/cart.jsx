import React from 'react'
import Breadcrumbs from '../components/breadcrumbs.jsx'
import Button from '../components/button.jsx'
import TransparentButton from '../components/transparentbutton.jsx'
import SmallLifeForms from '../assets/slfiii.png'
import InTheRain from '../assets/itrii.png'
import QuantityInput from '../components/quantityinput.jsx'

const Cart = () => {
  return (
    <div className="min-h-screen bg-[#FDF7E3] font-[Alexandria] text-[#7A6E6E] px-20 py-10">
        <Breadcrumbs />
        <div className="mt-10 grid grid-cols-4 font-semibold text-sm py-4 px-6 rounded-t-md bg-[#FDF7E3] border-b border-[#E8E3CC]">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
        </div>
        <div className="grid grid-cols-4 items-center py-6 px-6 bg-[#FDF7E3] shadow-inner">
            <div className="flex items-center gap-4">
                <button className="text-red-500 text-lg font-bold">✖</button>
                <img src={InTheRain} alt="In the rain II" className="w-12 h-12 object-cover" />
                <span>In the rain II</span>
            </div>
            <span>$5000</span>
            <QuantityInput/>
            <span>$5000</span>
        </div>
        <div className="grid grid-cols-4 items-center py-6 px-6 bg-[#FDF7E3] shadow-inner mt-2">
            <div className="flex items-center gap-4">
                <button className="text-red-500 text-lg font-bold">✖</button>
                <img src={SmallLifeForms} alt="Small life forms III" className="w-12 h-12 object-cover" />
                <span>Small life forms III</span>
            </div>
            <span>$370</span>
            <QuantityInput/>
            <span>$840</span>
        </div>
        <div className="flex justify-between gap-4 items-center mt-10 w-full">
            <div className="flex-1 max-w-[300px] flex-shrink-0">
                <TransparentButton Text="Volver a la tienda"/>
            </div>
            <div className="flex-1 max-w-[300px] flex-shrink-0">
                <TransparentButton Text="Actualizar carrito"/>
            </div>
        </div>
        <div className="flex gap-10 mt-10 justify-between items-start">
            <div className="flex gap-4 items-center">
                <input type="text" placeholder="Código de cupón (opcional)" className="border h-12 border-[#7A6E6E] rounded px-4 py-2 w-[450px] placeholder-[#A49E9E] text-m focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"/>
                <Button Text="Aplicar cupón"/>
            </div>
            <div className="w-[400px] border border-[#7A6E6E] rounded-md p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Total del carrito</h3>
                <div className="flex justify-between text-sm mb-4">
                    <span>Subtotal:</span>
                    <span>$5840</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span>Envío:</span>
                    <span>$20</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-4 mt-4">
                    <span>Total:</span>
                    <span>$5860</span>
                </div>
                <div className="mt-6">
                    <Button Text="Procede al pago" to="/carrito/checkout"/>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Cart