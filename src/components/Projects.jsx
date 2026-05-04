import { useReveal } from '../hooks/useReveal'
import { Snowflake, Wind, ShieldAlert, Flame, MapPin } from 'lucide-react'

const PROJECTS = [
  {
    cls: 'project-card--lg',
    thumbImg: '/images/All/DSC00102.JPG',
    tag: 'Climatisation',
    num: '01',
    title: 'Immeuble de bureaux',
    location: 'Tanger, Maroc',
    text: 'Installation d\'un système VRV multi-split pour 800 m² de bureaux open space.',
    icon: <Snowflake size={20} />,
  },
  {
    cls: 'project-card--sm',
    thumbImg: '/images/All/DSC09484.JPG',
    tag: 'Ventilation',
    num: '02',
    title: 'Restaurant gastronomique',
    location: 'Casablanca, Maroc',
    text: 'VMC double flux avec récupération de chaleur pour une cuisine professionnelle.',
    icon: <Wind size={20} />,
  },
  {
    cls: 'project-card--sm',
    thumbImg: '/images/All/DSC09566.JPG',
    tag: 'Protection Incendie',
    num: '03',
    title: 'Entrepôt logistique',
    location: 'Rabat, Maroc',
    text: 'Mise en conformité incendie complète : sprinklers, détection et désenfumage sur 5 000 m².',
    icon: <ShieldAlert size={20} />,
  },
  {
    cls: 'project-card--sm',
    thumbImg: '/images/All/DSC00045.JPG',
    tag: 'Chauffage',
    num: '04',
    title: 'Résidence haut standing',
    location: 'Marrakech, Maroc',
    text: 'Système de chauffage central par pompe à chaleur pour une résidence de 2 000 m².',
    icon: <Flame size={20} />,
  },
]

export default function Projects() {
  const ref = useReveal()

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
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Voir tous les projets →
          </button>
        </div>
        <div className="projects__grid" ref={ref}>
          {PROJECTS.map(p => (
            <div className={`project-card reveal ${p.cls}`} key={p.title}>
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
                <span className="project-card__cta">Voir le projet →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
