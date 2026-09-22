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
                      <p className="font-semibold text-foreground">123 AutoCare Way<br/>Motor City, MI 48201</p>
                      <a href="/location" className="text-secondary dark:text-primary text-sm font-bold mt-2 inline-block hover:underline">View on map →</a>
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
    </div>
  );
}
