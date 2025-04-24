import React from 'react'
import Button from '../components/button'
import Bkash from '../assets/bkash.png'
import TextInput from '../components/input.jsx'
import Breadcrumbs from '../components/breadcrumbs.jsx'
import Visa from '../assets/visa.png'
import MasterCard from '../assets/mastercard.png'
import Klarna from '../assets/klarna.png'
import InTheRain from '../assets/itrii.png'
import SmallLifeForms from '../assets/slfiii.png'
import '../css/checkout.css'

const Checkout = () => {
    return (
        <div className="bg-[#FFFBEF] min-h-screen px-4 sm:px-10 py-8 font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs/>
                <h2 className="text-2xl sm:text-3xl text-[#7A6E6E] font-semibold mb-10">Detalles de facturación</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-4">
                        <TextInput text="Primer nombre*" />
                        <TextInput text="Nombre de la empresa" />
                        <TextInput text="Dirección*" />
                        <TextInput text="Apartamento, piso, etc. (opcional)" />
                        <TextInput text="Ciudad/pueblo*" />
                        <TextInput text="Phone Number*" />
                        <TextInput text="Email Address*" />
                        <label className="flex items-start gap-2 mt-4 text-[#7A6E6E] text-sm cursor-pointer">
                            <div className="relative flex items-center h-5">
                                <input  type="checkbox" className="absolute opacity-0 h-4 w-4 cursor-pointer"/>
                                <div className="w-4 h-4 border border-[#E07A5F] rounded-sm flex items-center justify-center">
                                    <svg className="hidden checkmark" width="12" height="9" viewBox="0 0 12 9" fill="none">
                                        <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <span>Guarde esta información para realizar un pago más rápido la próxima vez</span>
                        </label>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3 border-b border-[#ccc] pb-4">
                            <div className="flex items-center justify-between text-[#7A6E6E]">
                                <div className="flex items-center gap-3">
                                    <img src={InTheRain} alt="In the rain II" className="w-10 h-10 object-cover rounded-sm" />
                                    <span>In the rain II</span>
                                </div>
                                <span>$5000</span>
                            </div>
                            <div className="flex items-center justify-between text-[#7A6E6E]">
                                <div className="flex items-center gap-3">
                                    <img src={SmallLifeForms} alt="Small life forms III" className="w-10 h-10 object-cover rounded-sm" />
                                    <span>Small life forms III</span>
                                </div>
                                <span>$370</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-[#7A6E6E]">
                            <span>Subtotal:</span>
                            <span>$1750</span>
                        </div>
                        <div className="flex justify-between text-[#7A6E6E]">
                            <span>Envío:</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between text-[#7A6E6E] font-semibold">
                            <span>Total:</span>
                            <span>$1750</span>
                        </div>
                        <div className="flex flex-col gap-2 mt-4 text-[#7A6E6E]">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-[#7A6E6E]">
                                <input type="radio" name="payment"/>Banco</label>
                                <div className="flex gap-2">
                                    <img src={Bkash} alt="Bkash" className="h-5" />
                                    <img src={Visa} alt="Visa" className="h-5" />
                                    <img src={MasterCard} alt="MasterCard" className="h-5" />
                                    <img src={Klarna} alt="Klarna" className="h-5" />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 mt-2 text-[#7A6E6E]">
                                <input type="radio" name="payment" defaultChecked/>
                                Contra reembolso
                            </label>
                        </div>
                        <div className="flex gap-4 items-center mt-2">
                            <input type="text" placeholder="Código de cupón (opcional)" className="border h-12 border-[#7A6E6E] rounded px-4 py-2 w-[450px] placeholder-[#A49E9E] text-m text-[#7A6E6E] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"/>
                            <Button Text="Aplicar cupón"/>
                        </div>
                        <Button Text="Realizar pedido" to="/finalizar"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout