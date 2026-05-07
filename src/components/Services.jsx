import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Wind, Snowflake, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react'

const SERVICES = [
  {
    num: '01',
    icon: <Wind size={22} />,
    iconLg: <Wind size={34} />,
    iconXl: <Wind size={220} />,
    title: 'Ventilation',
    sub: 'VMC simple & double flux',
    stat: { value: '90%', label: 'd\'énergie récupérée' },
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
    icon: <Snowflake size={22} />,
    iconLg: <Snowflake size={34} />,
    iconXl: <Snowflake size={220} />,
    title: 'Climatisation',
    sub: 'VRV / VRF & centralisé',
    stat: { value: '12+', label: 'marques partenaires' },
    details: {
      intro: 'Du simple split mural à la climatisation VRV centralisée pour des centaines de pièces, Sanifluide propose des solutions thermiques sur mesure pour tout type de bâtiment.',
      points: [
        'Climatiseurs split et multi-split',
        'Systèmes VRV / VRF Daikin, Carrier, LG',
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
    icon: <Flame size={22} />,
    iconLg: <Flame size={34} />,
    iconXl: <Flame size={220} />,
    title: 'Chauffage',
    sub: 'PAC, chaudières & plancher',
    stat: { value: '40%', label: 'd\'économie sur la facture' },
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
    icon: <ShieldAlert size={22} />,
    iconLg: <ShieldAlert size={34} />,
    iconXl: <ShieldAlert size={220} />,
    title: 'Protection Incendie',
    sub: 'Détection, sprinklers & SSI',
    stat: { value: '100%', label: 'mise en conformité' },
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

export default function Services() {
  const ref = useReveal()
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)
  const resumeTimerRef = useRef(null)

  // Auto-cycle every 5 s; pauses when user interacts
  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive(a => (a + 1) % SERVICES.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const handleSelect = (i) => {
    setActive(i)
    pausedRef.current = true
    clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => { pausedRef.current = false }, 12000)
  }

  const svc = SERVICES[active]

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__header" ref={ref}>
          <div>
            <div className="tag">Ce que nous faisons</div>
            <h2 className="section-title">
              Des solutions complètes<br />
              <span className="svc-underline">
                pour chaque besoin
                <svg className="svc-underline__svg" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 8 Q75 2 150 7 Q225 12 298 5" stroke="var(--orange)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
          </div>
          <p className="section-sub">
            De la conception à la maintenance, nous couvrons l'intégralité de vos
            projets de génie climatique et de sécurité incendie.
          </p>
        </div>

        <div
          className="services__explorer"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => {
            clearTimeout(resumeTimerRef.current)
            resumeTimerRef.current = setTimeout(() => { pausedRef.current = false }, 3000)
          }}
        >
          {/* Left: tab list */}
          <div className="services__tabs">
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className={`svc-tab${active === i ? ' svc-tab--active' : ''}`}
                onClick={() => handleSelect(i)}
                onMouseEnter={() => handleSelect(i)}
              >
                <div className="svc-tab__num">{s.num}</div>
                <div className="svc-tab__icon">{s.icon}</div>
                <div className="svc-tab__info">
                  <div className="svc-tab__title">{s.title}</div>
                  <div className="svc-tab__sub">{s.sub}</div>
                </div>
                {active === i && <div className="svc-tab__bar" />}
              </div>
            ))}
          </div>

          {/* Right: animated detail panel */}
          <div className="services__panel" key={active}>
            <div className="svc-panel__header">
              <div className="svc-panel__icon">{svc.iconLg}</div>
              <div>
                <div className="svc-panel__num">{svc.num}</div>
                <h3 className="svc-panel__title">{svc.title}</h3>
              </div>
              {svc.stat && (
                <div className="svc-panel__stat">
                  <span className="svc-panel__stat-value">{svc.stat.value}</span>
                  <span className="svc-panel__stat-label">{svc.stat.label}</span>
                </div>
              )}
            </div>
            <p className="svc-panel__intro">{svc.details.intro}</p>
            <ul className="svc-panel__points">
              {svc.details.points.map((pt, i) => (
                <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                  <CheckCircle2 size={15} />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="svc-panel__footer">{svc.details.footer}</div>
            <div className="svc-panel__watermark" aria-hidden="true">{svc.iconXl}</div>
            <a
              href={`https://wa.me/212661986306?text=Bonjour%20Sanifluide%2C%20je%20voudrais%20un%20devis%20pour%20votre%20service%20de%20${encodeURIComponent(svc.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-panel__cta"
            >
              Demander un devis — {svc.title} →
            </a>
          </div>
        </div>
        <div className="services__projects-link">
          <button
            className="services__projects-btn"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Voir nos projets récents ↓
          </button>
        </div>
      </div>
    </section>
  )
}
