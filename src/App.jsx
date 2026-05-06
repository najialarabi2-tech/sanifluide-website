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

export default function App() {
  return (
    <>
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <WhyUs />
        <Projects />
        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppChat />
    </>
  )
}
