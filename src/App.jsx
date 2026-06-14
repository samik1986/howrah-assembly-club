import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import KidsCorner from './components/KidsCorner';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Activities />
        <Gallery />
        <KidsCorner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
