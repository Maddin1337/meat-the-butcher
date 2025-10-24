import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PhotoGallery from './components/PhotoGallery';
import Contact from './components/Contact';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollIndicator from './components/ScrollIndicator';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';

function HomePage() {
  return (
    <div className="min-h-screen">
      <ScrollIndicator />
      <Header />
      <Hero />
      <Features />
      <PhotoGallery />
      <Contact />
      <SocialMedia />
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </Router>
  );
}

export default App;
