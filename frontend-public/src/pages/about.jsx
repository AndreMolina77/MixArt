import React, { useState } from 'react'
import { FaStore, FaDollarSign, FaUsers, FaMoneyBillWave, FaTruck, FaHeadset, FaShieldAlt, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import aboutImage from '../assets/about.png'
import team1 from '../assets/team1.png'
import team2 from '../assets/team2.png'
import team3 from '../assets/team3.png'

const About = () => {
  const [selectedFrame, setSelectedFrame] = useState(1)
  const frames = [
    { id: 1, icon: FaStore, value: '3 mil', label: 'Vendedores activos en nuestro sitio' },
    { id: 2, icon: FaDollarSign, value: '33 mill.', label: 'Venta mensual de productos' },
    { id: 3, icon: FaUsers, value: '45.5 mil', label: 'Clientes activos en nuestro sitio' },
    { id: 4, icon: FaMoneyBillWave, value: '250 mill.', label: 'Venta bruta anual en nuestro sitio' }
  ]
  const teamMembers = [
    { id: 1, name: 'Ethan Rodriguez', role: 'Fundador y Presidente', image: team1 }, 
    { id: 2, name: 'Atticus Blackwood', role: 'Director general', image: team2 },
    { id: 3, name: 'Sophia Chen', role: 'Diseñador de producto', image: team3 }
  ]
  const benefits = [
    { id: 1, icon: FaTruck, title: 'ENTREGA GRATUITA Y RÁPIDA', description: 'Entrega gratuita para todos los pedidos superiores a $140' },
    { id: 2, icon: FaHeadset, title: 'SERVICIO AL CLIENTE 24/7', description: 'Atención al cliente amigable 24 horas al día, 7 días a la semana' },
    { id: 3, icon: FaShieldAlt, title: 'GARANTÍA DE DEVOLUCIÓN DE DINERO', description: 'Devolvemos tu dinero en 30 días' }, 
  ]
  return (
    <div className="flex flex-col items-center py-12 px-4 bg-[#F5F5F5]">
      {/* Main Content Section */}
      <div className="w-full max-w-7xl">
        {/* Nuestra Historia + Image Row */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-[54px] font-semibold font-[Alexandria] text-[#7A6E6E]">
                Nuestra historia
            </h1>
            <div className="space-y-4 font-[Alexandria] text-[#7A6E6E]">
                <p className="text-base md:text-[16px] leading-relaxed">
                Fundada en 2006 en San Salvador, MixArt comenzó como un pequeño emprendimiento familiar con una pasión compartida por democratizar el acceso al arte en Centroamérica. Lo que inició como una galería física especializada en artistas emergentes locales, pronto evolucionó hacia el comercio digital al reconocer el potencial transformador de internet para conectar creadores con amantes del arte en toda la región.
                </p>
                <p className="text-base md:text-[16px] leading-relaxed">
                En nuestros primeros cinco años, establecimos alianzas estratégicas con más de 200 talleres artesanales y 50 artistas independientes, desarrollando un modelo de negocio que priorizaba la equidad y la transparencia. Este enfoque nos permitió crecer orgánicamente, ganándonos la confianza tanto de creadores como de coleccionistas.
                </p>
                <p className="text-base md:text-[16px] leading-relaxed">
                El año 2012 marcó un hito importante al convertirnos en la primera plataforma de arte en implementar un sistema de verificación de autenticidad digital para obras en la región.
                </p>
                <p className="text-base md:text-[16px] leading-relaxed">
                Hoy, con más de 15 años de trayectoria, hemos facilitado la venta de más de 250,000 piezas originales, expandiendo nuestro catálogo para incluir desde arte tradicional hasta expresiones digitales contemporáneas. Nuestra comunidad incluye:
                </p>
                <ul className="list-disc pl-5 text-base md:text-[16px] space-y-2">
                <li>Una red de 10,500 artistas y artesanos verificados</li>
                <li>Más de 300 marcas asociadas especializadas en materiales artísticos</li>
                <li>Presencia física en 3 países centroamericanos</li>
                <li>Plataforma digital con alcance a toda Latinoamérica</li>
                </ul>
                <p className="text-base md:text-[16px] leading-relaxed">
                Lo que nos distingue es nuestro compromiso con la educación artística. A través de nuestro programa "MixArt Educa", hemos desarrollado talleres gratuitos que han beneficiado a más de 15,000 estudiantes, cumpliendo con nuestra misión de nutrir la próxima generación de creadores.
                </p>
            </div>
          </div>
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img 
              src={aboutImage} 
              alt="Living room with artwork" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
        {/* Stats Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {frames.map((frame) => {
            const Icon = frame.icon;
            return (
              <div 
                key={frame.id} 
                onClick={() => setSelectedFrame(frame.id)}
                className={`flex flex-col items-center p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                  selectedFrame === frame.id 
                    ? 'bg-[#E07A5F]' 
                    : 'bg-transparent border border-[#7A6E6E]'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
                  selectedFrame === frame.id ? 'bg-white' : 'bg-[#7A6E6E]'
                }`}>
                  <Icon className={`text-xl ${selectedFrame === frame.id ? 'text-[#7A6E6E]' : 'text-white'}`}/>
                </div>
                <h3 className={`text-2xl md:text-[32px] font-bold ${
                  selectedFrame === frame.id ? 'text-white' : 'text-[#7A6E6E]'
                }`}>
                  {frame.value}
                </h3>
                <p className={`text-center mt-2 ${
                  selectedFrame === frame.id ? 'text-white' : 'text-[#7A6E6E]'
                }`}>
                  {frame.label}
                </p>
              </div>
            );
          })}
        </div>
        {/* Team Members Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-[Alexandria]">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <h3 className="text-[#7A6E6E] text-2xl font-semibold mt-4">
                  {member.name}
                </h3>
                <p className="text-[#7A6E6E] text-base mt-1">
                  {member.role}
                </p>
                <div className="flex space-x-4 mt-2">
                  <FaTwitter className="text-[#7A6E6E] hover:text-[#E07A5F] cursor-pointer"/>
                  <FaInstagram className="text-[#7A6E6E] hover:text-[#E07A5F] cursor-pointer"/>
                  <FaLinkedin className="text-[#7A6E6E] hover:text-[#E07A5F] cursor-pointer"/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.id} className="flex flex-col items-center text-center p-6 font-[Alexandria] text-[#7A6E6E]">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#D3D3D3] mb-4">
                  <Icon className="text-2xl"/>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-base font-regular">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default About