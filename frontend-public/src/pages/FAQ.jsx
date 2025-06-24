import React from 'react'
import Breadcrumbs from '../components/Handlers/BreadCrumbs'

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué tipos de materiales de arte venden?",
      answer: "Ofrecemos una amplia variedad incluyendo acrílicos, óleos, acuarelas, pinceles, lienzos, papeles especializados, lápices de grafito y de colores, marcadores profesionales y más.",
    },
    {
      question: "¿Los materiales son de calidad profesional o para principiantes?",
      answer: "Disponemos de productos para todos los niveles, desde kits básicos de inicio hasta materiales profesionales de alta gama.",
    },
    {
      question: "¿Venden materiales ecológicos o libres de crueldad animal?",
      answer: "Sí, tenemos una selección de productos sostenibles que incluyen pinturas veganas, pinceles sintéticos y papeles reciclados.",
    },
    {
      question: "¿Dónde se fabrican sus productos?",
      answer: "Trabajamos con reconocidas marcas nacionales e internacionales. El origen de cada producto se detalla en su descripción.",
    },
    {
      question: "¿Las obras de arte son originales o reproducciones?",
      answer: "Vendemos tanto piezas originales (únicas, firmadas por el artista) como reproducciones de alta calidad (ediciones limitadas o impresiones giclée).",
    },
    {
      question: "¿Puedo encargar una obra de arte personalizada?",
      answer: "Sí, algunos artistas asociados aceptan encargos. Contáctanos con tus requisitos para gestionar tu pedido.",
    },
    {
      question: "¿Cómo se verifica la autenticidad de una obra de arte?",
      answer: "Todas las piezas originales incluyen un certificado de autenticidad y detalles sobre el artista.",
    },
    {
      question: "¿Ofrecen envíos internacionales?",
      answer: "Sí, realizamos envíos a varios países. Los costos y los plazos de entrega varían según la ubicación.",
    },
    {
      question: "¿Cuánto tiempo tarda el envío nacional?",
      answer: "El tiempo de entrega promedio es de 3 a 7 días hábiles, dependiendo de la ubicación y el transportista.",
    },
    {
      question: "¿Qué métodos de envío ofrecen?",
      answer: "Trabajamos con servicios postales locales y transportistas privados (DHL, FedEx, etc.).",
    },
    {
      question: "¿Los materiales frágiles utilizan embalajes especiales?",
      answer: "Sí, utilizamos materiales de protección para evitar daños durante el transporte.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias y, en algunos países, pago contra reembolso.",
    },
    {
      question: "¿Puedo pagar a plazos?",
      answer: "Depende de tu banco y método de pago. Algunas tarjetas permiten cuotas sin intereses.",
    },
    {
      question: "¿Ofrecen facturas electrónicas??",
      answer: "Sí, recibirás una factura digital válida para las deducciones de impuestos (cuando corresponda).",
    },
    {
      question: "¿Aceptan devoluciones de productos dañados?",
      answer: "Sí, contáctenos dentro de las 48 horas posteriores a la recepción con fotografías del daño para reemplazo o reembolso.",
    },
    {
      question: "¿Puedo devolver una obra de arte si no me gusta?",
      answer: "Las obras originales solo se pueden devolver si están dañadas. Las reproducciones tienen un plazo de devolución de 14 días (se aplican condiciones).",
    },
    {
      question: "¿Los materiales de arte tienen garantía?",
      answer: "Reemplazamos productos defectuosos (por ejemplo, tubos de pintura secos) dentro de los 30 días posteriores a la compra.",
    },
    {
      question: "¿Cómo puedo vender mis obras de arte/materiales a través de su tienda?",
      answer: <>Envíanos un correo electrónico a <a href="mailto:mixart@gmail.com" className="text-[#4d6bfe] hover:text-[#3a56d4] transition-colors duration-200 font-medium">mixart@gmail.com</a> con muestras de su trabajo o catálogo para discutir la colaboración."</>,
    },
    {
      question: "¿Ofrecen descuentos para estudiantes o precios al por mayor?",
      answer: "Sí, ofrecemos descuentos para estudiantes (con identificación) y programas para mayoristas. Contáctanos para más detalles.",
    },
    {
      question: "¿Organizas talleres o eventos de arte?",
      answer: "Sí, Organizamos talleres para artistas y lanzamientos de productos. Suscríbete a nuestro boletín para recibir novedades.",
    }
  ]
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto p-6 font-[Alexandria] text-[#7A6E6E]">
        <div className="mb-8">
          <Breadcrumbs/>
        </div>
        <h1 className="text-4xl font-bold mb-4">Preguntas frecuentes</h1>
        <p className="text-customGray mb-8">
        ¿Tiene alguna pregunta que no esté resuelta aquí?
          {' '}<a href="mailto:20200135@ricaldone.edu.sv" className="text-[#4d6bfe] hover:text-[#3a56d4] transition-colors duration-200 font-medium">
          Contacte</a>{' '}con nuestro equipo de soporte por correo electrónico y le responderemos a la brevedad.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-customGray font-regular mb-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default FAQ