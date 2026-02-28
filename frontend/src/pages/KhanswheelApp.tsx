import { useEffect, useRef, useState } from 'react';
import Header from '../components/khanswheel/Header';
import HeroSection from '../components/khanswheel/HeroSection';
import StatsSection from '../components/khanswheel/StatsSection';
import WhyChooseUs from '../components/khanswheel/WhyChooseUs';
import FleetSection from '../components/khanswheel/FleetSection';
import OffersSection from '../components/khanswheel/OffersSection';
import HowItWorks from '../components/khanswheel/HowItWorks';
import CoverageMap from '../components/khanswheel/CoverageMap';
import ReviewsSection from '../components/khanswheel/ReviewsSection';
import BlogSection from '../components/khanswheel/BlogSection';
import TrustSignals from '../components/khanswheel/TrustSignals';
import AboutSection from '../components/khanswheel/AboutSection';
import ContactSection from '../components/khanswheel/ContactSection';
import Footer from '../components/khanswheel/Footer';
import BookingModal from '../components/khanswheel/BookingModal';
import CompareBar from '../components/khanswheel/CompareBar';
import FloatingElements from '../components/khanswheel/FloatingElements';
import CookieBanner from '../components/khanswheel/CookieBanner';
import { Vehicle, vehicles } from '../data/vehicles';

export default function KhanswheelApp() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const openBooking = (vehicle?: Vehicle) => {
    setSelectedVehicle(vehicle || null);
    setBookingModalOpen(true);
  };

  const addToCompare = (vehicle: Vehicle) => {
    if (compareList.find(v => v.id === vehicle.id)) {
      setCompareList(prev => prev.filter(v => v.id !== vehicle.id));
      return;
    }
    if (compareList.length >= 3) {
      alert('You can compare up to 3 vehicles at a time.');
      return;
    }
    setCompareList(prev => [...prev, vehicle]);
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(v => v.id !== id));
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="kw-app">
      <Header onBookNow={() => openBooking()} />
      <main>
        <HeroSection onBookNow={() => openBooking()} />
        <StatsSection />
        <WhyChooseUs />
        <FleetSection
          onBookNow={openBooking}
          onAddToCompare={addToCompare}
          compareList={compareList}
        />
        <OffersSection onBookNow={() => openBooking()} />
        <HowItWorks />
        <CoverageMap />
        <ReviewsSection />
        <BlogSection />
        <TrustSignals />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedVehicle={selectedVehicle}
      />
      <CompareBar
        compareList={compareList}
        onRemove={removeFromCompare}
        onCompare={() => setCompareModalOpen(true)}
        compareModalOpen={compareModalOpen}
        onCloseCompare={() => setCompareModalOpen(false)}
      />
      <FloatingElements />
      <CookieBanner />
    </div>
  );
}
