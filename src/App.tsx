import { memo, useState, useCallback } from 'react'
import './App.css'
import AgentWidget from './components/AgentWidget'
import ThemeToggle from './components/ThemeToggle'
import AuthButton from './components/AuthButton'
import AppointmentForm from './components/AppointmentForm'
import HairProducts from './components/HairProducts'
import CartWidget from './components/CartWidget'
import ShoppingCart from './components/ShoppingCart'
import CheckoutModal from './components/CheckoutModal'
import { useCart } from './contexts/CartContext'

const App = memo(function App() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleOpenCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }, [])

  const handleOrderComplete = useCallback(() => {
    clearCart()
    setIsCheckoutOpen(false)
  }, [clearCart])

  return (
    <div>
      <header className="site-header sticky-header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-icon">💈</span>
            BAI Barber
          </div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#pricing">Services</a>
            <a href="#products">Products</a>
            <a href="#appointments">Book</a>
            <CartWidget onOpenCart={handleOpenCart} />
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Beyond Cuts: Experience the Art of Grooming</h1>
              <p className="hero-subtitle">
                It's more than just a haircut; it's a grooming experience tailored to your lifestyle. 
                Discover personalized services that go beyond expectations, in an atmosphere you'll love.
              </p>
              <div className="hero-actions">
                <button className="btn primary">Book Appointment</button>
                <button className="btn secondary">Find Barbershop</button>
              </div>
            </div>
            <div className="hero-widget">
              <AgentWidget />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2>About Us</h2>
            <p className="section-description">
              We see grooming as an art and every client as a canvas. Our barbershop is more than a place for a haircut; 
              it's where style meets substance, and grooming meets personal care. We offer a range of services to ensure 
              you look and feel your best, in a space where you can truly relax.
            </p>
            <button className="btn primary">Book Appointment</button>
          </div>
        </section>

        <section id="pricing" className="section alt">
          <div className="container">
            <h2>Our Services</h2>
            <div className="services-grid">
              <div className="service-item">
                <h3>Beard & Shape Up</h3>
                <span className="price">$30</span>
              </div>
              <div className="service-item">
                <h3>Children</h3>
                <span className="price">$50</span>
              </div>
              <div className="service-item">
                <h3>Haircut</h3>
                <span className="price">$55-$60</span>
              </div>
              <div className="service-item">
                <h3>Haircut & Beard</h3>
                <span className="price">$70</span>
              </div>
            </div>
          </div>
        </section>

        <section id="styles" className="section">
          <div className="container">
            <h2>Our Work</h2>
            <p className="section-description">
              A full suite of services including beard shaping and skin care, for a polished appearance beyond the haircut.
            </p>
            <div className="work-grid">
              <div className="work-item">
                <div className="work-image fade"></div>
                <h4>Skin Fade</h4>
              </div>
              <div className="work-item">
                <div className="work-image pompadour"></div>
                <h4>Pompadour</h4>
              </div>
              <div className="work-item">
                <div className="work-image buzz"></div>
                <h4>Buzz Cut</h4>
              </div>
            </div>
          </div>
        </section>

        <HairProducts />

        <section id="locations" className="section alt">
          <div className="container">
            <h2>Where to Find Us</h2>
            <div className="location-info">
              <div className="address">
                <h3>5 N Kingston St, San Mateo, CA 94401, USA</h3>
              </div>
              <div className="hours">
                <h4>Hours</h4>
                <div className="hours-grid">
                  <div className="hour-item">
                    <span>Monday</span>
                    <span>9:00 AM to 5:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Tuesday</span>
                    <span>10:00 AM to 7:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Wednesday</span>
                    <span>10:00 AM to 7:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Thursday</span>
                    <span>10:00 AM to 7:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Friday</span>
                    <span>8:00 AM to 7:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Saturday</span>
                    <span>8:00 AM to 5:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Sunday</span>
                    <span>9:00 AM to 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="appointments" className="section">
          <div className="container">
            <h2>Appointments</h2>
            <AppointmentForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Bay Area Barber Finder</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  )
})

export default App
