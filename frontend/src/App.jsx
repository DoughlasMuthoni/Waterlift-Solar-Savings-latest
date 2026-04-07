import { SettingsProvider } from './context/SettingsContext';
import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import TrustBar from './sections/TrustBar';
import ValuePropsSection from './sections/ValuePropsSection';
import ProblemSection from './sections/ProblemSection';
import WhySolarSection from './sections/WhySolarSection';
import HowItWorksSection from './sections/HowItWorksSection';
import PlansSection from './sections/PlansSection';
import SavingsCalculator from './sections/SavingsCalculator';
import SchoolTypesSection from './sections/SchoolTypesSection';
import WhyWaterliftSection from './sections/WhyWaterliftSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FaqSection from './sections/FaqSection';
import CallbackCtaSection from './sections/CallbackCtaSection';
import ContactSection from './sections/ContactSection';
import MonitoringSection from './sections/MonitoringSection';
import Footer from './sections/Footer';
import FloatingWhatsAppButton from './sections/FloatingWhatsAppButton';

export default function App() {
  return (
    <SettingsProvider>
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <ValuePropsSection />
        <ProblemSection />
        <WhySolarSection />
        <HowItWorksSection />
        <PlansSection />
        <SavingsCalculator />
        <SchoolTypesSection />
        <WhyWaterliftSection />
        <TestimonialsSection />
        <FaqSection />
        <CallbackCtaSection />
        <ContactSection />
        <MonitoringSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </SettingsProvider>
  );
}
