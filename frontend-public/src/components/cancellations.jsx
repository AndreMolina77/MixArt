import { useState, useEffect } from 'react'
import { useAccountContext } from './accountcontext.jsx'

const CancellationsList = ({setActiveSection}) => {
  const { highlightedOrder, setHighlightedOrder } = useAccountContext()
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    if(highlightedOrder) {
      const element = document.getElementById(`order-${highlightedOrder}`)
      element?.scrollIntoView({ behavior: 'smooth' })
      element?.classList.add('ring-2', 'ring-[#DE7A58]')
      
      setTimeout(() => {
        element?.classList.remove('ring-2', 'ring-[#DE7A58]')
        setHighlightedOrder(null)
      }, 3000)
    }
  }, [highlightedOrder])

  const cancellations = [
    {  id: '1', orderNumber: 'ORD-23456', date: '2025-04-15', items: ['Wireless Headphones X200', 'Charging Case'], reason: 'Found better price elsewhere', status: 'Cancelled' },
    {  id: '2', orderNumber: 'ORD-23455', date: '2025-04-14', items: ['Smart Watch Pro Series'], status: 'Cancellation Requested'},
    {  id: '3', orderNumber: 'ORD-23442', date: '2025-04-12', items: ['LED Desk Lamp', 'USB-C Adapter'], reason: 'Shipping time too long', status: 'Cancelled'}
  ]
  const filteredCancellations = cancellations.filter(cancellation =>
    cancellation.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cancellation.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  return (
    <div className="max-w-4xl mx-auto rounded-lg">
      <h2 className="text-[#DE7A58] font-semibold text-lg mb-6">Cancelaciones realizadas por ti</h2>
      <div className="sticky top-0 pt-2 pb-4 z-10">
        <div className="mb-4 relative">
          <input type="text" placeholder="Buscar cancelaciones..." className="w-full pl-10 pr-4 py-2 border border-[#81B29A] text-[#7A6E6E] bg-[#EBFEF5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <svg className="w-5 h-5 absolute left-3 top-3 text-[#7A6E6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      <div className="space-y-4  h-[calc(100vh-300px)] overflow-y-auto">
        {filteredCancellations.length === 0 ? (
          <div className="text-center py-6 text-[#7A6E6E]">No se encontraron cancelaciones</div>
        ) : (
          filteredCancellations.map((cancellation) => (
            <div  key={cancellation.id} className="p-4 border border-[#81B29A] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-[#DE7A58] hover:text-[#E07A5F] transition-colors cursor-pointer" onClick={() => {setHighlightedOrder(cancellation.orderNumber), setActiveSection('compras'), sessionStorage.setItem('highlightOrder', cancellation.orderNumber) }}>Orden: {cancellation.orderNumber}</h3>
                  <p className="text-sm text-[#7A6E6E]">Cancelado el: {new Date(cancellation.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  cancellation.status === 'Cancelled' ? 'bg-[#DE7A58]/20 text-[#DE7A58]' : 'bg-[#81B29A]/20 text-[#81B29A]'
                }`}>{cancellation.status}</span>
              </div>
              <div className="mb-3">
                <h4 className="text-sm font-medium text-[#7A6E6E] mb-1">Productos cancelados:</h4>
                <ul className="list-disc list-inside">
                  {cancellation.items.map((item, index) => (
                    <li key={index} className="text-sm text-[#7A6E6E]">{item}</li>
                  ))}
                </ul>
              </div>
              {cancellation.reason && (
                <div className="pt-2 border-t border-[#81B29A]/30">
                  <p className="text-sm text-[#7A6E6E]"><span className="font-medium">Razón:</span> {cancellation.reason}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default CancellationsList