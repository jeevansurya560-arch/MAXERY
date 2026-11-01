import HeroSection from '../components/landing/HeroSection';
import CrisisRealitySection from '../components/landing/CrisisRealitySection';
import InteractiveScannerSimulator from '../components/landing/InteractiveScannerSimulator';
import HierarchySection from '../components/landing/HierarchySection';
import DispatcherConsoleSection from '../components/landing/DispatcherConsoleSection';
import PrivacyShieldSection from '../components/landing/PrivacyShieldSection';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <HeroSection />
      <CrisisRealitySection />
      <InteractiveScannerSimulator />
      <HierarchySection />
      <DispatcherConsoleSection />
      <PrivacyShieldSection />
    </div>
  );
}
