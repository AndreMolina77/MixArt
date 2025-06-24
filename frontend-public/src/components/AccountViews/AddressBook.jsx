import { useState } from 'react'

const AddressBookList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const contacts = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-123-4567', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Ic_account_box_48px.svg' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-987-6543' },
    { id: '3', name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 555-456-7890', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Ic_account_box_48px.svg' }
  ]
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <h2 className="text-[#DE7A58] font-semibold text-lg mb-6">Libreta de direcciones</h2>
      <div className="sticky top-0 pt-2 pb-4 z-10">
        <div className="mb-6 relative">
          <input type="text" placeholder="Buscar contactos..." className="w-full pl-10 pr-4 py-2 border border-[#81B29A] text-[#7A6E6E] bg-[#EBFEF5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <svg className="w-5 h-5 absolute left-3 top-3 text-[#7A6E6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      <div className="space-y-4 h-[calc(75vh-260px)] overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-6 text-[#7A6E6E]">No se encontraron contactos</div>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors border border-[#81B29A] cursor-pointer">
              <div className="flex-shrink-0">
                {contact.avatarUrl ? (
                  <img src={contact.avatarUrl} alt={contact.name} className="w-12 h-12 rounded-full object-cover"/>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="text-lg font-medium text-[#7A6E6E] truncate">{contact.name}</h3>
                <p className="text-sm text-[#7A6E6E] truncate">{contact.email}</p>
              </div>
              <div className="ml-4 flex items-center space-x-4">
                <a href={`mailto:${contact.email}`} className="text-[#DE7A58] hover:text-orange-600 transition-colors" aria-label={`Email ${contact.name}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
                <div className="text-sm text-[#7A6E6E] hidden md:block">{contact.phone}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default AddressBookList