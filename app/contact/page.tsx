"use client"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const handleCall = () => {
    window.location.href = "tel:+917776963666"
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase tracking-tight text-foreground">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our team is here to help you get the most out of your training. Reach out 
              anytime for support or membership inquiries.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-8">
                <h2 className="mb-8 font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight">
                  Get In Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+91 77769 63666</p>
                      <button 
                        onClick={handleCall}
                        className="mt-2 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        Call Now
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-sm text-muted-foreground">sangramsinh.patil@ritindia.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Visit Us</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Rajaramnbapu Institute of Technology, <br />
                        Physical Education Complex, Ground Floor, <br />
                        Islampur, Sangli.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp or FAQ block */}
              <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-none transition-transform hover:scale-[1.01] cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-full bg-emerald-500 p-3 text-white">
                        <MessageCircle className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">Chat with our Support Bot</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Available 24/7</p>
                    </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight">
                    Send Us A Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
                      <Input id="first_name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
                      <Input id="last_name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Membership Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                    <Textarea id="message" placeholder="How can we help?" className="min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-primary py-6 text-lg font-bold uppercase tracking-wide hover:bg-primary/90">
                    <Send className="mr-2 h-5 w-5" />
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
