import { useEffect, useState, useCallback } from 'react'
import { Award, Zap, FileText, ShieldCheck, ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

const ITEMS = [
  { icon: <Award size={22} />, title: 'Expertise certifiée', text: 'Techniciens qualifiés RGE, habilités aux systèmes les plus exigeants.' },
  { icon: <Zap size={22} />, title: 'Réactivité garantie', text: 'Intervention sous 24h pour les urgences, 7 jours sur 7.' },
  { icon: <FileText size={22} />, title: 'Devis gratuit & transparent', text: 'Pas de mauvaises surprises — un devis clair avant chaque intervention.' },
  { icon: <ShieldCheck size={22} />, title: 'Garantie décennale', text: 'Nos installations couvertes et conformes aux normes en vigueur.' },
]

const IMGS = [
  'DSC00002.JPG','DSC00008.JPG','DSC00023.JPG','DSC00026.JPG','DSC00036.JPG',
  'DSC00045.JPG','DSC00092.JPG','DSC00102.JPG','DSC00109.JPG','DSC00111.JPG',
  'DSC00112.JPG','DSC00116.JPG','DSC00119.JPG','DSC00126.JPG','DSC00130.JPG',
  'DSC00138.JPG','DSC00146.JPG','DSC00147.JPG','DSC00150.JPG','DSC00151.JPG',
  'DSC00160.JPG','DSC00171.JPG','DSC00175.JPG','DSC00182.JPG',
  'DSC09464.JPG','DSC09469.JPG','DSC09475.JPG','DSC09484.JPG','DSC09485.JPG',
  'DSC09489.JPG','DSC09494.JPG','DSC09534.JPG','DSC09550.JPG','DSC09566.JPG',
  'DSC09567.JPG','DSC09571.JPG','DSC09576.JPG','DSC09580.JPG','DSC09596.JPG',
  'DSC09601.JPG','DSC09616.JPG','DSC09625.JPG',
  'sanifluide Tetouan (3 of 62).jpg','sanifluide Tetouan (4 of 62).jpg',
  'sanifluide Tetouan (6 of 62).jpg','sanifluide Tetouan (7 of 62).jpg',
  'sanifluide Tetouan (8 of 62).jpg','sanifluide Tetouan (9 of 62).jpg',
  'sanifluide Tetouan (10 of 62).jpg','sanifluide Tetouan (11 of 62).jpg',
  'sanifluide Tetouan (13 of 62).jpg','sanifluide Tetouan (14 of 62).jpg',
  'sanifluide Tetouan (16 of 62).jpg','sanifluide Tetouan (17 of 62).jpg',
  'sanifluide Tetouan (18 of 62).jpg','sanifluide Tetouan (19 of 62).jpg',
  'sanifluide Tetouan (20 of 62).jpg','sanifluide Tetouan (21 of 62).jpg',
  'sanifluide Tetouan (22 of 62).jpg','sanifluide Tetouan (23 of 62).jpg',
  'sanifluide Tetouan (24 of 62).jpg','sanifluide Tetouan (25 of 62).jpg',
  'sanifluide Tetouan (26 of 62).jpg','sanifluide Tetouan (27 of 62).jpg',
  'sanifluide Tetouan (28 of 62).jpg','sanifluide Tetouan (30 of 62).jpg',
  'sanifluide Tetouan (33 of 62).jpg','sanifluide Tetouan (34 of 62).jpg',
  'sanifluide Tetouan (35 of 62).jpg','sanifluide Tetouan (36 of 62).jpg',
  'sanifluide Tetouan (37 of 62).jpg','sanifluide Tetouan (38 of 62).jpg',
  'sanifluide Tetouan (40 of 62).jpg','sanifluide Tetouan (41 of 62).jpg',
  'sanifluide Tetouan (42 of 62).jpg','sanifluide Tetouan (43 of 62).jpg',
  'sanifluide Tetouan (44 of 62).jpg','sanifluide Tetouan (45 of 62).jpg',
  'sanifluide Tetouan (46 of 62).jpg','sanifluide Tetouan (47 of 62).jpg',
  'sanifluide Tetouan (48 of 62).jpg','sanifluide Tetouan (50 of 62).jpg',
  'sanifluide Tetouan (51 of 62).jpg','sanifluide Tetouan (52 of 62).jpg',
  'sanifluide Tetouan (53 of 62).jpg','sanifluide Tetouan (54 of 62).jpg',
  'sanifluide Tetouan (58 of 62).jpg','sanifluide Tetouan (59 of 62).jpg',
  'sanifluide Tetouan (61 of 62).jpg','sanifluide Tetouan (62 of 62).jpg',
].sort(() => Math.random() - 0.5)
 .map(f => `/images/All/${f}`)

export default function WhyUs() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const total = IMGS.length

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setActive(i => (i + 1) % total), [total])

  // Auto-play (paused on hover or when lightbox open)
  useEffect(() => {
    if (paused || lightbox) return
    const timer = setInterval(next, 3500)
    return () => clearInterval(timer)
  }, [paused, lightbox, next])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section className="whyus" id="why-us">
      <div className="container">
        <div className="whyus__inner">

          {/* Gallery column */}
          <div
            className="whyus__slideshow"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="whyus__slides">
              {/* Only render active ± 1 slides to keep DOM light */}
              {IMGS.map((src, i) => {
                const dist = Math.abs(i - active)
                if (dist > 1) return (
                  <div key={i} className="whyus__slide" aria-hidden="true" />
                )
                return (
                  <div
                    key={i}
                    className={`whyus__slide ${i === active ? 'whyus__slide--active' : ''}`}
                  >
                    <img
                      src={src}
                      alt={`Réalisation Sanifluide ${i + 1}`}
                      loading={i === active ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                )
              })}

              {/* Click-to-open overlay */}
              <button
                className="whyus__open-lightbox"
                onClick={() => setLightbox(true)}
                aria-label="Ouvrir la galerie"
              >
                <Expand size={18} />
                <span>Voir la galerie</span>
              </button>

              {/* Prev / Next arrows */}
              <button className="whyus__arrow whyus__arrow--prev" onClick={e => { e.stopPropagation(); prev() }} aria-label="Image précédente">
                <ChevronLeft size={20} />
              </button>
              <button className="whyus__arrow whyus__arrow--next" onClick={e => { e.stopPropagation(); next() }} aria-label="Image suivante">
                <ChevronRight size={20} />
              </button>

              {/* Counter */}
              <div className="whyus__counter">{active + 1} / {total}</div>
            </div>

            {/* Dot strip */}
            <div className="whyus__dots">
              {Array.from({ length: total }, (_, i) => {
                const dist = Math.abs(i - active)
                if (dist > 4) return null
                return (
                  <button
                    key={i}
                    className={`whyus__dot ${i === active ? 'whyus__dot--active' : ''} ${dist === 4 ? 'whyus__dot--far' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Image ${i + 1}`}
                  />
                )
              })}
            </div>

            <div className="whyus__badge">
              <span className="whyus__badge-num">30</span>
              <span className="whyus__badge-text">ans d'expertise</span>
            </div>
          </div>

          {/* Content column */}
          <div className="whyus__content">
            <div>
              <div className="tag">Pourquoi Sanifluide ?</div>
              <h2 className="section-title">
                Une équipe à votre<br /><span>service</span> depuis 1996
              </h2>
              <p className="whyus__text">
                Chez Sanifluide, chaque projet mérite une attention particulière.
                Nos techniciens certifiés interviennent rapidement et avec rigueur,
                du diagnostic jusqu'à la mise en service.
              </p>
            </div>
            <div className="whyus__grid">
              {ITEMS.map(item => (
                <div className="whyus__item" key={item.title}>
                  <div className="whyus__item-icon">{item.icon}</div>
                  <div>
                    <div className="whyus__item-title">{item.title}</div>
                    <div className="whyus__item-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          {/* Close */}
          <button className="lightbox__close" onClick={() => setLightbox(false)} aria-label="Fermer">
            <X size={22} />
          </button>

          {/* Counter */}
          <div className="lightbox__counter">{active + 1} / {total}</div>

          {/* Image */}
          <div className="lightbox__img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={IMGS[active]}
              alt={`Réalisation Sanifluide ${active + 1}`}
              className="lightbox__img"
              decoding="async"
            />
          </div>

          {/* Prev */}
          <button
            className="lightbox__arrow lightbox__arrow--prev"
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Image précédente"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next */}
          <button
            className="lightbox__arrow lightbox__arrow--next"
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Image suivante"
          >
            <ChevronRight size={28} />
          </button>

          {/* Thumbnail strip */}
          <div className="lightbox__thumbs" onClick={e => e.stopPropagation()}>
            {IMGS.map((src, i) => (
              <button
                key={i}
                className={`lightbox__thumb ${i === active ? 'lightbox__thumb--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Image ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

