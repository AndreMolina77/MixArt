import { React, useState }from 'react'
import Breadcrumbs from '../components/breadcrumbs.jsx'
import Form from '../components/form.jsx'
import AddressBookList from '../components/addressbook.jsx'
import PaymentMethodsList from '../components/paymentmethods.jsx'
import CancellationsList from '../components/cancellations.jsx'
import ReturnsList from '../components/returns.jsx'
import PurchasesList from '../components/purchases.jsx'
import { useAccountContext } from '../components/accountcontext.jsx'
import ProductCard from '../components/productcard.jsx'
import WelcomeUser from '../components/welcomeuser.jsx'

const MyAccount = () => {
  const { setHighlightedOrder } = useAccountContext()
  const [activeSection, setActiveSection] = useState('perfil') 
  const renderSection = () => {
    const commonProps = {
      setActiveSection, setHighlightedOrder
    }
    switch (activeSection) {
      case 'perfil': return <Form {...commonProps} />
      case 'direcciones': return <AddressBookList {...commonProps} />
      case 'pago': return <PaymentMethodsList {...commonProps} />
      case 'devoluciones': return <ReturnsList setActiveSection={setActiveSection} />
      case 'cancelaciones': return <CancellationsList setActiveSection={setActiveSection} />
      case 'compras': return <PurchasesList setActiveSection={setActiveSection} />
      case 'deseos': return <ProductCard {...commonProps}/>
      default: return <Form {...commonProps} />
    }
  }
  return ( 
    <div className="min-h-screen bg-[#F4F1DE] font-[Alexandria] flex">    
      <aside className="w-100 pt-17 pl-55 text-[#7A6E6E] text-sm space-y-8">
      <Breadcrumbs/>
      <WelcomeUser Name={'John Doe'}/>
      <div>
          <h2 className="mb-2 font-semibold">Administrar mi cuenta</h2>
          <ul className="space-y-1">
            <li onClick={() => setActiveSection('perfil')} className={`ml-2 cursor-pointer transition-colors ${activeSection === 'perfil' ? 'text-[#DE7A58] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Mi perfil
            </li>
            <li onClick={() => setActiveSection('direcciones')} className={`ml-2 cursor-pointer transition-colors ${activeSection === 'direcciones' ? 'text-[#DE7A58] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Libreta de direcciones
            </li>
            <li onClick={() => setActiveSection('pago')} className={`ml-2 cursor-pointer transition-colors ${activeSection === 'pago' ? 'text-[#DE7A58] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Mis opciones de pago
            </li>
            <li onClick={() => setActiveSection('compras')} className={`ml-2 cursor-pointer transition-colors ${activeSection === 'compras' ? 'text-[#DE7A58] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Mis compras
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Mis pedidos</h2>
          <ul className="space-y-1 ml-2">
            <li onClick={() => setActiveSection('devoluciones')} className={`cursor-pointer transition-colors ${activeSection === 'devoluciones' ? 'text-[#DE7A58] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Mis devoluciones
            </li>
            <li onClick={() => setActiveSection('cancelaciones')} className={`cursor-pointer transition-colors ${activeSection === 'cancelaciones' ? 'text-[#DE7A5F] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Mis cancelaciones
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Mis pedidos</h2>
          <ul className="space-y-1 ml-2">
            <li onClick={() => setActiveSection('deseos')} className={`cursor-pointer transition-colors ${activeSection === 'deseos' ? 'text-[#DE7A5F] font-semibold' : 'hover:text-[#E07A5F]'}`}>
              Mi lista de deseos
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 flex items-start justify-center pt-30 pr-30 pb-20 min-h-screen">
        <div className="bg-white shadow rounded-lg p-8 w-full max-w-3xl max-h-[calc(100vh-180px)] overflow-y-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
export default MyAccount