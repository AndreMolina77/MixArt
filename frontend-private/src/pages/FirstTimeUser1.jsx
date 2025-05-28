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
    <div className="hidden lg:flex items-center justify-center h-full relative">
      {/* Monogram in top-left corner */}
      <img 
        src={monogramHq} 
        alt="Monogram" 
        className="absolute top-0 left-0 w-16 h-16 object-contain"
      />
      
      {/* TOP LEFT: Small museum frame with rope barriers */}
      <div className="absolute top-46 left-3">
        <img 
          src={dec1} 
          alt="Main decorative art" 
          className="w-49 h-35 object-contain"
        />
      </div>
      
      {/* BOTTOM LEFT: Large colorful art piece with scattered decoratives */}
      <div className="absolute bottom-16 left-12">
        <div className="relative">
          {/* Main large colorful art piece */}
          <img 
            src={museum1} 
            alt="Museum frame with barriers" 
            className="w-84 h-65 object-contain"
          />
        </div>
      </div>
      {/* TOP RIGHT: Orange branch element - STUCK TO RIGHT EDGE */}
      <div className="absolute top-12 right-0">
        <img 
          src={dec2} 
          alt="Decorative branch" 
          className="w-24 h-48 object-contain"
        />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        {/* Logo */}
        <img 
          src={logo} 
          alt="MixArt Logo" 
          className="w-80 h-auto mb-6 -mt-32 object-contain" 
        /> 
        {/* Welcome text */}
        <h1 className="text-3xl font-black text-[#7A6E6E] mb-16 leading-tight">
          👋 ¡Bienvenido a MixArt!
        </h1>
        {/* Bottom group - shifted right as a unit */}
        <div className="transform translate-x-60">
          {/* Description */}
          <p className="text-base text-[#7A6E6E] mb-10 max-w-md leading-relaxed">
            Esta es tu herramienta para gestionar fácilmente nuestra 
            tienda de arte en línea. Aquí podrás administrar productos, 
            pedidos y clientes de manera eficiente.
          </p>
          {/* Button */}
          <div className="mb-8">
            <RoundedButton Text="Comenzar" />
          </div>
          {/* Progress stepper */}
          <ProgressStepper currentStep={1} />
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="flex lg:hidden flex-col items-center justify-center min-h-screen px-6 py-8 space-y-6 text-center relative">
      {/* Monogram in top-left for mobile */}
      <img 
        src={monogramHq} 
        alt="Monogram" 
        className="absolute top-0 left-0 w-6 h-6 object-contain"
      />
      
      {/* Logo */}
      <img 
        src={logo} 
        alt="MixArt Logo" 
        className="w-64 h-auto object-contain" 
      />
      
      {/* Welcome text */}
      <h1 className="text-2xl font-black text-[#7A6E6E] leading-tight">
        👋 ¡Bienvenido a MixArt!
      </h1>
      
      {/* Description */}
      <p className="text-base text-[#7A6E6E] max-w-sm leading-relaxed">
        Esta es tu herramienta para gestionar fácilmente nuestra tienda de arte
        en línea. Aquí podrás administrar productos, pedidos y clientes de
        manera eficiente.
      </p>
      
      {/* Small decorative elements */}
      <div className="flex justify-center space-x-6 my-4">
        <img src={museum1} alt="Museum" className="w-12 h-10 object-contain" />
        <img src={dec1} alt="Décor" className="w-12 h-12 object-contain" />
        <img src={dec2} alt="Branch" className="w-12 h-16 object-contain" />
      </div>
      
      {/* Button */}
      <div className="my-6">
        <RoundedButton Text="Comenzar" />
      </div>
      
      {/* Progress stepper */}
      <ProgressStepper currentStep={1} />
    </div>
  </div>
);

export default FirstTimeUser;