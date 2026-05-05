import { useEffect, useState, useCallback } from 'react'
import { Award, Zap, FileText, ShieldCheck, ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

const ITEMS = [
  { icon: <Award size={22} />, title: 'Expertise certifiée', text: 'Techniciens qualifiés RGE, habilités aux systèmes les plus exigeants.' },
  { icon: <Zap size={22} />, title: 'Réactivité garantie', text: 'Intervention sous 24h pour les urgences, 7 jours sur 7.' },
  { icon: <FileText size={22} />, title: 'Devis gratuit & transparent', text: 'Pas de mauvaises surprises — un devis clair avant chaque intervention.' },
  { icon: <ShieldCheck size={22} />, title: 'Garantie décennale', text: 'Nos installations couvertes et conformes aux normes en vigueur.' },
]

const IMGS = [
  'sanifluide Tetouan (2 of 114).jpg','sanifluide Tetouan (5 of 114).jpg',
  'sanifluide Tetouan (6 of 114).jpg','sanifluide Tetouan (8 of 114).jpg',
  'sanifluide Tetouan (9 of 114).jpg','sanifluide Tetouan (12 of 114).jpg',
  'sanifluide Tetouan (13 of 114).jpg','sanifluide Tetouan (14 of 114).jpg',
  'sanifluide Tetouan (15 of 114).jpg','sanifluide Tetouan (16 of 114).jpg',
  'sanifluide Tetouan (19 of 114).jpg','sanifluide Tetouan (21 of 114).jpg',
  'sanifluide Tetouan (22 of 114).jpg','sanifluide Tetouan (24 of 114).jpg',
  'sanifluide Tetouan (25 of 114).jpg','sanifluide Tetouan (26 of 114).jpg',
  'sanifluide Tetouan (27 of 114).jpg','sanifluide Tetouan (28 of 114).jpg',
  'sanifluide Tetouan (29 of 114).jpg','sanifluide Tetouan (30 of 114).jpg',
  'sanifluide Tetouan (31 of 114).jpg','sanifluide Tetouan (32 of 114).jpg',
  'sanifluide Tetouan (33 of 114).jpg','sanifluide Tetouan (34 of 114).jpg',
  'sanifluide Tetouan (35 of 114).jpg','sanifluide Tetouan (37 of 114).jpg',
  'sanifluide Tetouan (52 of 114).jpg','sanifluide Tetouan (60 of 114).jpg',
  'sanifluide Tetouan (62 of 114).jpg','sanifluide Tetouan (64 of 114).jpg',
  'sanifluide Tetouan (65 of 114).jpg','sanifluide Tetouan (66 of 114).jpg',
  'sanifluide Tetouan (67 of 114).jpg','sanifluide Tetouan (68 of 114).jpg',
  'sanifluide Tetouan (69 of 114).jpg','sanifluide Tetouan (70 of 114).jpg',
  'sanifluide Tetouan (71 of 114).jpg','sanifluide Tetouan (72 of 114).jpg',
  'sanifluide Tetouan (74 of 114).jpg','sanifluide Tetouan (75 of 114).jpg',
  'sanifluide Tetouan (76 of 114).jpg','sanifluide Tetouan (79 of 114).jpg',
  'sanifluide Tetouan (81 of 114).jpg','sanifluide Tetouan (83 of 114).jpg',
  'sanifluide Tetouan (84 of 114).jpg','sanifluide Tetouan (85 of 114).jpg',
  'sanifluide Tetouan (87 of 114).jpg','sanifluide Tetouan (90 of 114).jpg',
  'sanifluide Tetouan (91 of 114).jpg','sanifluide Tetouan (94 of 114).jpg',
  'sanifluide Tetouan (98 of 114).jpg','sanifluide Tetouan (99 of 114).jpg',
  'sanifluide Tetouan (100 of 114).jpg','sanifluide Tetouan (102 of 114).jpg',
  'sanifluide Tetouan (103 of 114).jpg','sanifluide Tetouan (106 of 114).jpg',
].map(f => `/images/All/${f}`)

export default function WhyUs() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [page, setPage] = useState(0)
  const total = IMGS.length
  const totalPages = Math.ceil(total / 4)

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setActive(i => (i + 1) % total), [total])

  // Auto-cycle image groups (paused on hover or when lightbox open)
  useEffect(() => {
    if (paused || lightbox) return
    const timer = setInterval(() => setPage(p => (p + 1) % totalPages), 3500)
    return () => clearInterval(timer)
  }, [paused, lightbox, totalPages])

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

          {/* Gallery column — bento mosaic */}
          <div
            className="whyus__gallery"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="whyus__gallery-row">
              <button
                className="whyus__garrow whyus__garrow--prev"
                onClick={() => setPage(p => (p - 1 + totalPages) % totalPages)}
                aria-label="Groupe précédent"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="whyus__gallery-grid">
              {[0, 1, 2, 3].map((offset) => {
                const idx = (page * 4 + offset) % total
                const isLast = offset === 3
                return (
                  <div
                    key={offset}
                    className="whyus__gallery-cell"
                    onClick={() => { setActive(idx); setLightbox(true) }}
                  >
                    <img
                      src={IMGS[idx]}
                      alt={`Réalisation Sanifluide ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="whyus__gallery-cell-overlay">
                      <Expand size={18} />
                    </div>
                    {isLast && (
                      <div className="whyus__gallery-more">
                        <span>+{total - 3}</span>
                        <small>photos</small>
                      </div>
                    )}
                  </div>
                )
              })}
              </div>

              {/* Next arrow */}
              <button
                className="whyus__garrow whyus__garrow--next"
                onClick={() => setPage(p => (p + 1) % totalPages)}
                aria-label="Groupe suivant"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Footer row */}
            <div className="whyus__gallery-footer">
              <div className="whyus__badge">
                <span className="whyus__badge-num">30</span>
                <span className="whyus__badge-text">ans d'expertise</span>
              </div>
              <div className="whyus__gallery-pages">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`whyus__gallery-dot ${i === page ? 'whyus__gallery-dot--active' : ''}`}
                    onClick={() => setPage(i)}
                    aria-label={`Groupe ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className="whyus__gallery-btn"
                onClick={() => { setActive(0); setLightbox(true) }}
              >
                <Expand size={14} />
                {total} réalisations
              </button>
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

