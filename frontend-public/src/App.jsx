import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Terms from './pages/termsconditions.jsx'
import PrivacyPolicy from './pages/privacypolicy.jsx'
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Contact from './pages/contact.jsx'
import About from './pages/about.jsx'
import '@fortawesome/fontawesome-svg-core/styles.css';
const App = () => {
  return (
    <>
      <About/>
    </>
  )
}
export default App