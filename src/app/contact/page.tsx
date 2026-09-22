import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Image from "next/image";

export const metadata = {
  title: "Contact Us - AutoCare",
  description: "Get in touch with our team for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Mini Hero */}
      <section className="relative w-full py-32 flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[#0A1128]/80 dark:bg-[#0A1128]/95 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=3000&auto=format&fit=crop"
            alt="Garage Contact"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-30 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Let's Talk <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Auto.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              Have questions about our signature packages? Need support with your booking? We are here to help.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Details & Map Column */}
            <div className="space-y-12">
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                <StaggerItem>
                  <Card className="bg-card dark:bg-card border-border shadow-lg rounded-[2rem] hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Call Us</h3>
                      <p className="text-muted-foreground font-medium">Mon-Sat from 8am to 6pm.</p>
                      <p className="text-lg font-bold text-foreground">+1 (555) 123-4567</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="bg-card dark:bg-card border-border shadow-lg rounded-[2rem] hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold">Email Us</h3>
                      <p className="text-muted-foreground font-medium">We reply within 24 hours.</p>
                      <p className="text-lg font-bold text-foreground">info@autocare.com</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>

              <FadeIn delay={0.4}>
                <Card className="bg-card dark:bg-card border-border shadow-xl rounded-[2rem] overflow-hidden group">
                  <div className="p-8 pb-6 flex items-start gap-4">
                     <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Headquarters</h3>
                        <p className="text-muted-foreground font-medium mt-1">123 Auto Drive, Garage City, NY 10012</p>
                        <p className="text-muted-foreground font-medium mt-4 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Open Today: 8:00 AM - 6:00 PM
                        </p>
                      </div>
                  </div>
                  {/* The Map (Restored and Styled) */}
                  <div className="relative h-[300px] w-full bg-muted">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1688698144000!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 dark:invert dark:hue-rotate-180 dark:contrast-75 dark:opacity-80 transition-all duration-700"
                    />
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Form Column */}
            <FadeIn delay={0.3}>
              <Card className="bg-card dark:bg-card border-border shadow-2xl rounded-[2rem] h-full p-8 md:p-12 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                
                <h3 className="text-3xl font-extrabold mb-2">Send a Message</h3>
                <p className="text-muted-foreground font-medium mb-10">Fill out the form below and we'll get back to you shortly.</p>
                <ContactForm />
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
