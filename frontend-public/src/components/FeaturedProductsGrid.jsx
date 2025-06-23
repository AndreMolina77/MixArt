import React from 'react';
import { NavLink } from 'react-router-dom';
import Change from '../assets/change.png'
import DyingLight from '../assets/dyinglight.png'
import AbstractComposition from '../assets/ac.png'
import YoureMine from '../assets/ym.png'

const FeaturedProductsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative bg-black rounded-lg overflow-hidden h-[600px]">
        <img src={Change} alt="Lo que no puedes cambiar" className="w-[423px] h-[511px] object-cover mx-auto"/>
        <div className="absolute bottom-0 left-0 p-6 text-white font-[Alexandria]">
          <h3 className="text-2xl font-semibold mb-2">Lo que no puedes cambiar</h3>
          <p className="text-sm mb-4">Acepta "Lo que no puedes cambiar" porque no es fatalismo ni resignación.</p>
          <NavLink to="/" className="border-b border-white pb-1 hover:text-[#E07A5F] transition-colors">Compra ahora</NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative bg-black rounded-lg overflow-hidden h-[284px] flex">
          <div className="flex-1 p-6 flex flex-col justify-center text-white font-[Alexandria]">
            <h3 className="text-2xl font-semibold mb-2">Abstract composition</h3>
            <p className="text-sm mb-4">Deja que tu imaginación fluya.</p>
            <NavLink to="/" className="border-b border-white pb-1 hover:text-[#E07A5F] transition-colors w-fit">Comprar ahora</NavLink>
          </div>
          <div className="flex-none flex items-center">
            <img src={AbstractComposition} alt="Abstract composition" className="w-[291px] h-[284px] object-cover"/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-black rounded-lg overflow-hidden h-[270px] flex flex-col items-center">
            <div className="flex-1 flex items-center justify-center">
              <img src={DyingLight} alt="Dying Light" className="w-[190px] h-[190px] object-cover"/>
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-white font-[Alexandria]">
              <h3 className="text-xl font-semibold mb-1">Dying Light</h3>
              <p className="text-xs mb-2">Ningún sonido, ninguna palabra.</p>
              <NavLink to="/" className="border-b border-white pb-1 hover:text-[#E07A5F] transition-colors text-sm">Compra ahora</NavLink>
            </div>
          </div>
          <div className="relative bg-black rounded-lg overflow-hidden h-[270px] flex flex-col items-center">
            <div className="flex-1 flex items-center justify-center">
              <img src={YoureMine} alt="You're mine" className="w-[167px] h-[167px] object-cover"/>
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-white font-[Alexandria]">
              <h3 className="text-xl font-semibold mb-1">You're mine</h3>
              <p className="text-xs mb-2">Art pop expresionista</p>
              <NavLink to="/" className="border-b border-white pb-1 hover:text-[#E07A5F] transition-colors text-sm">Comprar ahora</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FeaturedProductsGrid