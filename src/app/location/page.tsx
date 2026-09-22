import { Card } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LocationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* V5 Ultra-Compact Header */}
      <section className="pt-28 pb-4 px-4 border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-[1400px] flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1.5 text-[10px] font-bold text-secondary dark:text-primary uppercase tracking-wider mb-3">
              <MapPin className="mr-2 h-3.5 w-3.5" /> Find Us
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
              Our <span className="text-secondary dark:text-primary">Location.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium max-w-lg mx-auto">
              Conveniently located in the heart of the city with zero-wait bays.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Full Width Map */}
          <FadeIn delay={0.1}>
            <div className="w-full h-[400px] rounded-[2rem] overflow-hidden border border-border shadow-xl mb-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280011382!2d-74.14448744572235!3d40.69766374856637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1714571120000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 contrast-125 dark:invert dark:opacity-80"
              />
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <Card className="p-6 rounded-[1.5rem] border border-border bg-card shadow-sm h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-secondary dark:text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Address</h3>
                <p className="text-sm text-muted-foreground font-medium">123 Auto Drive<br/>Garage City, NY 10012</p>
              </Card>
            </StaggerItem>
            
            <StaggerItem>
              <Card className="p-6 rounded-[1.5rem] border border-border bg-card shadow-sm h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-secondary dark:text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Hours</h3>
                <p className="text-sm text-muted-foreground font-medium">Mon-Sat: 8:00 AM - 6:00 PM<br/>Sun: Closed</p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="p-6 rounded-[1.5rem] border border-border bg-card shadow-sm h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-secondary dark:text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground font-medium">+1 (555) 123-4567<br/>24/7 Emergency Support</p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="p-6 rounded-[1.5rem] border border-border bg-card shadow-sm h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-secondary dark:text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Email</h3>
                <p className="text-sm text-muted-foreground font-medium">info@autocare.com<br/>support@autocare.com</p>
              </Card>
            </StaggerItem>
          </StaggerContainer>

        </div>
      </section>
    </div>
  );
}
