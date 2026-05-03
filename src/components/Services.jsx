import { useReveal } from '../hooks/useReveal'
import { Wind, Snowflake, Flame, ShieldAlert } from 'lucide-react'

const SERVICES = [
  {
    num: '01',
    icon: <Wind size={26} />,
    title: 'Ventilation',
    text: 'VMC simple et double flux, ventilation industrielle et tertiaire. Qualité d\'air optimale pour chaque espace.',
  },
  {
    num: '02',
    icon: <Snowflake size={26} />,
    title: 'Climatisation',
    text: 'Systèmes split, VRV/VRF et climatisation centralisée. Confort thermique garanti toute l\'année.',
  },
  {
    num: '03',
    icon: <Flame size={26} />,
    title: 'Chauffage',
    text: 'Chaudières gaz, pompes à chaleur, planchers chauffants. Performance énergétique maximale.',
  },
  {
    num: '04',
    icon: <ShieldAlert size={26} />,
    title: 'Protection Incendie',
    text: 'Détection, sprinklers, désenfumage, extinction. Mise en conformité totale de vos bâtiments.',
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__header">
          <div>
            <div className="tag">Ce que nous faisons</div>
            <h2 className="section-title">
              Des solutions complètes<br /><span>pour chaque besoin</span>
            </h2>
          </div>
          <p className="section-sub">
            De la conception à la maintenance, nous couvrons l'intégralité de vos
            projets de génie climatique et de sécurité incendie.
          </p>
        </div>
        <div className="services__grid" ref={ref}>
          {SERVICES.map(s => (
            <div className="service-card reveal" key={s.num}>
              <div className="service-card__num">{s.num}</div>
              <div className="service-card__icon">{s.icon}</div>
              <div className="service-card__body">
                <div className="service-card__title">{s.title}</div>
                <p className="service-card__text">{s.text}</p>
              </div>
              <span
                className="service-card__arrow"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ cursor: 'pointer' }}
              >
                En savoir plus <span>→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
