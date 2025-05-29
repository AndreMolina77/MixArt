import { Routes, Route } from 'react-router-dom'
import FirstTimeUser from './pages/FirstTimeUser'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstTimeUser />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App