import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import FirstTimeUser from './pages/FirstTimeUser'
import Login from './pages/Login'
import MainPage from './pages/MainPage'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Toaster 
          position="top-right"
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
          {/* Rutas públicas */}
          <Route path="/" element={<FirstTimeUser />} />
          <Route path="/login" element={<Login />} />
          {/* Rutas protegidas */}
          <Route  path="/main" element={<ProtectedRoute><MainPage/></ProtectedRoute>} />  
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App