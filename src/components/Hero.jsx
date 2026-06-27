import { useState, useRef, useEffect } from 'react'
import { Wind, Snowflake, Flame, ShieldAlert, Send } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.5a.5.5 0 0 0 .613.612l5.701-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.42l-.368-.216-3.813.978.999-3.735-.239-.382A9.945 9.945 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

const CARDS = [
  {
    icon: <Wind size={22} />,
    title: 'Ventilation',
    sub: 'VMC double flux',
    cls: 'hero__card--1',
    hint: 'Qualité d\'air optimale, énergie récupérée.',
    bullets: ['VMC simple & double flux', 'Ventilation industrielle', 'Désenfumage & secours'],
  },
  {
    icon: <Snowflake size={22} />,
    title: 'Climatisation',
    sub: 'VRV / Multi-split',
    cls: 'hero__card--2',
    hint: 'Confort thermique garanti toute l\'année.',
    bullets: ['Systèmes VRV / VRF', 'Multi-split & centralisé', 'BMS & domotique'],
  },
  {
    icon: <Flame size={22} />,
    title: 'Chauffage',
    sub: 'PAC & Chaudières',
    cls: 'hero__card--3',
    hint: 'Performance énergétique maximale.',
    bullets: ['Pompes à chaleur', 'Planchers chauffants', 'Chaudières à condensation'],
  },
  {
    icon: <ShieldAlert size={22} />,
    title: 'Incendie',
    sub: 'Détection & Sprinklers',
    cls: 'hero__card--4',
    hint: 'Mise en conformité totale de vos bâtiments.',
    bullets: ['Détection & SSI', 'Sprinklers & RIA', 'Désenfumage réglementaire'],
  },
]

export default function Hero() {
  const [orbitHovered, setOrbitHovered] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 })
  const videoRef = useRef(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const handleEnded = () => {
      vid.currentTime = 0
      vid.play().catch(() => {})
    }
    const handlePause = () => {
      if (!vid.ended) vid.play().catch(() => {})
    }
    vid.addEventListener('ended', handleEnded)
    vid.addEventListener('pause', handlePause)
    vid.play().catch(() => {})
    return () => {
      vid.removeEventListener('ended', handleEnded)
      vid.removeEventListener('pause', handlePause)
    }
  }, [])

  const handleCardEnter = (e, title) => {
    setActiveCard(title)
    const rect = e.currentTarget.getBoundingClientRect()
    const top = rect.bottom + 8
    const left = Math.min(rect.left, window.innerWidth - 230)
    setPopupPos({ top, left })
  }
  return (
    <section className="hero" id="hero">
      {/* Looping background video */}
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/All/DSC00160.JPG"
      >
        <source src="https://res.cloudinary.com/dm5ez3zp8/video/upload/Video1_skme9w.mp4" type="video/mp4" />
      </video>
      <div className="hero__video-overlay" />

      <div className="container hero__content">
        {/* Left */}
        <div className="hero__left">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Expert en génie climatique &amp; sécurité incendie
          </div>
          <h1 className="hero__title">
            <span className="sr-only">Expert en génie climatique et sécurité incendie au Maroc depuis 1996 — </span>
            Votre<br />
            confort,<br />
            <em className="hero__notre">notre</em> art.
          </h1>
          <p className="hero__sub">
            Depuis 1996, nous assurons votre confort avec expertise et fiabilité.
            Nos solutions sont conçues pour vous offrir un environnement agréable et performant, à chaque saison.
          </p>
          <div className="hero__actions">
            <div className="hero__cta-wrap">
              <div className="hero__cta-ring" />
              <div className="hero__cta-ring hero__cta-ring--2" />
              <button className="btn btn-primary hero__cta-btn" onClick={() => go('#whatsapp-contact')}>
                <span className="hero__cta-pulse" />
                <Send size={16} style={{ flexShrink: 0 }} /> Demander un devis gratuit
              </button>
              <span className="hero__cta-badge">Gratuit &amp; sans engagement</span>
            </div>
            <div className="hero__secondary-actions">
              <a
                href="https://www.instagram.com/sanifluide.maroc/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost hero__instagram"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href="https://wa.me/212661986306"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__whatsapp"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-num">200<span>+</span></span>
              <span className="hero__trust-label">Projets réalisés</span>
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-num">30<span>ans</span></span>
              <span className="hero__trust-label">D'expérience</span>
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-num">100<span>%</span></span>
              <span className="hero__trust-label">Clients satisfaits</span>
            </div>
          </div>
        </div>

        {/* Right */}
          <div className={`hero__right${orbitHovered ? ' orbit-hovered' : ''}`}>
          {/* Enhanced orbital ring system */}
          <div className="hero__orbit">
            {/* Outer rotating ring with dashes */}
            <div className="hero__orbit-ring hero__orbit-ring--outer">
              <div className="hero__orbit-dot hero__orbit-dot--1" />
              <div className="hero__orbit-dot hero__orbit-dot--2" />
            </div>
            {/* Middle ring counter-rotating */}
            <div className="hero__orbit-ring hero__orbit-ring--mid">
              <div className="hero__orbit-dot hero__orbit-dot--3" />
            </div>
            {/* Inner glowing ring */}
            <div className="hero__orbit-ring hero__orbit-ring--inner" />
            {/* Core glow */}
            <a
              href="https://www.instagram.com/sanifluide.maroc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__orbit-core"
              onMouseEnter={() => setOrbitHovered(true)}
              onMouseLeave={() => setOrbitHovered(false)}
            >
              <div className="hero__orbit-glow" />
              <img src="/images/logo.png" alt="Sanifluide Maroc — Expert en génie climatique depuis 1996" className="hero__ring-logo-img" />
            </a>
          </div>

          {CARDS.map(c => (
            <div
              className={`hero__card ${c.cls}${activeCard === c.title ? ' hero__card--active' : ''}`}
              key={c.title}
              onMouseEnter={e => handleCardEnter(e, c.title)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={e => activeCard === c.title ? setActiveCard(null) : handleCardEnter(e, c.title)}
            >
              <div className="hero__card-icon">{c.icon}</div>
              <div>
                <span className="hero__card-title">{c.title}</span>
                <span className="hero__card-sub">{c.sub}</span>
              </div>
            </div>
          ))}

          {/* Fixed popup rendered outside overflow:hidden hero */}
          {activeCard && (() => {
            const card = CARDS.find(c => c.title === activeCard)
            return card ? (
              <div
                className="hero__card-popup-fixed"
                style={{ top: popupPos.top, left: popupPos.left }}
                onMouseEnter={() => setActiveCard(activeCard)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <p className="hero__card-popup-hint">{card.hint}</p>
                <ul className="hero__card-popup-list">
                  {card.bullets.map(b => <li key={b}><span className="hero__card-popup-dot" />{b}</li>)}
                </ul>
              </div>
            ) : null
          })()}
        </div>
      </div>

      <div className="hero__scroll" onClick={() => go('#services')}>
        <span className="hero__scroll-text">Défiler</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
