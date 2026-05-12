import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.5a.5.5 0 0 0 .613.612l5.701-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.42l-.368-.216-3.813.978.999-3.735-.239-.382A9.945 9.945 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const NAV_LINKS = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#why-us' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <a href="#hero" className="navbar__logo" onClick={e => go(e, '#hero')}>
            <img src="/images/logo.png" alt="Sanifluide Maroc — Génie climatique & sécurité incendie" className="navbar__logo-img" />
          </a>

          {/* Links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={active === link.href.slice(1) ? 'active' : ''}
                  onClick={e => go(e, link.href)}
                >
                  {link.label}
                  {active === link.href.slice(1) && <span className="navbar__active-dot" />}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="navbar__right">
            <a
              href="https://www.instagram.com/sanifluide.maroc/"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__instagram"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a href="tel:+212661986306" className="navbar__phone">
              <Phone size={14} />
              +212 661 986 306
            </a>
            <a
              href="https://wa.me/212661986306"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__whatsapp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a href="#whatsapp-contact" className="btn btn-primary btn-sm navbar__cta" onClick={e => go(e, '#whatsapp-contact')}>
              Demander un devis <span className="navbar__cta-arrow">→</span>
            </a>
          </div>

          <a href="tel:+212661986306" className="navbar__phone-mobile">
            <Phone size={14} />
            +212 661 986 306
          </a>

          <button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__links">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? 'active' : ''}
              onClick={e => go(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mobile-menu__footer">
          <a
            href="https://www.instagram.com/sanifluide.maroc/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__instagram"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a href="tel:+212661986306" className="mobile-menu__phone">
            <Phone size={15} />
            +212 661 986 306
          </a>
          <a
            href="https://wa.me/212661986306"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__whatsapp"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          <a href="#whatsapp-contact" className="btn btn-primary" onClick={e => go(e, '#whatsapp-contact')}>
            Demander un devis
          </a>
        </div>
      </div>
    </>
  )
}
