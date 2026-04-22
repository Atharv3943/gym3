import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { TimingsSection } from "@/components/landing/timings-section"
import { EquipmentSection } from "@/components/landing/equipment-section"
import { GallerySection } from "@/components/landing/gallery-section"
import { VirtualTourSection } from "@/components/landing/virtual-tour-section"
import { MembershipSection } from "@/components/landing/membership-section"
import { AnnouncementsSection } from "@/components/landing/announcements-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TimingsSection />
      <EquipmentSection />
      <GallerySection />
      <VirtualTourSection />
      <MembershipSection />
      <AnnouncementsSection />
      <Footer />
    </main>
  )
}
