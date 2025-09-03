import { Background } from '../components/Background';
import { HeroSection } from '../sections/HeroSection';
import { APISection } from '../sections/APISection';
import { ContactSection } from '../sections/ContactSection';

const Portfolio: React.FC = () => (
  <div className="min-h-screen relative">
    <Background />
    <HeroSection />
    <APISection />
    <ContactSection />
  </div>
);

export default Portfolio;
