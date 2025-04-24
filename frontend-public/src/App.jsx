import { Routes, Route } from 'react-router-dom'
import Terms from './pages/termsconditions.jsx'
import PrivacyPolicy from './pages/privacypolicy.jsx'
import FAQ from './pages/faq.jsx'
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Contact from './pages/contact.jsx'
import About from './pages/about.jsx'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import Footer from './components/footer.jsx'
import AnnouncementBar from './components/announcementbar.jsx'
import MyAccount from './pages/myaccount.jsx'
import { AccountProvider } from './components/accountcontext.jsx'
import ProductDetailPage from './pages/productview.jsx'
import Cart from './pages/cart.jsx'
import CheckoutPage from './pages/checkout.jsx'

const App = () => {
  return (
    <CheckoutPage/>
  )
}
export default App