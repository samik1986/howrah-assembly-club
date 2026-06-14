import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import KidsCorner from './components/KidsCorner';
import NewsCorner from './components/NewsCorner';
import WellnessCorner from './components/WellnessCorner';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/kids-corner" element={<KidsCorner />} />
          <Route path="/news" element={<NewsCorner />} />
          <Route path="/wellness" element={<WellnessCorner />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
