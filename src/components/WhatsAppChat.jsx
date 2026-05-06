import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.5a.5.5 0 0 0 .613.612l5.701-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.42l-.368-.216-3.813.978.999-3.735-.239-.382A9.945 9.945 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const MESSAGES = [
  { from: 'agent', text: 'Bonjour 👋 Bienvenue chez Sanifluide Maroc !', delay: 0 },
  { from: 'agent', text: 'Je suis disponible pour répondre à toutes vos questions sur nos services de climatisation, ventilation, chauffage ou protection incendie.', delay: 800 },
  { from: 'agent', text: 'Comment puis-je vous aider aujourd\'hui ? 😊', delay: 1600 },
]

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState([])
  const [pulsed, setPulsed] = useState(false)

  // Auto-pulse the button after 4s to grab attention
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 4000)
    return () => clearTimeout(t)
  }, [])

  // Animate messages in sequentially when chat opens
  useEffect(() => {
    if (!open) return
    setVisible([])
    MESSAGES.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), MESSAGES[i].delay + 300)
    })
  }, [open])

  const openWhatsApp = () => {
    window.open('https://wa.me/212661986306?text=Bonjour%20Sanifluide%2C%20je%20voudrais%20avoir%20plus%20d\'informations%20sur%20vos%20services.', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="wachat">
      {/* Chatbox */}
      {open && (
        <div className="wachat__box">
          {/* Header */}
          <div className="wachat__header">
            <div className="wachat__avatar">
              <img src="/images/logo.png" alt="Sanifluide" />
              <span className="wachat__status" />
            </div>
            <div className="wachat__info">
              <div className="wachat__name">Sanifluide Maroc</div>
              <div className="wachat__online">● En ligne</div>
            </div>
            <button className="wachat__close" onClick={() => setOpen(false)} aria-label="Fermer">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="wachat__messages">
            <div className="wachat__date">Aujourd'hui</div>
            {MESSAGES.map((msg, i) => (
              <div
                key={i}
                className={`wachat__msg ${visible.includes(i) ? 'wachat__msg--visible' : ''}`}
              >
                {msg.text}
                <span className="wachat__tick">✓✓</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="wachat__footer">
            <button className="wachat__cta" onClick={openWhatsApp}>
              <WhatsAppIcon />
              Répondre sur WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className={`wachat__fab ${pulsed ? 'wachat__fab--pulse' : ''} ${open ? 'wachat__fab--open' : ''}`}
        onClick={() => { setOpen(o => !o); setPulsed(false) }}
        aria-label="Ouvrir WhatsApp"
      >
        <WhatsAppIcon />
        {!open && <span className="wachat__fab-label">Chat</span>}
      </button>
    </div>
  )
}
