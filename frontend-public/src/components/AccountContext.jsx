import { createContext, useContext, useState } from 'react'

const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
  const [highlightedOrder, setHighlightedOrder] = useState(null)
  return (
    <AccountContext.Provider value={{ 
      highlightedOrder,
      setHighlightedOrder 
    }}>
      {children}
    </AccountContext.Provider>
  )
}
export const useAccountContext = () => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAccountContext must be used within AccountProvider')
  }
  return context
}