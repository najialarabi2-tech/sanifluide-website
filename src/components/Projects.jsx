import { useState } from 'react'
import { Snowflake, Wind, ShieldAlert, Flame, Droplets, Thermometer, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

// 4 pages × 3 projects (1 large + 2 small per page)
const PAGES = [
  [
    {
      cls: 'project-card--lg',
      thumbImg: '/images/All/DSC00102.JPG',
      tag: 'Climatisation',
      num: '01',
      title: 'Triple Tower',
      location: 'Tanger, Maroc',
      text: 'Climatisation VRV multi-split pour les trois tours d\'un complexe résidentiel haut standing.',
      icon: <Snowflake size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC09484.JPG',
      tag: 'Ventilation',
      num: '02',
      title: 'Pinna',
      location: 'Tanger, Maroc',
      text: 'Système VMC double flux avec récupération de chaleur pour immeuble résidentiel.',
      icon: <Wind size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC09566.JPG',
      tag: 'Protection Incendie',
      num: '03',
      title: 'Iberia',
      location: 'Tanger, Maroc',
      text: 'Mise en conformité incendie : sprinklers, détection et désenfumage complet.',
      icon: <ShieldAlert size={20} />,
    },
  ],
  [
    {
      cls: 'project-card--lg',
      thumbImg: '/images/All/DSC09550.JPG',
      tag: 'Climatisation',
      num: '04',
      title: 'AAFFER Archipel',
      location: 'Tanger, Maroc',
      text: 'Climatisation centralisée et ventilation pour le complexe résidentiel Archipel.',
      icon: <Snowflake size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC00045.JPG',
      tag: 'Chauffage',
      num: '05',
      title: 'Showroom',
      location: 'Tanger, Maroc',
      text: 'Pompe à chaleur et plancher chauffant pour un showroom automobile de 1 500 m².',
      icon: <Flame size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC09596.JPG',
      tag: 'Ventilation',
      num: '06',
      title: 'Club House Gertit',
      location: 'Tanger, Maroc',
      text: 'Traitement d\'air et climatisation pour un club house de golf avec espaces VIP.',
      icon: <Wind size={20} />,
    },
  ],
  [
    {
      cls: 'project-card--lg',
      thumbImg: '/images/All/DSC09469.JPG',
      tag: 'Protection Incendie',
      num: '07',
      title: 'Prima Immobilier Villas',
      location: 'Tanger, Maroc',
      text: 'Réseau sprinkler et détection incendie pour un ensemble de villas haut de gamme.',
      icon: <ShieldAlert size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC00130.JPG',
      tag: 'Climatisation',
      num: '07b',
      title: 'Vila Amrani',
      location: 'Tanger, Maroc',
      text: 'Climatisation multi-split et chauffage par pompe à chaleur pour villa privée.',
      icon: <Snowflake size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC09616.JPG',
      tag: 'Chauffage',
      num: '08',
      title: 'Lear Usine',
      location: 'Tanger, Maroc',
      text: 'Chauffage industriel et ventilation pour unité de production Lear Corporation.',
      icon: <Thermometer size={20} />,
    },
  ],
  [
    {
      cls: 'project-card--lg',
      thumbImg: '/images/All/DSC00160.JPG',
      tag: 'Ventilation',
      num: '09',
      title: 'Immeuble Hassan',
      location: 'Tanger, Maroc',
      text: 'Ventilation et climatisation centralisée pour immeuble de bureaux et commerces.',
      icon: <Wind size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/DSC09534.JPG',
      tag: 'Protection Incendie',
      num: '10',
      title: 'Immeuble Charrat',
      location: 'Tanger, Maroc',
      text: 'Désenfumage et détection incendie pour immeuble résidentiel R+8.',
      icon: <ShieldAlert size={20} />,
    },
    {
      cls: 'project-card--sm',
      thumbImg: '/images/All/sanifluide Tetouan (2 of 114).jpg',
      tag: 'Climatisation',
      num: '11',
      title: 'Tetouan & Plateau Gessimo',
      location: 'Tétouan, Maroc',
      text: 'Climatisation et protection incendie pour deux résidences de standing à Tétouan.',
      icon: <Droplets size={20} />,
    },
  ],
]

export default function Projects() {
  const [page, setPage] = useState(0)
  const total = PAGES.length

  const prev = () => setPage(p => (p - 1 + total) % total)
  const next = () => setPage(p => (p + 1) % total)

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects__header">
          <div>
            <div className="tag">Nos réalisations</div>
            <h2 className="section-title">
              Quelques projets <span>récents</span>
            </h2>
          </div>
          <div className="projects__nav">
            <button className="projects__arrow" onClick={prev} aria-label="Précédent">
              <ChevronLeft size={20} />
            </button>
            <span className="projects__page-info">{page + 1} / {total}</span>
            <button className="projects__arrow" onClick={next} aria-label="Suivant">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="projects__grid" key={page}>
          {PAGES[page].map(p => (
            <div className={`project-card ${p.cls}`} key={p.num}>
              <img
                src={p.thumbImg}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="project-card__thumb-img"
              />
              <div className="project-card__overlay" />
              <div className="project-card__num">{p.num}</div>
              <div className="project-card__icon-badge">{p.icon}</div>
              <div className="project-card__body">
                <div className="project-card__tag">{p.tag}</div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__location"><MapPin size={11} style={{display:'inline',marginRight:'3px',verticalAlign:'middle'}} />{p.location}</p>
                <p className="project-card__text">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
