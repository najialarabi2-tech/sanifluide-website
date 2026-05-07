import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Wind, Snowflake, Flame, ShieldAlert, X, CheckCircle2 } from 'lucide-react'

const SERVICES = [
  {
    num: '01',
    icon: <Wind size={26} />,
    iconLg: <Wind size={40} />,
    title: 'Ventilation',
    text: 'VMC simple et double flux, ventilation industrielle et tertiaire. Qualité d\'air optimale pour chaque espace.',
    details: {
      intro: 'Un air sain est la base du confort et de la santé. Sanifluide conçoit et installe des systèmes de ventilation adaptés à chaque usage, du logement individuel aux grandes surfaces industrielles.',
      points: [
        'VMC simple flux hygroréglable (A & B)',
        'VMC double flux avec échangeur de chaleur',
        'Ventilation industrielle et tertiaire',
        'Désenfumage et ventilation de secours',
        'Récupération d\'énergie jusqu\'à 90 %',
        'Maintenance préventive et curative',
      ],
      footer: 'Nos systèmes sont conformes aux normes RT 2020 et RE2025.',
    },
  },
  {
    num: '02',
    icon: <Snowflake size={26} />,
    iconLg: <Snowflake size={40} />,
    title: 'Climatisation',
    text: 'Systèmes split, VRV/VRF et climatisation centralisée. Confort thermique garanti toute l\'année.',
    details: {
      intro: 'Du simple split mural à la climatisation VRV centralisée pour des centaines de pièces, Sanifluide propose des solutions thermiques sur mesure pour tout type de bâtiment.',
      points: [
        'Climatiseurs split et multi-split',
        'Systèmes VRV / VRF Daikin, Mitsubishi, LG',
        'Climatisation centralisée avec BMS',
        'Précision cooling pour salles serveurs',
        'Pompes à chaleur air-air réversibles',
        'Études thermiques et dimensionnement',
      ],
      footer: 'Nous sommes partenaires agréés des grandes marques du secteur.',
    },
  },
  {
    num: '03',
    icon: <Flame size={26} />,
    iconLg: <Flame size={40} />,
    title: 'Chauffage',
    text: 'Chaudières gaz, pompes à chaleur, planchers chauffants. Performance énergétique maximale.',
    details: {
      intro: 'Le chauffage représente le premier poste de consommation énergétique d\'un bâtiment. Sanifluide vous propose des solutions performantes et économiques pour chaque usage.',
      points: [
        'Chaudières à condensation gaz & fuel',
        'Pompes à chaleur air-eau et géothermiques',
        'Planchers chauffants basse température',
        'Radiateurs à eau et convecteurs',
        'Chauffage solaire combiné',
        'Régulation et domotique thermique',
      ],
      footer: 'Économisez jusqu\'à 40 % sur votre facture de chauffage avec nos solutions.',
    },
  },
  {
    num: '04',
    icon: <ShieldAlert size={26} />,
    iconLg: <ShieldAlert size={40} />,
    title: 'Protection Incendie',
    text: 'Détection, sprinklers, désenfumage, extinction. Mise en conformité totale de vos bâtiments.',
    details: {
      intro: 'La sécurité incendie est une obligation réglementaire. Sanifluide accompagne les maîtres d\'ouvrage de la conception à la mise en service, en passant par les études et la certification.',
      points: [
        'Systèmes de détection incendie (SDI/SSI)',
        'Réseaux sprinklers et RIA',
        'Désenfumage naturel et mécanique',
        'Extincteurs et colonnes sèches',
        'Portes coupe-feu et clapets',
        'Audits réglementaires et mise en conformité',
      ],
      footer: 'Agréés par les autorités compétentes au Maroc pour tous les ERP.',
    },
  },
]

function ServiceModal({ service, onClose }) {
  if (!service) return null
  return (
    <div className="svc-modal-backdrop" onClick={onClose}>
      <div className="svc-modal" onClick={e => e.stopPropagation()}>
        <button className="svc-modal__close" onClick={onClose} aria-label="Fermer"><X size={20} /></button>
        <div className="svc-modal__header">
          <div className="svc-modal__icon">{service.iconLg}</div>
          <div>
            <div className="svc-modal__num">{service.num}</div>
            <h3 className="svc-modal__title">{service.title}</h3>
          </div>
        </div>
        <p className="svc-modal__intro">{service.details.intro}</p>
        <ul className="svc-modal__list">
          {service.details.points.map((pt, i) => (
            <li key={i} className="svc-modal__item">
              <CheckCircle2 size={16} className="svc-modal__check" />
              {pt}
            </li>
          ))}
        </ul>
        <div className="svc-modal__footer-note">{service.details.footer}</div>
        <a
          href="https://wa.me/212661986306?text=Bonjour%20Sanifluide%2C%20je%20voudrais%20un%20devis%20pour%20votre%20service%20de%20"
          target="_blank"
          rel="noopener noreferrer"
          className="svc-modal__cta"
        >
          Demander un devis gratuit →
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const ref = useReveal()
  const [active, setActive] = useState(null)

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
              <span className="service-card__arrow" onClick={() => setActive(s)} style={{ cursor: 'pointer' }}>
                En savoir plus <span>→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  )
}
