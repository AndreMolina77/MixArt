import dec1 from '../assets/dec1.png'
import museum1 from '../assets/museum-1.png'
import museum2 from '../assets/museum-2.png'
import data from '../assets/data.png'
import onlineShopping from '../assets/online-shopping.png'
import dec2 from '../assets/dec2.png'

const onboardingSteps = [
  {
    step: 1,
    title: "👋 ¡Bienvenido a MixArt!",
    description: `Esta es tu herramienta para gestionar fácilmente nuestra 
      tienda de arte en línea. Aquí podrás administrar productos, 
      pedidos y clientes de manera eficiente.`,
    button: "Comenzar",
    image: {
      museum: museum1,
      dec1: dec1,
      dec2: dec2
    }
  },
  {
    step: 2,
    title: "📦 Agrega y administra productos",
    description: `Sube nuevas obras de arte y productos para artistas con facilidad.
    Organiza por categorías, establece precios y gestiona inventarios en tiempo real.`,
    button: "Siguiente",
    image: {
      museum: museum2,
      dec1: dec1,
      dec2: dec2
    }
  },
  {
    step: 3,
    title: "📋 Revisa y procesa pedidos",
    description: `Administra pedidos de forma eficiente, mantén satisfechos a tus clientes 
    y asegúrate de que todo esté en orden.`,
    button: "Siguiente",
    image: {
      museum: onlineShopping,
      dec1: dec1,
      dec2: dec2
    }
  },
  {
    step: 4,
    title: "📊 Obtén reportes de ventas y tendencias",
    description: `Consulta estadísticas de ventas, identifica productos más populares y optimiza tu estrategia con datos en tiempo real.`,
    button: "Finalizar",
    image: {
      museum: data,
      dec1: dec1,
      dec2: dec2
    }
  }
]
export default onboardingSteps