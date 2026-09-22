import { Card, CardContent } from "@/components/ui/card";
import { Wrench, ShieldCheck, Clock, Award } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Image from "next/image";

export const metadata = {
  title: "About Us - AutoCare",
  description: "Learn about our mission to revolutionize the auto care industry.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Mini Hero */}
      <section className="relative w-full py-32 flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[#0A1128]/80 dark:bg-[#0A1128]/95 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=3000&auto=format&fit=crop"
            alt="Auto Mechanics"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-30 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Story.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              We started AutoCare because we were tired of the upselling, the waiting rooms, and the lack of transparency.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1503375894026-62181744155b?q=80&w=2000&auto=format&fit=crop"
                  alt="Modern Garage"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Redefining the <br/> Garage Experience</h2>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Founded in 2024, AutoCare was built on a simple premise: vehicle maintenance shouldn't disrupt your life. We've engineered our entire process around speed, quality, and complete transparency.
              </p>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                By specializing exclusively in oil changes and routine fluid maintenance, our ASE-certified technicians perform these critical services with unparalleled precision and efficiency.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-4xl font-extrabold text-foreground">10k+</p>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-1">Vehicles Serviced</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="text-4xl font-extrabold text-foreground">4.9</p>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-1">Average Rating</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Our DNA</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              The core principles that guide every wrench we turn and every customer we serve.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StaggerItem>
              <Card className="bg-card dark:bg-card border-border shadow-lg rounded-[2rem] hover:-translate-y-2 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Absolute Integrity</h3>
                  <p className="text-muted-foreground font-medium">We never sell you a service you don't absolutely need.</p>
                </CardContent>
              </Card>
            </StaggerItem>
            
            <StaggerItem>
              <Card className="bg-card dark:bg-card border-border shadow-lg rounded-[2rem] hover:-translate-y-2 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <Clock className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Respect for Time</h3>
                  <p className="text-muted-foreground font-medium">In and out in 30 minutes, keeping you on schedule.</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="bg-card dark:bg-card border-border shadow-lg rounded-[2rem] hover:-translate-y-2 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Surgical Precision</h3>
                  <p className="text-muted-foreground font-medium">Clean, exact, and by the book for every make and model.</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="bg-card dark:bg-card border-border shadow-lg rounded-[2rem] hover:-translate-y-2 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">Premium Quality</h3>
                  <p className="text-muted-foreground font-medium">We exclusively use top-tier synthetic fluids and OEM filters.</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
