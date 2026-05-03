import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.5a.5.5 0 0 0 .613.612l5.701-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.42l-.368-.216-3.813.978.999-3.735-.239-.382A9.945 9.945 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '' })
    } catch { setStatus('error') }
  }

  return (
    <footer className="footer" id="contact">
      {/* Contact section */}
      <div className="contact">
        {/* Background decorative orbs */}
        <div className="contact__bg-orb contact__bg-orb--1" />
        <div className="contact__bg-orb contact__bg-orb--2" />

        <div className="container">
          <div className="contact__inner">

            {/* Left: info */}
            <div className="contact__info">
              <div>
                <div className="tag">Contactez-nous</div>
                <h2 className="section-title">
                  Démarrons votre<br /><span>projet ensemble</span>
                </h2>
                <p className="contact__intro">
                  Décrivez-nous votre projet, nous vous répondons sous <strong>24h</strong> avec une estimation claire et sans engagement.
                </p>
              </div>

              {/* Availability badge */}
              <div className="contact__avail">
                <span className="contact__avail-dot" />
                <span>Équipe disponible · Lundi – Vendredi 08:30–18:00</span>
              </div>

              <div className="contact__info-list">
                {[
                  { Icon: MapPin, label: 'Adresse', val: 'Av. Al Hiwar, Tanger 90000', href: null },
                  { Icon: Phone, label: 'Téléphone', val: '+212 661 986 306', href: 'tel:+212661986306' },
                  { Icon: Mail, label: 'Email', val: 'contact@sanifluide.com', href: 'mailto:contact@sanifluide.com' },
                ].map(({ Icon, label, val, href }) => (
                  <div className="contact__info-item" key={label}>
                    <div className="contact__info-icon"><Icon size={18} /></div>
                    <div>
                      <div className="contact__info-label">{label}</div>
                      {href
                        ? <a className="contact__info-val" href={href}>{val}</a>
                        : <div className="contact__info-val">{val}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form card */}
            <div className="contact__form-card">
              <div className="contact__form-header">
                <span className="contact__form-title">Envoyer un message</span>
                <span className="contact__form-note">Réponse garantie sous 24h</span>
              </div>
              <form className="contact__form" onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom</label>
                    <input className="form-input" name="name" value={form.name} onChange={onChange} placeholder="Votre nom" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" name="email" type="email" value={form.email} onChange={onChange} placeholder="votre@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone (optionnel)</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={onChange} placeholder="+212 6XX XXX XXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" name="message" value={form.message} onChange={onChange} placeholder="Décrivez votre projet ou votre besoin..." required />
                </div>
                <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Envoi en cours...' : <><Send size={16} /> Envoyer le message</>}
                </button>
                {status === 'success' && <p className="form-status-success">✓ Message envoyé ! Nous vous répondrons sous 24h.</p>}
                {status === 'error' && <p className="form-status-error">Une erreur est survenue. Veuillez réessayer ou nous appeler.</p>}
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer__bottom">
        <div className="footer__bottom-glow" />
        <div className="container">
          <div className="footer__grid">

            {/* Brand column */}
            <div className="footer__brand">
              <img src="/images/logo.png" alt="Sanifluide" className="footer__logo-img" />
              <p className="footer__desc">
                Expert en ventilation, climatisation, chauffage et protection incendie depuis plus de <strong>30 ans</strong>.
                Votre partenaire de confiance pour tous vos projets de génie climatique.
              </p>
              <div className="footer__tagline">
                <span className="footer__tagline-dot" />
                Tanger, Maroc — Depuis 1996
              </div>
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
                <a href="#" className="footer__social-link" aria-label="Facebook"><FacebookIcon /></a>
                <a href="https://www.instagram.com/sanifluide.maroc/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram"><InstagramIcon /></a>
                <a href="https://wa.me/212661986306" target="_blank" rel="noopener noreferrer" className="footer__social-link footer__social-link--wa" aria-label="WhatsApp"><WhatsAppIcon /></a>
              </div>
            </div>

            {/* Services column */}
            <div>
              <div className="footer__col-title">Services</div>
              <ul className="footer__links">
                {['Ventilation', 'Climatisation', 'Chauffage', 'Protection Incendie', 'Maintenance'].map(s => (
                  <li key={s}>
                    <a href="#services" onClick={e => { e.preventDefault(); go('#services') }}>
                      <span className="footer__link-arrow">→</span>{s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation column */}
            <div>
              <div className="footer__col-title">Navigation</div>
              <ul className="footer__links">
                {[['Accueil','#hero'],['À propos','#why-us'],['Réalisations','#projects'],['Contact','#contact']].map(([l,h]) => (
                  <li key={l}>
                    <a href={h} onClick={e => { e.preventDefault(); go(h) }}>
                      <span className="footer__link-arrow">→</span>{l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bar */}
          <div className="footer__bar">
            <div className="footer__bar-left">
              <span className="footer__bar-brand">Sanifluide Maroc</span>
              <span>© 2026 · Tous droits réservés.</span>
            </div>
            <div className="footer__bar-links">
              <a href="#">Mentions légales</a>
              <a href="#">Confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
