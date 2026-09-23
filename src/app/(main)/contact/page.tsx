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
    <div className="flex flex-col min-h-screen bg-background">
      {/* V5 Ultra-Compact Header */}
      <section className="pt-28 pb-4 px-4 border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-[1400px] flex flex-col items-center text-center">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
              Let's Talk <span className="text-secondary dark:text-primary">Auto.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium max-w-lg mx-auto">
              Have questions about our signature packages? Need support with your booking? We are here to help.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Left Side - Support Information */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn delay={0.1}>
                <h2 className="text-2xl font-bold text-foreground mb-6">How can we help?</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-secondary dark:text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Call Us</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-1">Mon-Sat from 8am to 6pm.</p>
                      <p className="font-semibold text-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-secondary dark:text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Email Support</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-1">We typically reply within 2 hours.</p>
                      <p className="font-semibold text-foreground">support@autocare.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-secondary dark:text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Business Address</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-1">Visit our main service center.</p>
                      <p className="font-semibold text-foreground">123 Manhattan Ave<br/>New York, NY 10025</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            {/* Right Side - Sleek Floating Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.2}>
                <Card className="p-8 md:p-10 rounded-[2rem] border border-border shadow-2xl bg-card dark:border-white/10">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Send a Message</h2>
                  <p className="text-sm text-muted-foreground font-medium mb-8">Fill out the form below and we'll get back to you shortly.</p>
                  
                  <ContactForm />
                </Card>
              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={0.3}>
            <div className="w-full h-[400px] rounded-[2rem] overflow-hidden border border-border shadow-2xl relative bg-muted">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.012558611802!2d-73.98782352341271!3d40.76173003456382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1692225251649!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.5] contrast-[1.1] dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-[1.2] opacity-90 transition-opacity hover:opacity-100"
              />
              <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl shadow-lg pointer-events-none">
                <p className="font-bold text-sm text-foreground">Manhattan Service Center</p>
                <p className="text-xs font-medium text-muted-foreground">Find us in the heart of the city.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
