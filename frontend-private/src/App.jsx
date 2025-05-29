import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import FirstTimeUser from './pages/FirstTimeUser'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Toaster position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#EBFEF5',
              color: '#7A6E6E',
              border: '1px solid #81B29A',
              fontFamily: 'Alexandria'
            },
            success: {
              iconTheme: {
                primary: '#E07A5F',
                secondary: '#EBFEF5'
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#EBFEF5'
              }
            }
          }}
        />
        <Routes>
          <Route path="/" element={<FirstTimeUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
export default App