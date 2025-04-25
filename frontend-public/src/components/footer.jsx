import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { FaPaperPlane } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="bg-[#468FAF] text-white px-6 py-12 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          <div>
            <h1 className="text-4xl font-normal font-['Love_Ya_Like_A_Sister'] mb-4">MixArt</h1>
            <h2 className="text-xl font-['Alexandria'] font-medium mb-2">Suscríbete</h2>
            <p className="text-sm font-['Alexandria'] font-regular leading-snug mb-4">
              Obtén un 10% de descuento en tu primer pedido
            </p>
            <div className="flex items-center border border-white rounded-md overflow-hidden">
              <input type="email" placeholder="Ingresa tu correo" className="bg-transparent placeholder-white/40 px-4 py-2 flex-grow focus:outline-none text-white w-full min-w-0 font-['Alexandria'] placeholder:font-['Alexandria']"/>
              <button className="h-full px-4 flex items-center justify-center flex-shrink-0 group cursor-pointer">
                <FaPaperPlane className="text-xl leading-none group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-['Alexandria'] font-medium mb-4">Ayuda</h2>
            <p className="text-sm font-['Alexandria'] font-regular mb-1">
              2789 Junior Avenue,<br />Atlanta, Georgia,<br />Estados Unidos.
            </p>
            <p className="text-sm font-['Alexandria'] font-regular mt-2">exclusivo@mixart.com</p>
            <p className="text-sm font-['Alexandria'] font-regular">+503 8888-9999</p>
          </div>
          <div>
            <h2 className="text-xl font-['Alexandria'] font-medium mb-4">Cuenta</h2>
            <ul className="space-y-2 text-sm font-['Alexandria'] font-regular">
              <li><NavLink to="/mi-cuenta" className="hover:text-[#d1d1d1] transition-colors">Mi cuenta</NavLink></li>
              <li><NavLink to="/login" className="hover:text-[#d1d1d1] transition-colors">Iniciar sesión</NavLink></li>
              <li><NavLink to="/registro" className="hover:text-[#d1d1d1] transition-colors">Registrarse</NavLink></li>
              <li><NavLink to="/carrito" className="hover:text-[#d1d1d1] transition-colors">Carrito</NavLink></li>
              <li><NavLink to="/lista-deseos" className="hover:text-[#d1d1d1] transition-colors">Lista de deseos</NavLink></li>
              <li><NavLink to="/tienda" className="hover:text-[#d1d1d1] transition-colors">Tienda</NavLink></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-['Alexandria'] font-medium mb-4">Enlaces rápidos</h2>
            <ul className="space-y-2 text-sm font-['Alexandria'] font-regular">
              <li><NavLink to="/politica-de-privacidad" className="hover:text-[#d1d1d1] transition-colors">Política de privacidad</NavLink></li>
              <li><NavLink to="/terminos-y-condiciones" className="hover:text-[#d1d1d1] transition-colors">Términos y condiciones</NavLink></li>
              <li><NavLink to="/faq" className="hover:text-[#d1d1d1] transition-colors">Preguntas frecuentes</NavLink></li>
              <li><NavLink to="/contactanos" className="hover:text-[#d1d1d1] transition-colors">Contáctanos</NavLink></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-['Alexandria'] font-medium mb-4">Descarga la app</h2>
            <p className="text-sm font-['Alexandria'] font-medium mb-4">
              Ahorre $3 con la aplicación solo para nuevos usuarios
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://play.google.com" alt="QR Code" className="w-16 h-16"/>
              <div className="flex flex-col space-y-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="w-32"/>
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="w-32"/>
              </div>
            </div>
            <div className="flex space-x-4 text-xl mt-4">
              <a href="#" className="hover:text-[#d1d1d1] transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com" className="hover:text-[#d1d1d1] transition-colors">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-[#d1d1d1] transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-[#d1d1d1] transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white mt-12 pt-6 text-center text-sm font-['Alexandria'] font-regular">
          © Copyright MixArt 2025. Todos los derechos reservados
        </div>
      </footer>
    </>
  )
}
export default Footer