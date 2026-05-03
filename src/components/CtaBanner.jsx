import { Phone, CheckCircle2 } from 'lucide-react'

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.5a.5.5 0 0 0 .613.612l5.701-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.42l-.368-.216-3.813.978.999-3.735-.239-.382A9.945 9.945 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export default function CtaBanner() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="cta">
      {/* Decorative background elements */}
      <div className="cta__bg-circle cta__bg-circle--1" />
      <div className="cta__bg-circle cta__bg-circle--2" />
      <div className="cta__bg-line" />

      <div className="container">
        <div className="cta__card">
          {/* Left: text */}
          <div className="cta__left">
            <div className="cta__eyebrow">
              <span className="cta__eyebrow-dot" />
              Disponible 7j/7
            </div>
            <h2 className="cta__title">
              Un projet en tête ?<br />
              <span>Parlons-en.</span>
            </h2>
            <p className="cta__sub">
              Notre équipe vous répond dans les <strong>24h</strong> et vous propose
              un devis détaillé, sans engagement.
            </p>
            <div className="cta__trust">
              <span><CheckCircle2 size={13} /> Gratuit</span>
              <span><CheckCircle2 size={13} /> Sans engagement</span>
              <span><CheckCircle2 size={13} /> Réponse rapide</span>
            </div>
          </div>

          {/* Divider */}
          <div className="cta__divider" />

          {/* Right: actions */}
          <div className="cta__right">
            <div className="cta__actions">
              <button className="btn btn-primary cta__btn-main" onClick={() => go('#contact')}>
                Demander un devis gratuit →
              </button>
              <a href="tel:+212661986306" className="cta__call">
                <div className="cta__call-icon"><Phone size={18} /></div>
                <div>
                  <div className="cta__call-label">Appelez-nous directement</div>
                  <div className="cta__call-num">+212 661 986 306</div>
                </div>
              </a>
              <a href="https://wa.me/212661986306" target="_blank" rel="noopener noreferrer" className="cta__call cta__call--wa">
                <div className="cta__call-icon cta__call-icon--wa"><WhatsAppIcon /></div>
                <div>
                  <div className="cta__call-label">Contactez-nous sur</div>
                  <div className="cta__call-num">WhatsApp</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
