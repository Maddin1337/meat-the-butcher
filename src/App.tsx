import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Contact from './components/Contact';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  return (
    <div className="min-h-screen">
      <ScrollIndicator />
      <Header />
      <Hero />
      <Features />
      <Contact />
      <SocialMedia />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
