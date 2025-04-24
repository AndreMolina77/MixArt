import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)
  const isHome = location.pathname === '/'

  return (
    <nav className="font-[Alexandria] text-[#7A6E6E] mb-6 md:mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-2 flex-wrap">
          <Link to="/" className={`text-sm md:text-base breadcrumb-transition ${isHome ? 'text-[#E07A5F] font-semibold' : 'opacity-75 hover:opacity-100 hover:text-[#E07A5F]'}`}>Inicio</Link>
          {pathnames.length > 2 && (
            <>
              <span className="sm:hidden flex items-center">
                <span className="mx-1 text-[#7A6E6E] opacity-50">/</span>
                <span className="text-sm">...</span>
              </span>
              <div className="sm:hidden flex items-center">
                <span className="mx-1 text-[#7A6E6E] opacity-50">/</span>
                <span className="text-sm md:text-base text-[#E07A5F] font-semibold">{formatearNombre(pathnames[pathnames.length - 1])}</span>
              </div>
            </>
          )}
          <div className="hidden sm:flex items-center">
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
              const isLast = index === pathnames.length - 1
              const isMiddle = index > 0 && index < pathnames.length - 1

              return (
                <div key={index} className={`flex items-center ${isMiddle ? 'hidden md:flex' : ''}`}>
                  <span className="mx-1 text-[#7A6E6E] opacity-50">/</span>
                  {isLast ? (
                    <span className="text-sm md:text-base text-[#E07A5F] font-semibold">{formatearNombre(name)}</span>
                  ) : (
                    <Link to={routeTo} className="text-sm md:text-base text-[#7A6E6E] opacity-75 hover:opacity-100 hover:text-[#E07A5F] breadcrumb-transition">
                      {formatearNombre(name)}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
const formatearNombre = (str) => {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
export default Breadcrumbs