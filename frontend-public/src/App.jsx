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
import Checkout from './pages/checkout.jsx'
import Wishlist from './pages/wishlist.jsx'

const App = () => {
  return (
    <>
      <AccountProvider>
        <Navbar/>
        <AnnouncementBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/terminos-y-condiciones" element={<Terms/>}/>
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy/>}/>
          <Route path="/faq" element={<FAQ/>}/>
          <Route path="/registro" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contactanos" element={<Contact/>}/>
          <Route path="/acerca-de" element={<About/>}/>
          <Route path="/mi-cuenta" element={<MyAccount/>}/>
          <Route path="/carrito" element={<Cart/>}/>
          <Route path="carrito/checkout" element={<Checkout/>}/>
          <Route path="lista-deseos" element={<Wishlist/>}/>
          <Route path="lista-deseos/ver-producto" element={<ProductDetailPage/>}/>
          <Route path="mi-cuenta/ver-producto" element={<ProductDetailPage/>}/>
          <Route path="inicio/ver-producto" element={<ProductDetailPage/>}/>
        </Routes>
        <Footer/>
      </AccountProvider>
    </>
  )
}
export default App