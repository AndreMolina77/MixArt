import React from 'react';
import ProgressStepper from '../components/ProgressStepper';
import RoundedButton from '../components/RoundedButton';
import monogramHq from '../assets/monogram-hq.png';
import logo from '../assets/logo.png';
import dec1 from '../assets/dec1.png';
import museum1 from '../assets/museum-1.png';
import dec2 from '../assets/dec2.png';

const FirstTimeUser = () => (
  <div className="relative w-full h-screen bg-[#F4F1DE] overflow-hidden font-[Alexandria]">
    {/* DESKTOP */}
    <div className="hidden lg:flex items-center justify-between h-full px-24 relative">
      {/* Arte izquierda */}
      <div className="space-y-8">
        <img src={dec1} alt="Decorative art" className="w-64 h-auto object-contain"/>
        <img src={museum1} alt="Museum graphic" className="w-64 h-auto object-contain"/>
      </div>
      {/* Center Stack */}
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="MixArt Logo" className="mb-4" />
        <h1 className="text-[32px] font-black text-[#7A6E6E] mb-6 leading-tight">
          👋 ¡Bienvenido a MixArt!
        </h1>
        <p className="text-[16px] text-[#7A6E6E] mb-12 max-w-[640px] leading-relaxed">
          Esta es tu herramienta para gestionar fácilmente nuestra tienda de arte
          en línea. Aquí podrás administrar productos, pedidos y clientes de
          manera eficiente.
        </p>
        {/* Botón */}
        <RoundedButton Text="Comenzar" />
        <div className="mt-8">
          {/* Progreso */}
          <ProgressStepper currentStep={1} />
        </div>
      </div>
      {/* Decoraciones */}
      <img src={dec2} alt="Decorative element" className="absolute top-28 right-24 w-48 object-contain"/>
      <img src={monogramHq} alt="Monogram" className="absolute top-0 left-0 w-16 object-contain"/>
    </div>
    {/* MOBILE */}
    <div className="flex lg:hidden flex-col items-center justify-center min-h-screen px-6 py-10 space-y-8 text-center">
      <img src={logo} alt="MixArt Logo" className="max-w-[200px]" />
      <h1 className="text-[32px] font-black text-[#7A6E6E] mb-6 leading-tight">
        👋 ¡Bienvenido a MixArt!
      </h1>
      <p className="text-[16px] text-[#7A6E6E] mb-12 max-w-[640px] leading-relaxed">
        Esta es tu herramienta para gestionar fácilmente nuestra tienda de arte
        en línea. Aquí podrás administrar productos, pedidos y clientes de
        manera eficiente.
      </p>
      <div className="flex space-x-4">
        <img src={dec1} alt="Décor" className="w-20 h-20 object-contain" />
        <img src={dec2} alt="Décor" className="w-20 h-20 object-contain" />
      </div>
      {/* Botón */}
      <RoundedButton Text="Comenzar" />
      <div className="mt-6">
        {/* Progreso */}
        <ProgressStepper currentStep={1} />
      </div>
    </div>
  </div>
)
export default FirstTimeUser