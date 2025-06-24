import { Routes, Route } from 'react-router-dom'
import Terms from './pages/termsconditions.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import FAQ from './pages/FAQ.jsx'
import Signup from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from './components/navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/footer.jsx'
import AnnouncementBar from './components/announcementbar.jsx'
import MyAccount from './pages/MyAccount.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { AccountProvider } from './components/accountcontext.jsx'
import ProductDetailPage from './pages/productview.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Wishlist from './pages/WishList.jsx'

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
          <Route path="/carrito/checkout" element={<Checkout/>}/>
          <Route path="/lista-deseos" element={<Wishlist/>}/>
          <Route path="/lista-deseos/ver-producto" element={<ProductDetailPage/>}/>
          <Route path="/mi-cuenta/ver-producto" element={<ProductDetailPage/>}/>
          <Route path="/inicio/ver-producto" element={<ProductDetailPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer/>
      </AccountProvider>
    </>
  )
}
export default App