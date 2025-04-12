import React, { useState, useEffect } from 'react'
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'


const Navbar = () => {
    const location = useLocation()
    const [active, setActive] = useState('Inicio')
    
    useEffect(() => {
      const pathToPage = {
        '/': 'Inicio',
        '/contacto': 'Contáctanos',
        '/sobre-nosotros': 'Sobre nosotros',
        '/login': 'Iniciar sesión'
      }
      setActive(pathToPage[location.pathname] || 'Inicio')
    }, [location.pathname])
  
    const navItems = ['Inicio', 'Contáctanos', 'Sobre nosotros', 'Iniciar sesión/Registrarse']
    return (
        <nav className="w-full bg-[#F4F1DE] px-6 py-4 flex items-center justify-between font-[Alexandria] text-[#7A6E6E]">
        <div className="text-2xl font-normal" style={{ fontFamily: '"Love Ya Like A Sister"' }}>MixArt</div>
        <div className="flex gap-8 items-center text-[16px]">
            {navItems.map((item) => (
            <button key={item} onClick={() => setActive(item)} className="relative pb-1">
                <span className={`transition duration-200 ${active === item ? 'font-semibold' : 'font-normal'}`}>
                {item}
                </span>
                {active === item && ( <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#7A6E6E] rounded-full" />)}
            </button>
            ))}
        </div>
        <div className="flex items-center gap-6">
            <div className="flex items-center bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-[6px]">
            <input
                type="text" placeholder="¿Qué estás buscando?" className="bg-transparent placeholder-opacity-40 outline-none text-sm text-[#7A6E6E] placeholder:text-[#7A6E6E]"
            />
            <FaSearch className="ml-2 text-[#7A6E6E]" />
            </div>
            <FaHeart className="text-xl text-[#7A6E6E] cursor-pointer" />
            <FaShoppingCart className="text-xl text-[#7A6E6E] cursor-pointer" />
            <FaUser className="text-xl text-[#7A6E6E] cursor-pointer" />
        </div>
        </nav>
    )
}
export default Navbar