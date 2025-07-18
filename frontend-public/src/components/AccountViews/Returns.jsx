import { useState } from 'react'
import { useAccountContext } from '../../context/AccountContext.jsx'

const ReturnsList = ({setActiveSection}) => {
    const { setHighlightedOrder } = useAccountContext()
    const handleOrderClick = (orderNumber) => {
        setHighlightedOrder(orderNumber)
        setActiveSection('compras')
    }
    const [searchTerm, setSearchTerm] = useState('')
    
    const returns = [
      { id: '1', returnNumber: 'RET-56789', orderNumber: 'ORD-23456', date: '2023-08-18', items: ['Wireless Headphones X200'], reason: 'Product not as described', status: 'Processing Return' },
      { id: '2', returnNumber: 'RET-56788', orderNumber: 'ORD-23455', date: '2023-08-17', items: ['Smart Watch Pro Series', 'Charging Cable'], reason: 'Received wrong color', status: 'Refund Issued' },
      { id: '3', returnNumber: 'RET-56780', orderNumber: 'ORD-23442', date: '2023-08-15', items: ['LED Desk Lamp'], status: 'Return Rejected', rejectionReason: 'Item used past return window' }
    ]

    const filteredReturns = returns.filter(returnItem =>
      returnItem.returnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (
        <div className="max-w-4xl mx-auto rounded-lg">
            <h2 className="text-[#DE7A58] font-semibold text-lg mb-6">Mis devoluciones</h2>
            <div className="sticky top-0 bg-white pt-2 pb-4 z-10">
                <div className="mb-4 relative">
                    <input type="text" placeholder="Buscar devoluciones..." className="w-full pl-10 pr-4 py-2 border border-[#81B29A] text-[#7A6E6E] bg-[#EBFEF5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <svg className="w-5 h-5 absolute left-3 top-3 text-[#7A6E6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
            </div>
            <div className="space-y-4 h-[calc(100vh-300px)] overflow-y-auto pb-4">
            {filteredReturns.length === 0 ? (
                <div className="text-center py-6 text-[#7A6E6E]">No se encontraron devoluciones</div>
            ) : (
                filteredReturns.map((returnItem) => (
                <div key={returnItem.id} className="p-4 border border-[#81B29A] rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                    <div>
                        <a className="text-[#DE7A58] hover:text-[#E07A5F] transition-colors">
                        <h3 className="text-lg font-medium">Devolución: {returnItem.returnNumber}</h3>
                        <div className="text-[#DE7A58] hover:text-[#E07A5F] transition-colors cursor-pointer" onClick={() => { handleOrderClick(returnItem.orderNumber), setActiveSection('compras'), sessionStorage.setItem('highlightOrder', returnItem.orderNumber)}}>Orden: {returnItem.orderNumber}</div>
                        </a>
                        <p className="text-sm text-[#7A6E6E] mt-1">Solicitada el: {new Date(returnItem.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                        returnItem.status === 'Refund Issued' ? 'bg-[#81B29A]/20 text-[#81B29A]' : returnItem.status === 'Return Rejected' ? 'bg-[#DE7A58]/20 text-[#DE7A58]' : 'bg-[#DE7A58]/20 text-[#DE7A58]'
                    }`}>{returnItem.status}</span>
                    </div>
                    <div className="mb-3">
                    <h4 className="text-sm font-medium text-[#7A6E6E] mb-1">Productos devueltos:</h4>
                    <ul className="list-disc list-inside">
                        {returnItem.items.map((item, index) => (
                        <li key={index} className="text-sm text-[#7A6E6E]">{item}</li>
                        ))}
                    </ul>
                    </div>
                    <div className="pt-2 border-t border-[#81B29A]/30">
                    {returnItem.reason && (
                        <p className="text-sm text-[#7A6E6E] mb-2">
                        <span className="font-medium">Razón:</span> {returnItem.reason}
                        </p>
                    )}
                    {returnItem.rejectionReason && (
                        <p className="text-sm text-[#DE7A58]">
                        <span className="font-medium">Motivo rechazo:</span> {returnItem.rejectionReason}
                        </p>
                    )}
                    </div>
                </div>
                ))
            )}
            </div>
        </div>
    )
}
export default ReturnsList