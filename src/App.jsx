import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import Projects from './components/Projects'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import Particles from './components/Particles'
import WhatsAppChat from './components/WhatsAppChat'

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ─── useSEO hook — updates <head> per page ─── */
function useSEO({ title, description, canonical, schemaList = [] }) {
  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    }
    document.title = title
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) descEl.setAttribute('content', description)
    const canonEl = document.querySelector('link[rel="canonical"]')
    if (canonEl) canonEl.setAttribute('href', canonical)

    const injected = schemaList.map((schema) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.textContent = JSON.stringify(schema)
      s.setAttribute('data-seo-injected', '1')
      document.head.appendChild(s)
      return s
    })

    return () => {
      document.title = prev.title
      if (descEl) descEl.setAttribute('content', prev.desc || '')
      if (canonEl) canonEl.setAttribute('href', prev.canonical || '')
      injected.forEach((s) => s.remove())
    }
  }, [title, description, canonical])
}

/* ─── Service page layout ─── */
function ServicePage({ config }) {
  useSEO({
    title: config.seoTitle,
    description: config.seoDesc,
    canonical: `https://www.sanifluide.com${config.path}`,
    schemaList: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: config.name,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Sanifluide Maroc',
          url: 'https://www.sanifluide.com',
          address: { '@type': 'PostalAddress', addressLocality: 'Tanger', addressCountry: 'MA' },
        },
        areaServed: ['Tanger', 'Casablanca', 'Rabat', 'Tétouan', 'Maroc'],
        description: config.seoDesc,
        url: `https://www.sanifluide.com${config.path}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  })

  return (
    <main className="svcpage">
      {/* Breadcrumb */}
      <nav className="svcpage__breadcrumb" aria-label="Fil d'Ariane">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemProp="item" to="/"><span itemProp="name">Accueil</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemProp="item" to="/#services"><span itemProp="name">Services</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{config.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="svcpage__hero" style={{ '--svc-color': config.color }}>
        <div className="svcpage__hero-inner">
          <span className="svcpage__tag">{config.tag}</span>
          <h1 className="svcpage__h1">{config.h1}</h1>
          <p className="svcpage__intro">{config.intro}</p>
          <div className="svcpage__hero-stats">
            <div><strong>+28 ans</strong><span>d'expérience</span></div>
            <div><strong>500+</strong><span>projets livrés</span></div>
            <div><strong>4 villes</strong><span>couvertes</span></div>
          </div>
          <div className="svcpage__hero-cta">
            <a href="/contact" className="svcpage__btn-primary">Demander un devis gratuit</a>
            <a href="tel:+212539000000" className="svcpage__btn-secondary">Appeler maintenant</a>
          </div>
        </div>
      </header>

      {/* Sub-services */}
      <section className="svcpage__sub" aria-labelledby="sub-title">
        <div className="svcpage__container">
          <h2 id="sub-title" className="svcpage__section-title">Nos prestations {config.name}</h2>
          <div className="svcpage__sub-grid">
            {config.subServices.map((s) => (
              <article key={s.title} className="svcpage__sub-card">
                <div className="svcpage__sub-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sanifluide */}
      <section className="svcpage__why" aria-labelledby="why-title">
        <div className="svcpage__container">
          <h2 id="why-title" className="svcpage__section-title">Pourquoi choisir Sanifluide ?</h2>
          <div className="svcpage__why-grid">
            {[
              { icon: '🏆', title: '+28 ans d\'expérience', desc: 'Depuis 1996, nous réalisons des installations de génie climatique au Maroc.' },
              { icon: '📋', title: 'Étude technique offerte', desc: 'Chaque projet commence par une analyse gratuite de vos besoins.' },
              { icon: '⚡', title: 'Respect des délais', desc: 'Planning rigoureux pour livrer vos installations à temps.' },
              { icon: '🔧', title: 'SAV réactif', desc: 'Contrats de maintenance et intervention rapide partout au Maroc.' },
            ].map((w) => (
              <div key={w.title} className="svcpage__why-card">
                <span className="svcpage__why-icon" aria-hidden="true">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="svcpage__process" aria-labelledby="process-title">
        <div className="svcpage__container">
          <h2 id="process-title" className="svcpage__section-title">Notre méthode de travail</h2>
          <ol className="svcpage__steps">
            {['Étude & audit de vos besoins', 'Conception & dimensionnement', 'Installation & mise en service', 'Réception & contrat de maintenance'].map((step, i) => (
              <li key={step} className="svcpage__step">
                <span className="svcpage__step-num" aria-hidden="true">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Zones */}
      <section className="svcpage__zones" aria-labelledby="zones-title">
        <div className="svcpage__container">
          <h2 id="zones-title" className="svcpage__section-title">Zones d'intervention — {config.name}</h2>
          <ul className="svcpage__zones-list">
            {['Tanger', 'Casablanca', 'Rabat', 'Tétouan', 'Fnideq', 'M\'diq', 'Larache', 'Kénitra'].map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="svcpage__faq" aria-labelledby="faq-title">
        <div className="svcpage__container">
          <h2 id="faq-title" className="svcpage__section-title">Questions fréquentes — {config.name}</h2>
          <div className="svcpage__faq-list">
            {config.faq.map((f) => (
              <details key={f.q} className="svcpage__faq-item">
                <summary className="svcpage__faq-q">{f.q}</summary>
                <p className="svcpage__faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="svcpage__related" aria-labelledby="related-title">
        <div className="svcpage__container">
          <h2 id="related-title" className="svcpage__section-title">Nos autres services</h2>
          <div className="svcpage__related-grid">
            {config.related.map((r) => (
              <Link key={r.path} to={r.path} className="svcpage__related-card">
                <span aria-hidden="true">{r.icon}</span>
                <strong>{r.name}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="svcpage__cta">
        <div className="svcpage__container">
          <h2>Prêt à démarrer votre projet {config.name} ?</h2>
          <p>Contactez Sanifluide Maroc pour un devis gratuit sous 24h.</p>
          <a href="/contact" className="svcpage__btn-primary">Demander un devis</a>
        </div>
      </section>
    </main>
  )
}

/* ─── Service configs ─── */
const RELATED_ALL = [
  { path: '/services/ventilation-vmc/', name: 'Ventilation VMC', icon: '💨' },
  { path: '/services/climatisation-vrv/', name: 'Climatisation VRV', icon: '❄️' },
  { path: '/services/chauffage-pac/', name: 'Chauffage PAC', icon: '🔥' },
  { path: '/services/protection-incendie/', name: 'Sécurité Incendie', icon: '🚨' },
]

const VENTILATION_CONFIG = {
  path: '/services/ventilation-vmc/',
  name: 'Ventilation VMC',
  tag: 'Ventilation & Traitement d\'air',
  color: '#0ea5e9',
  seoTitle: 'Ventilation VMC au Maroc — Installation & Maintenance | Sanifluide',
  seoDesc: 'Sanifluide installe vos systèmes de ventilation VMC, CTA et traitement d\'air au Maroc depuis 1996. Devis gratuit à Tanger, Casablanca, Rabat.',
  h1: 'Ventilation & VMC au Maroc — Expert en traitement d\'air',
  intro: 'Sanifluide conçoit et installe vos systèmes de ventilation mécanique contrôlée (VMC), centrales de traitement d\'air (CTA) et solutions de désenfumage pour tous types de bâtiments au Maroc.',
  subServices: [
    { icon: '💨', title: 'VMC Simple & Double Flux', desc: 'Renouvellement d\'air constant et récupération de chaleur.', points: ['Étude des débits réglementaires', 'Installation gaines et bouches', 'Équilibrage et réglage'] },
    { icon: '🏭', title: 'Centrale de Traitement d\'Air (CTA)', desc: 'Contrôle de la qualité d\'air en milieu industriel et tertiaire.', points: ['Filtration HEPA / EU9', 'Régulation température et hygrométrie', 'Maintenance préventive'] },
    { icon: '🔥', title: 'Désenfumage', desc: 'Systèmes de désenfumage naturel et mécanique conformes aux normes.', points: ['Exutoires de fumée', 'Volets de désenfumage', 'Conformité NF EN 12101'] },
    { icon: '🌿', title: 'Traitement de l\'air neuf', desc: 'Amélioration de la qualité de l\'air intérieur (QAI).', points: ['Analyse qualité de l\'air', 'Récupérateurs de chaleur', 'Systèmes DCV (débit variable)'] },
  ],
  faq: [
    { q: 'Quelle est la différence entre VMC simple flux et double flux ?', a: 'La VMC simple flux extrait l\'air vicié. La double flux extrait l\'air vicié ET insuffle de l\'air neuf filtré en récupérant la chaleur, réduisant les pertes thermiques de 70 à 90 %.' },
    { q: 'Combien coûte l\'installation d\'une VMC au Maroc ?', a: 'Le prix varie selon la surface et le type (simple ou double flux). Sanifluide réalise une étude gratuite et vous remet un devis détaillé sous 24h.' },
    { q: 'Faut-il un entretien régulier pour une VMC ?', a: 'Oui, un entretien annuel est recommandé : nettoyage des filtres, vérification des débits et contrôle des bouches d\'extraction.' },
    { q: 'Quelles normes régissent la ventilation au Maroc ?', a: 'Les installations suivent les normes marocaines (RTCM) et les normes européennes NF EN 13141 et NF EN 12101 pour le désenfumage.' },
    { q: 'Intervenez-vous en dehors de Tanger ?', a: 'Oui, Sanifluide intervient à Casablanca, Rabat, Tétouan, M\'diq, Larache et dans tout le nord du Maroc.' },
  ],
  related: RELATED_ALL.filter((r) => r.path !== '/services/ventilation-vmc/'),
}

const CLIMATISATION_CONFIG = {
  path: '/services/climatisation-vrv/',
  name: 'Climatisation VRV',
  tag: 'Climatisation & Froid',
  color: '#06b6d4',
  seoTitle: 'Climatisation VRV/VRF au Maroc — Installation & Maintenance | Sanifluide',
  seoDesc: 'Expert en climatisation VRV, split et pac au Maroc. Sanifluide installe et entretient vos systèmes de climatisation à Tanger, Casablanca, Rabat. Devis gratuit.',
  h1: 'Climatisation VRV & Systèmes de froid au Maroc',
  intro: 'Sanifluide conçoit des installations de climatisation VRV/VRF, split-system et solutions de froid commercial pour bureaux, hôtels, hôpitaux et bâtiments industriels au Maroc.',
  subServices: [
    { icon: '❄️', title: 'Climatisation VRV / VRF', desc: 'Systèmes multi-splits à volume de réfrigérant variable.', points: ['Conception et dimensionnement', 'Installation unités intérieures et extérieures', 'Mise en service et test de fuite'] },
    { icon: '🏠', title: 'Split & Multi-Split', desc: 'Solutions de climatisation pour locaux commerciaux et résidentiels.', points: ['Marques : Daikin, Mitsubishi, Hitachi', 'Pose et raccordement frigorifique', 'Garantie fabricant'] },
    { icon: '🌡️', title: 'Climatisation de précision', desc: 'Contrôle strict de la température pour salles informatiques.', points: ['Précision ±0,5°C', 'Gestion de l\'hygrométrie', 'Redondance N+1'] },
    { icon: '🔧', title: 'Maintenance & SAV froid', desc: 'Contrats de maintenance préventive et corrective.', points: ['Contrôle charge frigorigène', 'Nettoyage filtres et évaporateurs', 'Intervention 24h/24'] },
  ],
  faq: [
    { q: 'Qu\'est-ce qu\'un système VRV et pour qui est-il adapté ?', a: 'Un système VRV (Volume de Réfrigérant Variable) permet de raccorder plusieurs unités intérieures sur une seule unité extérieure. Idéal pour les bureaux, hôtels et bâtiments tertiaires de grande surface.' },
    { q: 'Quels fluides frigorigènes utilisez-vous ?', a: 'Nous travaillons avec les fluides R32, R410A et R290 conformément à la réglementation F-Gaz. Nos techniciens sont certifiés pour la manipulation de ces fluides.' },
    { q: 'Proposez-vous des contrats de maintenance pour la climatisation ?', a: 'Oui, Sanifluide propose des contrats annuels incluant 2 visites préventives, le contrôle de la charge frigorigène et une assistance téléphonique 7j/7.' },
    { q: 'Quel est le délai d\'installation d\'un système VRV ?', a: 'Selon la complexité du projet, l\'installation d\'un système VRV prend de 3 à 10 jours ouvrés après réception du matériel.' },
    { q: 'Travaillez-vous avec tous les fabricants de climatisation ?', a: 'Oui, Sanifluide est agréé par les principaux fabricants : Daikin, Mitsubishi Electric, Hitachi, Toshiba et Samsung.' },
  ],
  related: RELATED_ALL.filter((r) => r.path !== '/services/climatisation-vrv/'),
}

const CHAUFFAGE_CONFIG = {
  path: '/services/chauffage-pac/',
  name: 'Chauffage PAC',
  tag: 'Chauffage & Géothermie',
  color: '#f97316',
  seoTitle: 'Chauffage PAC & Pompe à chaleur au Maroc | Sanifluide',
  seoDesc: 'Installation de pompes à chaleur, chaudières et planchers chauffants au Maroc. Sanifluide, expert en chauffage à Tanger et dans tout le nord du Maroc. Devis gratuit.',
  h1: 'Chauffage & Pompes à chaleur au Maroc — Confort thermique garanti',
  intro: 'Sanifluide installe des systèmes de chauffage performants et économiques : pompes à chaleur air/eau, chaudières gaz, planchers chauffants et réseaux de chaleur pour vos projets résidentiels, tertiaires et industriels au Maroc.',
  subServices: [
    { icon: '🔥', title: 'Pompe à chaleur (PAC)', desc: 'Chauffage et eau chaude sanitaire avec des COP élevés.', points: ['PAC air/eau et géothermique', 'COP jusqu\'à 4,5', 'Éligible aux aides énergie'] },
    { icon: '🏠', title: 'Plancher chauffant hydraulique', desc: 'Confort thermique optimal par rayonnement basse température.', points: ['Conception et pose', 'Compatible PAC et chaudière', 'Régulation par zones'] },
    { icon: '🔧', title: 'Chaudières gaz & fioul', desc: 'Installation et remplacement de chaudières performantes.', points: ['Chaudières à condensation', 'Maintenance annuelle', 'Conformité gaz'] },
    { icon: '🌡️', title: 'Réseaux de chaleur urbains', desc: 'Conception de réseaux de distribution de chaleur pour ensembles immobiliers.', points: ['Étude hydraulique', 'Sous-stations de livraison', 'Comptage et facturation'] },
  ],
  faq: [
    { q: 'Une pompe à chaleur est-elle rentable au Maroc ?', a: 'Oui. Avec un COP moyen de 3 à 4, une PAC produit 3 à 4 kWh de chaleur pour 1 kWh d\'électricité consommé. L\'amortissement est généralement atteint en 5 à 8 ans.' },
    { q: 'Le plancher chauffant est-il compatible avec une PAC ?', a: 'Absolument. C\'est même la combinaison idéale : la PAC travaille en basse température (35-45°C), ce qui maximise son rendement et le confort du plancher chauffant.' },
    { q: 'Intervenez-vous pour le chauffage des hôtels et hôpitaux ?', a: 'Oui, Sanifluide a réalisé des installations de chauffage dans plusieurs hôtels et établissements de santé au Maroc. Nous proposons des études adaptées aux exigences HQE.' },
    { q: 'Quelle est la durée de vie d\'une pompe à chaleur ?', a: 'Une PAC bien entretenue a une durée de vie de 15 à 20 ans. Sanifluide propose des contrats de maintenance pour prolonger la durée de vie de votre équipement.' },
    { q: 'Peut-on coupler une PAC avec des panneaux solaires ?', a: 'Oui, c\'est une solution très performante. La PAC utilise l\'électricité produite par les panneaux photovoltaïques, réduisant encore davantage les coûts d\'exploitation.' },
  ],
  related: RELATED_ALL.filter((r) => r.path !== '/services/chauffage-pac/'),
}

const INCENDIE_CONFIG = {
  path: '/services/protection-incendie/',
  name: 'Protection Incendie',
  tag: 'Sécurité & Désenfumage',
  color: '#ef4444',
  seoTitle: 'Protection Incendie & Sprinklers au Maroc | Sanifluide',
  seoDesc: 'Installation de systèmes sprinklers, RIA, détection incendie et désenfumage au Maroc. Sanifluide, agréé APSAD, intervient à Tanger, Casablanca et Rabat.',
  h1: 'Protection incendie au Maroc — Sprinklers, RIA & Désenfumage',
  intro: 'Sanifluide conçoit et installe vos systèmes de protection incendie : sprinklers, Robinets Incendie Armés (RIA), détection automatique et désenfumage, en conformité avec les normes marocaines et APSAD.',
  subServices: [
    { icon: '🚿', title: 'Systèmes Sprinklers', desc: 'Extinction automatique d\'incendie par sprinklers eau ou gaz.', points: ['Calcul hydraulique NFPA 13 / NF S62-210', 'Pose têtes sprinklers et réseau', 'Essai de mise en service'] },
    { icon: '🚰', title: 'Robinets Incendie Armés (RIA)', desc: 'Moyens de première intervention pour tous types de bâtiments.', points: ['RIA DN19, DN25, DN33', 'Armoires et coffrets muraux', 'Vérification annuelle APSAD'] },
    { icon: '🚨', title: 'Détection automatique d\'incendie', desc: 'Systèmes SSI : détecteurs, centrale et déclencheurs manuels.', points: ['Catégorie A, B et C', 'Détecteurs optique, thermique, ASPIRANTS', 'Liaison avec désenfumage'] },
    { icon: '💨', title: 'Désenfumage & Évacuation', desc: 'Systèmes de désenfumage naturel et mécanique pour parkings, couloirs et salles.', points: ['Exutoires de fumée NF EN 12101', 'Volets coupe-feu et CF', 'Cage d\'escalier pressurisée'] },
  ],
  faq: [
    { q: 'Quelles normes régissent les sprinklers au Maroc ?', a: 'Les installations sprinklers suivent les normes NF S62-210 (réglementation française applicable au Maroc) et les règles APSAD R1. Une vérification par un organisme agréé est requise à la mise en service.' },
    { q: 'Mon bâtiment est-il obligé d\'avoir un système d\'extinction automatique ?', a: 'Oui pour certaines catégories : ERP de 1ère catégorie, entrepôts > 6 000 m², immeubles de grande hauteur (IGH) et certains hôtels. Sanifluide vous aide à déterminer vos obligations réglementaires.' },
    { q: 'Combien de temps prend l\'installation d\'un système sprinkler ?', a: 'Pour un bâtiment standard de 2 000 m², l\'installation dure environ 4 à 6 semaines. Nous réalisons les travaux de nuit ou en week-end pour minimiser les perturbations.' },
    { q: 'Proposez-vous des contrats de vérification APSAD ?', a: 'Oui, Sanifluide propose des contrats de vérification annuelle conformes aux règles APSAD P1, P4 et R7, avec remise d\'un rapport de vérification.' },
    { q: 'Intervenez-vous en urgence pour des systèmes incendie défectueux ?', a: 'Oui, notre équipe intervient sous 4 heures pour toute défaillance d\'un système de sécurité incendie actif en région de Tanger, et sous 24h pour Casablanca et Rabat.' },
  ],
  related: RELATED_ALL.filter((r) => r.path !== '/services/protection-incendie/'),
}

/* ─── Simple page components ─── */
function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <WhyUs />
      <Projects />
      <CtaBanner />
    </>
  )
}

/* ─── Root App ─── */
export default function App() {
  return (
    <>
      <Particles />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<main><HomePage /></main>} />
        <Route path="/services/ventilation-vmc/" element={<ServicePage config={VENTILATION_CONFIG} />} />
        <Route path="/services/climatisation-vrv/" element={<ServicePage config={CLIMATISATION_CONFIG} />} />
        <Route path="/services/chauffage-pac/" element={<ServicePage config={CHAUFFAGE_CONFIG} />} />
        <Route path="/services/protection-incendie/" element={<ServicePage config={INCENDIE_CONFIG} />} />
        {/* Fallback: redirect unknown paths to home */}
        <Route path="*" element={<main><HomePage /></main>} />
      </Routes>
      <Footer />
      <WhatsAppChat />
    </>
  )
}
