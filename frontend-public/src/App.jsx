import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from './components/Main/NavBar.jsx'
import Footer from './components/Main/Footer.jsx'
import AnnouncementBar from './components/Main/AnnouncementBar.jsx'
import Loader from './components/Misc/Loader.jsx'
import { AccountProvider } from './context/AccountContext.jsx'
// NUEVO: Importar AuthProvider y ProtectedRoute
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx'

// Importaciones diferidas con lazy
const Home = lazy(() => import('./pages/Home.jsx'));
const Terms = lazy(() => import('./pages/termsconditions.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const Signup = lazy(() => import('./pages/SignUp.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const MyAccount = lazy(() => import('./pages/MyAccount.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const ProductDetailPage = lazy(() => import('./pages/productview.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Wishlist = lazy(() => import('./pages/WishList.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));
const VerifyCode = lazy(() => import('./pages/VerifyCode.jsx'));
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'));
const CatalogPage = lazy(() => import('./pages/Catalogue.jsx'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation.jsx'));

// Componente de carga global
const GlobalLoading = () => (
  <div className="fixed inset-0 bg-[#FAF5E9] bg-opacity-90 flex items-center justify-center z-50">
    <Loader size="xl" />
  </div>
);

const App = () => {
  return (
    <>
      {/* NUEVO: AuthProvider envuelve todo */}
      <AuthProvider>
        <AccountProvider>
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
            <Navbar/>
            <AnnouncementBar/>
            <Suspense fallback={<GlobalLoading />}>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/terminos-y-condiciones" element={<Terms/>}/>
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy/>}/>
                <Route path="/faq" element={<FAQ/>}/>
                <Route path="/registro" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/contactanos" element={<Contact/>}/>
                <Route path="/acerca-de" element={<About/>}/>
                {/* MyAccount protegido */}
                <Route path="/mi-cuenta" element={
                  <ProtectedRoute>
                    <MyAccount/>
                  </ProtectedRoute>
                }/>
                <Route path="/carrito" element={<Cart/>}/>
                <Route path="/carrito/checkout" element={<Checkout/>}/>
                <Route path="/lista-deseos" element={<Wishlist/>}/>
                <Route path="/catalogo" element={<CatalogPage/>}/>
                {/* OrderConfirmation protegido */}
                <Route path="/finalizar" element={
                  <ProtectedRoute>
                    <OrderConfirmation/>
                  </ProtectedRoute>
                }/>
                {/* Rutas mejoradas para productos */}
                <Route path="/producto/:productId" element={<ProductDetailPage/>}/>
                {/* Nuevas rutas para recuperación de contraseña */}
                <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
                <Route path="/verificar-codigo" element={<VerifyCode />} />
                <Route path="/restablecer-contrasena" element={<ResetPassword />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer/>
          </div>
        </AccountProvider>
      </AuthProvider>
    </>
  )
}
export default App