import { useState, useRef } from 'react'
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
    faq: [
      { q: 'La VMC est-elle obligatoire dans les bâtiments au Maroc ?', a: 'Oui, la ventilation mécanique est obligatoire dans les ERP et bâtiments de plusieurs niveaux selon la réglementation marocaine. Sanifluide vous accompagne dans la mise en conformité complète.' },
      { q: 'Quelle VMC choisir pour un immeuble résidentiel ?', a: 'Pour un immeuble résidentiel, la VMC double flux avec récupération de chaleur est la solution la plus performante : elle assure un air sain tout en récupérant jusqu\'à 90 % de l\'énergie thermique.' },
      { q: 'Combien de temps prend une installation VMC ?', a: 'Pour un bâtiment résidentiel standard, une installation VMC double flux prend entre 2 et 5 jours selon la surface. Sanifluide fournit un planning détaillé avant tout démarrage de chantier.' },
      { q: 'Sanifluide assure-t-il la maintenance après installation ?', a: 'Oui, Sanifluide propose des contrats de maintenance préventive et curative pour tous les systèmes VMC installés, avec des visites planifiées et un service d\'urgence 7j/7.' },
      { q: 'Intervenez-vous sur toute la région nord du Maroc ?', a: 'Oui, Sanifluide intervient à Tanger, Tétouan, Larache, Assilah, Fnideq et dans l\'ensemble de la région Tanger-Tétouan-Al Hoceïma, ainsi que sur les grands projets nationaux.' },
    ],
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
    faq: [
      { q: 'VRV ou multi-split : quelle solution choisir pour mon bâtiment ?', a: 'Le système VRV est idéal pour les grands bâtiments (hôtels, immeubles de bureaux) car il permet de gérer des dizaines de pièces depuis une seule unité extérieure. Le multi-split convient mieux aux espaces de taille moyenne.' },
      { q: 'Quelles marques de climatisation installez-vous au Maroc ?', a: 'Sanifluide est partenaire agréé de plus de 12 marques, dont Daikin, Carrier, LG, Mitsubishi Electric et Fujitsu. Nous sélectionnons la marque la plus adaptée à votre projet et à votre budget.' },
      { q: 'Est-il possible de piloter la climatisation à distance ?', a: 'Oui, Sanifluide propose des solutions de gestion centralisée BMS (Building Management System) permettant de contrôler et programmer l\'ensemble de vos équipements à distance depuis un smartphone ou une tablette.' },
      { q: 'Proposez-vous des études thermiques avant installation ?', a: 'Oui, Sanifluide réalise des études thermiques complètes et des calculs de charges thermiques pour dimensionner précisément vos équipements et optimiser votre consommation énergétique.' },
      { q: 'Quelle est la durée de vie d\'un système VRV correctement entretenu ?', a: 'Un système VRV bien entretenu a une durée de vie de 15 à 20 ans. Sanifluide propose des contrats de maintenance préventive annuelle pour garantir la longévité et la performance de vos installations.' },
    ],
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
    faq: [
      { q: 'Une pompe à chaleur est-elle adaptée au climat marocain ?', a: 'Oui, la pompe à chaleur air-eau est parfaitement adaptée au climat marocain. Elle est efficace jusqu\'à -10°C et offre un coefficient de performance (COP) de 3 à 4, ce qui signifie 3 à 4 kWh produits pour 1 kWh consommé.' },
      { q: 'Quelle économie réalise-t-on avec une chaudière à condensation ?', a: 'Une chaudière à condensation consomme jusqu\'à 20 à 30 % de moins qu\'une chaudière classique. Combinée à un plancher chauffant basse température, l\'économie peut atteindre 40 % sur votre facture annuelle.' },
      { q: 'Qu\'est-ce que le plancher chauffant basse température ?', a: 'Le plancher chauffant basse température diffuse la chaleur uniformément depuis le sol. Il fonctionne à 35-45°C (vs 70°C pour les radiateurs classiques), ce qui le rend idéal avec une PAC et réduit la consommation énergétique.' },
      { q: 'Proposez-vous des études thermiques gratuites ?', a: 'Oui, Sanifluide réalise des études thermiques préliminaires gratuites pour dimensionner correctement votre système de chauffage et vous proposer la solution la plus économique à court et long terme.' },
      { q: 'Peut-on combiner chauffage solaire et chaudière au Maroc ?', a: 'Absolument. Le Maroc bénéficie d\'un ensoleillement exceptionnel. Sanifluide installe des systèmes de chauffage solaire combiné qui couvrent 40 à 70 % des besoins annuels en eau chaude sanitaire et en chauffage.' },
    ],
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
    faq: [
      { q: 'Qui est soumis à l\'obligation de protection incendie au Maroc ?', a: 'Tous les Établissements Recevant du Public (ERP) : hôtels, centres commerciaux, établissements scolaires, hôpitaux, administrations... ainsi que les immeubles de grande hauteur (IGH) sont soumis à une réglementation stricte en matière de protection incendie.' },
      { q: 'Qu\'est-ce qu\'un système SSI et est-il obligatoire ?', a: 'Le Système de Sécurité Incendie (SSI) comprend la détection automatique, les alarmes, et le désenfumage. Il est obligatoire dans tous les ERP de catégories 1 à 4 au Maroc selon le type d\'établissement.' },
      { q: 'Sanifluide est-il agréé pour les ERP au Maroc ?', a: 'Oui, Sanifluide dispose des agréments nécessaires pour réaliser et certifier les installations de protection incendie dans les ERP au Maroc. Nos dossiers techniques sont conformes aux exigences des autorités compétentes.' },
      { q: 'À quelle fréquence faut-il tester les systèmes incendie ?', a: 'La réglementation marocaine impose des tests périodiques : vérification mensuelle des alarmes, contrôle annuel complet par un organisme agréé. Sanifluide propose des contrats de maintenance annuelle pour vous assurer la conformité permanente.' },
      { q: 'Qu\'est-ce que la mise en conformité incendie comprend ?', a: 'La mise en conformité comprend un audit de l\'existant, la rédaction d\'un rapport et d\'un plan d\'action, l\'installation ou la mise à jour des équipements (SSI, sprinklers, désenfumage), et la délivrance d\'une attestation de conformité.' },
    ],
  },
]

export default function Services() {
  const ref = useReveal()
  const [active, setActive] = useState(0)
  const faqRef = useRef(null)

  const handleSelect = (i) => {
    setActive(i)
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

        <div className="services__explorer">
          {/* Left: tab list */}
          <div className="services__tabs">
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className={`svc-tab${active === i ? ' svc-tab--active' : ''}`}
                onClick={() => handleSelect(i)}
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

        {/* FAQ section — SEO rich content, changes with active service tab */}
        <div className="services__faq" aria-label={`Questions fréquentes — ${svc.title}`} ref={faqRef}>
          <h3 className="services__faq-title">
            Questions fréquentes — <span>{svc.title}</span>
          </h3>
          <div className="services__faq-list">
            {svc.faq.map((item, i) => (
              <details key={i} className="services__faq-item">
                <summary className="services__faq-q">{item.q}</summary>
                <p className="services__faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
