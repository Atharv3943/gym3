"use client"

import { useState } from "react"
import Image from "next/image"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-s5VjKgyHfpDxSHAcUpzQR1EH7htAOa.jpeg",
    alt: "RIT Gymnasium - Main workout floor with strength equipment and members training",
    label: "Main Workout Floor",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-sHLp7bjTO1ViGvTSbkG3KlGZf4Y29e.jpeg",
    alt: "RIT Gymnasium - Spacious gym with natural lighting and cable machines",
    label: "Cable Machines Area",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Kr8Q6LdFKFOa8c0ouFe0UWYMCACZtn.jpeg",
    alt: "RIT Gymnasium - Free weights section with dumbbells and bench press stations",
    label: "Free Weights Zone",
  },
]

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Facilities
          </span>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Our Gallery
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {galleryImages.map((img, index) => (
            <div
              key={img.label}
              className="group relative overflow-hidden rounded-xl border border-border/50 shadow-lg"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              {/* Overlay */}
              <div
                className={`absolute inset-0 flex items-end bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="p-5">
                  <span className="text-sm font-semibold text-white">
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
