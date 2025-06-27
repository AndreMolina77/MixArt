import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaTimes, FaStar, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { useCart } from '../hooks/useCart.js'
import { useWishlist } from '../hooks/useWishlist.js'

const useClickOutside = (handler) => {
  const ref = useRef(null)

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [handler])
  return ref
}
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const dropdownRef = useClickOutside(() => setActiveDropdown(null))
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { getCartItemsCount } = useCart()
  const { wishlistItems } = useWishlist()
  const cartCount = getCartItemsCount()
  const wishlistCount = wishlistItems.length

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Contáctanos', path: '/contactanos' },
    { label: 'Sobre nosotros', path: '/acerca-de' },
    { label: 'Iniciar sesión', path: '/login' }
  ]
  const userMenu = [
    { icon: <FaUser/>, label: 'Administrar cuenta', path: '/mi-cuenta#perfil' },
    { icon: <FaShoppingCart/>, label: 'Mis pedidos', path: '/mi-cuenta#compras' },
    { icon: <FaTimes/>, label: 'Cancelaciones', path: '/mi-cuenta#cancelaciones' },
    { icon: <FaStar/>, label: 'Reseñas', path: '/mi-cuenta#reseñas' },
    { icon: <FaSignOutAlt/>, label: 'Cerrar sesión', path: '/logout' }
  ]
  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }
  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };
  return (
    <nav className="w-full bg-[#F4F1DE] border-b border-[#7A6E6E]/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-['Love_Ya_Like_A_Sister'] text-[#E07A5F]">MixArt</div>
        <div className="md:hidden">
          <FaBars className="text-2xl text-[#7A6E6E] cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>
        <div className="hidden md:flex gap-8 items-center font-[Alexandria]">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `relative pb-1 text-[#7A6E6E] ${isActive ? 'font-semibold' : 'font-normal'} hover:text-[#E07A5F] transition-colors`}>
              {({ isActive }) => (
                <>
                  {item.label} {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E07A5F]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-6">
          <form onSubmit={handleSearch} className="flex items-center bg-[#EBFEF5] border border-[#81B29A] rounded-lg px-3 py-1.5">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="¿Qué estás buscando?" className="bg-transparent outline-none text-sm text-[#7A6E6E] font-[Alexandria] w-50 placeholder:text-[#7A6E6E]/70"/>
            <button type="submit">
              <FaSearch className="ml-2 text-[#7A6E6E]/80 hover:text-[#E07A5F] cursor-pointer" />
            </button>
          </form>
          <div className="flex gap-4 text-[#7A6E6E]" ref={dropdownRef}>
            <div className="relative">
              <FaHeart className="text-xl hover:text-[#E07A5F] cursor-pointer" onClick={() => toggleDropdown('wishlist')}/>
              {activeDropdown === 'wishlist' && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#F4F1DE] shadow-xl rounded-lg py-2 z-50 font-[Alexandria]">
                  <NavLink  to="/lista-deseos" className="flex items-center px-4 py-2 hover:bg-[#CEC79D] cursor-pointer" onClick={() => setActiveDropdown(null)}>
                    <FaHeart className="mr-2 text-[#E07A5F]"/>
                    <span className="text-sm">Lista de deseos ({wishlistCount})</span>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="relative">
              <FaShoppingCart className="text-xl hover:text-[#E07A5F] cursor-pointer" onClick={() => toggleDropdown('cart')}/>
              {activeDropdown === 'cart' && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#F4F1DE] shadow-xl rounded-lg py-2 z-50 font-[Alexandria]">
                  <NavLink to="/carrito" className="flex items-center px-4 py-2 hover:bg-[#CEC79D] cursor-pointer" onClick={() => setActiveDropdown(null)}>
                    <FaShoppingCart className="mr-2 text-[#E07A5F]"/>
                    <span className="text-sm">Carrito ({cartCount})</span>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="relative">
              <FaUser className="text-xl hover:text-[#E07A5F] cursor-pointer" onClick={() => toggleDropdown('user')}/>
              {activeDropdown === 'user' && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#F4F1DE] shadow-xl rounded-lg py-2 z-50 font-[Alexandria]">
                  {userMenu.map((item, index) => (
                    <NavLink key={index} to={item.path} className="flex items-center px-4 py-2 hover:bg-[#CEC79D] cursor-pointer" onClick={() => setActiveDropdown(null)}>
                      <span className="mr-2 text-[#E07A5F]">{item.icon}</span>
                      <span className="text-[#7A6E6E] text-sm">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 font-[Alexandria] text-[#7A6E6E]">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `block px-4 py-2 rounded-md ${isActive ? 'bg-[#CEC79D]' : 'hover:bg-[#F4EAD5]'}`} onClick={() => setIsMobileMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <div className="flex justify-around items-center pt-4 border-t border-[#7A6E6E]/30" ref={dropdownRef}>
            <div className="relative flex items-center justify-center">
              <FaHeart className="text-xl hover:text-[#E07A5F] cursor-pointer" onClick={() => toggleDropdown('wishlist')}/>
              {activeDropdown === 'wishlist' && (
                <div className="absolute left-0 mt-2 w-48 bg-[#F4F1DE] shadow-xl rounded-lg py-2 z-50 font-[Alexandria]">
                  <NavLink to="/lista-deseos" className="flex items-center px-4 py-2 hover:bg-[#CEC79D] cursor-pointer" onClick={() => setActiveDropdown(null)}>
                    <FaHeart className="mr-2 text-[#E07A5F]"/>
                    <span className="text-sm">Lista de deseos ({wishlistCount})</span>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <FaShoppingCart className="text-xl hover:text-[#E07A5F] cursor-pointer" onClick={() => toggleDropdown('cart')}/>
              {activeDropdown === 'cart' && (
                <div className="absolute left-0 mt-2 w-48 bg-[#F4F1DE] shadow-xl rounded-lg py-2 z-50 font-[Alexandria]">
                  <NavLink to="/carrito" className="flex items-center px-4 py-2 hover:bg-[#CEC79D] cursor-pointer" onClick={() => setActiveDropdown(null)}>
                    <FaShoppingCart className="mr-2 text-[#E07A5F]"/>
                    <span className="text-sm">Carrito ({cartCount})</span>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="relative flex items-center justify-center">
              <FaUser className="text-xl hover:text-[#E07A5F] cursor-pointer" onClick={() => toggleDropdown('user')}/>
              {activeDropdown === 'user' && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F4F1DE] shadow-xl rounded-lg py-2 z-50 font-[Alexandria]">
                  {userMenu.map((item, index) => (
                    <NavLink key={index} to={item.path} className="flex items-center px-4 py-2 hover:bg-[#CEC79D] cursor-pointer" onClick={() => setActiveDropdown(null)}>
                      <span className="mr-2 text-[#E07A5F]">{item.icon}</span>
                      <span className="text-[#7A6E6E] text-sm">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center min-w-[32px]">
              <div className="relative w-full max-w-[280px] transition-all duration-300 ease-in-out">
                {isSearchOpen ? (
                  <div className="flex items-center bg-[#EBFEF5] border border-[#81B29A] rounded-lg px-3 py-1.5 w-full">
                    <input type="text" placeholder="¿Qué estás buscando?" className="bg-transparent outline-none text-sm text-[#7A6E6E] font-[Alexandria] w-full placeholder:text-[#7A6E6E]/70" autoFocus/>
                    <FaTimes className="ml-2 text-[#7A6E6E]/80 cursor-pointer" onClick={() => setIsSearchOpen(false)}/>
                  </div>
                ) : (
                  <FaSearch className="text-xl text-[#7A6E6E] cursor-pointer" onClick={() => setIsSearchOpen(true)}/>
                )}
              </div>
            </div>
          </div>
        </div>
      )}   
    </nav>
  )
}
export default Navbar