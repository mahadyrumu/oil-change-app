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
    <div className="flex flex-col min-h-screen bg-background">
      {/* V5 Ultra-Compact Header */}
      <section className="pt-28 pb-4 px-4 border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-[1400px] flex flex-col items-center text-center">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
              Our <span className="text-secondary dark:text-primary">Story.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium max-w-lg mx-auto">
              We started AutoCare because we were tired of the upselling, the waiting rooms, and the lack of transparency.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop"
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
                    <Clock className="w-8 h-8 text-secondary dark:text-primary" />
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
      {/* Team Member Profiles (Requirement Gap Fill) */}
      <section className="py-24 px-4 bg-background border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Meet the Experts</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Our master mechanics aren't just grease monkeys; they are certified automotive engineers.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { name: "David Thorne", role: "Lead Master Technician", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop", exp: "15+ Years" },
              { name: "Marcus Johnson", role: "Diagnostic Specialist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop", exp: "10+ Years" },
              { name: "Elena Rostova", role: "Service Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", exp: "12+ Years" }
            ].map((team, i) => (
              <StaggerItem key={i}>
                <Card className="bg-card border-border overflow-hidden rounded-[2rem] hover:shadow-xl transition-all hover:-translate-y-1 p-0">
                  <div className="relative h-72 w-full">
                    <Image src={team.img} alt={team.name} fill className="object-cover object-top" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-1">{team.name}</h3>
                    <p className="text-secondary dark:text-primary font-bold text-sm mb-3">{team.role}</p>
                    <div className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground">
                      <Award className="w-3.5 h-3.5" /> {team.exp} Experience
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location & Hours Summary (Requirement Gap Fill) */}
      <section className="py-24 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-5xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-12">Where to find us</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 rounded-[2rem] bg-card border-border shadow-md text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                   <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between text-muted-foreground font-medium"><span>Monday - Friday</span> <span className="font-bold text-foreground">8:00 AM - 6:00 PM</span></li>
                  <li className="flex justify-between text-muted-foreground font-medium"><span>Saturday</span> <span className="font-bold text-foreground">8:00 AM - 4:00 PM</span></li>
                  <li className="flex justify-between text-muted-foreground font-medium"><span>Sunday</span> <span className="font-bold text-secondary dark:text-primary">Closed</span></li>
                </ul>
              </Card>

              <Card className="p-8 rounded-[2rem] bg-card border-border shadow-md text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                   <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Location</h3>
                <p className="text-muted-foreground font-medium mb-6 leading-relaxed">
                  123 AutoCare Way<br/>
                  Motor City, MI 48201
                </p>
                <div className="text-sm font-bold text-secondary dark:text-primary flex items-center gap-2">
                  <span>View full map and directions on our </span>
                  <a href="/location" className="underline hover:text-primary transition-colors">Location Page</a>.
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
