import { Link } from 'react-router-dom'
import './App.css'
import AgentWidget from './components/AgentWidget'
import ThemeToggle from './components/ThemeToggle'
import AuthButton from './components/AuthButton'
import AppointmentForm from './components/AppointmentForm'

function App() {
  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Bay Area Barber Finder</div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#styles">Hair Styles</a>
            <a href="#locations">Locations</a>
            <a href="#appointments">Appointments</a>
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="grid-bg" />
            <div className="tools">
              <span className="tool scissors" aria-hidden>✂️</span>
              <span className="tool trimmer" aria-hidden>💈</span>
              <span className="tool razor" aria-hidden>🪒</span>
              <span className="tool sprayer" aria-hidden>💦</span>
            </div>
            <div>
              <h1>Find your next cut in San Francisco</h1>
              <p className="lead">An AI agent that locates top-rated Bay Area barbershops near you.</p>
            </div>
            <AgentWidget />
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2>About</h2>
            <p>
              We aggregate the best barbershops across San Francisco, Oakland, Berkeley, and the Peninsula.
              Our AI helps you discover nearby shops, compare pricing, and book appointments.
            </p>
          </div>
        </section>

        <section id="pricing" className="section alt">
          <div className="container">
            <h2>Pricing</h2>
            <div className="grid three">
              <div className="card">
                <h3>Basic Cut</h3>
                <p className="price">$25–$40</p>
                <p>Quick clean-up and classic styles.</p>
              </div>
              <div className="card highlight">
                <h3>Fade + Style</h3>
                <p className="price">$45–$70</p>
                <p>Skin fades, tapers, and styled finishes.</p>
              </div>
              <div className="card">
                <h3>Beard & Line-up</h3>
                <p className="price">$20–$35</p>
                <p>Beard trims, shape-ups, and razor lines.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="styles" className="section">
          <div className="container">
            <h2>Hair Styles</h2>
            <div className="grid three">
              <div className="style-card">
                <div className="style-thumb fade" />
                <h4>Skin Fade</h4>
              </div>
              <div className="style-card">
                <div className="style-thumb pompadour" />
                <h4>Pompadour</h4>
              </div>
              <div className="style-card">
                <div className="style-thumb buzz" />
                <h4>Buzz Cut</h4>
              </div>
            </div>
          </div>
        </section>

        <section id="locations" className="section alt">
          <div className="container">
            <h2>Locations</h2>
            <div className="grid four">
              <div className="chip">San Francisco</div>
              <div className="chip">Oakland</div>
              <div className="chip">Berkeley</div>
              <div className="chip">San Jose</div>
              <div className="chip">Daly City</div>
              <div className="chip">San Mateo</div>
              <div className="chip">Palo Alto</div>
              <div className="chip">Fremont</div>
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
    </div>
  )
}

export default App
