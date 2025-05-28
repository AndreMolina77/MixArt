import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressStepper from '../components/ProgressStepper.jsx'
import RoundedButton from '../components/RoundedButton.jsx'
import monogramHq from '../assets/monogram-hq.png'
import logo from '../assets/logo.png'
import onboardingSteps from '../data/OnBoardingData.js'

const FirstTimeUser = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const stepData = onboardingSteps[currentStep]
  const navigate = useNavigate()
  return (
  <div className="relative w-full h-screen bg-[#F4F1DE] overflow-hidden font-[Alexandria]">
    {/* DESKTOP */}
    <div className="hidden lg:flex items-center justify-center h-full relative">
      <img src={monogramHq} alt="Monogram" className="absolute top-0 left-0 w-16 h-16 object-contain"/>      
      {/* TOP LEFT: Small museum frame with rope barriers */}
      <div className="absolute top-36 left-3">
        <img src={stepData.image.dec1} alt="Main decorative art" className="w-24 sm:w-36 md:w-48 object-contain" />
      </div>      
      <div className="absolute bottom-16 left-12">
        <div className="relative">
          {/* Main large colorful art piece */}
          <img src={stepData.image.museum} alt="Museum frame" className="w-40 sm:w-56 md:w-72 object-contain" />
        </div>
      </div>
      {/* TOP RIGHT: Orange branch element - STUCK TO RIGHT EDGE */}
      <div className="absolute top-12 right-0">
        <img src={stepData.image.dec2} alt="Decorative branch" className="w-16 sm:w-20 md:w-28 object-contain" />
      </div>
      {/* Center content */}
      <div className="flex flex-col items-center text-center">
        {/* Logo grande */}
        <img src={logo} alt="MixArt Logo" className="w-48 sm:w-72 md:w-96 lg:w-[500px] h-auto mb-6 object-contain" />
        {/* Texto principal */}
        <h1 className="text-4xl font-black text-[#7A6E6E] mb-15 leading-tight">{stepData.title}</h1>
        {/* Bottom group*/}
        <div className="transform translate-x-80">
          {/* Descripcion */}
          <p className="text-2xl text-[#7A6E6E] mb-10 max-w-3xl max-h-1xl leading-relaxed">{stepData.description}</p>
          <div className="flex justify-between w-full px-2 ">
            {/* Volver */}
            {currentStep > 0 ? (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="text-[#7A6E6E] text-sm flex items-center space-x-1 hover:text-[#5c5252] transition">
                <span className="text-xl">&lt;</span>
                <span>Volver</span>
              </button>
            ) : <div />}
            {/* Saltar */}
            {currentStep < onboardingSteps.length - 1 && (
              <button onClick={() => setCurrentStep(onboardingSteps.length - 1)} className="text-[#7A6E6E] underline text-sm hover:text-[#5c5252] transition">
                Saltar
              </button>
            )}
          </div>
          {/* Boton */}
          <div className="mb-10">
            <RoundedButton Text={currentStep === onboardingSteps.length - 1 ? 'Finalizar' : 'Siguiente'} onClick={() => {
              if (currentStep === onboardingSteps.length - 1) {
                navigate('/registro')
              } else {
                setCurrentStep(currentStep + 1)
              }
            }}/>
          </div>
          {/* Progreso */}
          <ProgressStepper currentStep={currentStep + 1}/>
        </div>
      </div>
    </div>
    {/* MOBILE */}
    <div className="flex lg:hidden flex-col items-center justify-center min-h-screen px-6 py-8 space-y-6 text-center relative">
      <img src={monogramHq} alt="Monogram" className="absolute top-0 left-0 w-6 h-6 object-contain"/>
      {/* Logo */}
      <img src={logo} alt="MixArt Logo" className="w-64 h-auto object-contain"/> 
      {/* Texto principal*/}
      <h1 className="text-2xl font-black text-[#7A6E6E] leading-tight">{stepData.title}</h1>
      {/* Descripcion */}
      <p className="text-base text-[#7A6E6E] max-w-sm leading-relaxed">{stepData.description}</p>
      <div className="flex justify-between w-full px-2 ">
        {/* Volver */}
        {currentStep > 0 ? (
          <button onClick={() => setCurrentStep(currentStep - 1)} className="text-[#7A6E6E] text-sm flex items-center space-x-1 hover:text-[#5c5252] transition">
            <span className="text-xl">&lt;</span>
            <span>Volver</span>
          </button>
        ) : <div />}
        {/* Saltar */}
        {currentStep < onboardingSteps.length - 1 && (
          <button onClick={() => setCurrentStep(onboardingSteps.length - 1)} className="text-[#7A6E6E] underline text-sm hover:text-[#5c5252] transition">
            Saltar
          </button>
        )}
      </div> 
      {/* Elementos decorativos */}
      <div className="flex justify-center space-x-6 my-4">
        <img src={stepData.image.museum} alt="Museum" className="w-12 h-10 object-contain" />
        <img src={stepData.image.dec1} alt="Décor" className="w-12 h-12 object-contain" />
        <img src={stepData.image.dec2} alt="Branch" className="w-12 h-16 object-contain" />
      </div>    
      {/* Boton */}
      <div className="my-6">
        <RoundedButton Text={currentStep === onboardingSteps.length - 1 ? 'Finalizar' : 'Siguiente'} onClick={() => {
          if (currentStep === onboardingSteps.length - 1) {
            navigate('/login')
          } else {
            setCurrentStep(currentStep + 1)
          }
        }}/>
      </div>
      {/* Progreso */}
      <ProgressStepper currentStep={currentStep + 1}/>
    </div>
  </div>
  )
}
export default FirstTimeUser