import { useState } from 'react'

const PaymentMethodsList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const paymentMethods = [
    { id: '1', name: 'Main Credit Card', lastFour: '4312', expiry: '12/25', type: 'VISA', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    { id: '2', name: 'Business Account', lastFour: '6589', expiry: '08/27', type: 'Mastercard' },
    { id: '3', name: 'Backup Card', lastFour: '2200', expiry: '03/26', type: 'AMEX', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg' }
  ]
  const filteredPayments = paymentMethods.filter(payment =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) || payment.lastFour.includes(searchTerm)
  )
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <h2 className="text-[#DE7A58] font-semibold text-lg mb-6">Credenciales de pago</h2>
      <div className="sticky top-0 pt-2 pb-4 z-10">
        <div className="mb-4 relative">
          <input  type="text"  placeholder="Buscar métodos de pago..."  className="w-full pl-10 pr-4 py-2 border border-[#81B29A] text-[#7A6E6E] bg-[#EBFEF5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <svg  className="w-5 h-5 absolute left-3 top-3 text-[#7A6E6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      <div className="space-y-4 h-[calc(75vh-260px)] overflow-y-auto">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-6 text-[#7A6E6E]">No se encontraron métodos de pago</div>
        ) : (
          filteredPayments.map((payment) => (
            <div key={payment.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors border border-[#81B29A] cursor-pointer">
              <div className="flex-shrink-0">
                {payment.iconUrl ? (
                  <img src={payment.iconUrl} alt={payment.type} className="w-12 h-12 object-contain"/>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">{payment.type.slice(0,2)}</div>
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="text-lg font-medium text-[#7A6E6E] truncate">{payment.name}</h3>
                <p className="text-sm text-[#7A6E6E]">**** **** **** {payment.lastFour}</p>
              </div>
              <div className="ml-4 flex items-center space-x-4">
                <button className="text-[#DE7A58] hover:text-orange-600 transition-colors cursor-pointer" aria-label={`Delete ${payment.name}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
                <div className="text-sm text-[#7A6E6E] hidden md:block">Expira {payment.expiry}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default PaymentMethodsList