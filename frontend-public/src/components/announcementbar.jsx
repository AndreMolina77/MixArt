import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true)

  if (!visible) return null
  return (
    <div className="w-full bg-[#DE7A58] text-white font-[Alexandria] px-6 py-2 relative">
      <p className="text-center text-sm md:text-[15px] leading-snug">Oferta de verano para todos los Implementos y entrega express gratuita: ¡50 % de descuento!{' '}
        <Link to="/catalogue" className="underline font-semibold">CompraAhora</Link></p>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-lg" onClick={() => setVisible(false)} aria-label="Cerrar anuncio" >
        <IoClose />
      </button>
    </div>
  )
}
export default AnnouncementBar