"use client"

export function VirtualTourSection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Explore
          </span>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Virtual Tour
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Tour Card */}
        <div className="mx-auto max-w-4xl">
          <div className="group relative overflow-hidden rounded-2xl border border-border/50 shadow-xl">
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/19ww2FqDqu0PrwRVg1Cc85yA3c1y5ODei/preview"
                title="RIT Gymnasium Virtual Tour"
                allow="autoplay"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
