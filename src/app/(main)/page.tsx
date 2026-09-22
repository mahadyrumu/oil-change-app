import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Wrench, CheckCircle2, Navigation2, Star, Zap, Clock, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Image from "next/image";

export const revalidate = 3600;

export default async function HomePage() {
  const topServices = await prisma.service.findMany({
    take: 3,
    orderBy: { price: 'asc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-secondary/30 selection:text-secondary dark:text-primary">
      
      {/* V5 Structured Floating Hero - Strictly constrained to viewport height */}
      <section className="relative w-full pt-32 pb-8 h-[100dvh] min-h-[700px] overflow-hidden flex items-center">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 h-full">
            
            {/* Left Side: Dense, High-Value Content */}
            <div className="w-full lg:w-[45%] space-y-8 z-10 flex flex-col justify-center">
              <FadeIn delay={0.1} className="flex items-center gap-4">
                <div className="inline-flex items-center rounded-full bg-secondary/10 dark:bg-secondary/20 px-4 py-2 text-sm font-bold text-secondary dark:text-primary uppercase tracking-wider">
                  <Navigation2 className="mr-2 h-4 w-4" /> Next-Gen Mobility Care
                </div>
                <div className="hidden sm:flex items-center gap-1 text-sm font-bold text-foreground">
                  <Star className="h-4 w-4 fill-secondary text-secondary dark:text-primary" /> 4.9/5 Average Rating
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-foreground leading-[1.05]">
                  A Simplified Way to Start <br className="hidden md:block" />
                  <span className="text-secondary dark:text-primary">AutoCare.</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-medium">
                  Track your vehicle's health, manage fluids, and schedule maintenance instantly with AutoCare. That's it... no guessing, no waiting.
                </p>
                
                {/* V5: Added Value Props (Bullet Points) */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                       <Zap className="h-3.5 w-3.5 text-secondary dark:text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">Instant Transparent Pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                       <Clock className="h-3.5 w-3.5 text-secondary dark:text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">Zero-Wait Scheduled Bays</span>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.4} className="flex flex-wrap items-center gap-4 pt-4">
                <Link 
                  href="/book" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "h-14 px-8 rounded-full shadow-lg shadow-primary/20 dark:shadow-secondary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-bold text-base"
                  )}
                >
                  Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="flex -space-x-3 ml-4">
                   <img className="w-10 h-10 rounded-full border-2 border-background" src="https://i.pravatar.cc/100?img=1" alt="User" />
                   <img className="w-10 h-10 rounded-full border-2 border-background" src="https://i.pravatar.cc/100?img=2" alt="User" />
                   <img className="w-10 h-10 rounded-full border-2 border-background" src="https://i.pravatar.cc/100?img=3" alt="User" />
                   <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                     10k+
                   </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Side: The Floating Image & Widgets */}
            <div className="w-full lg:w-[55%] relative flex justify-center lg:justify-end">
              <FadeIn delay={0.5} className="w-full max-w-[700px]">
                {/* The Main Image Container - Heavily Rounded */}
                <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border bg-card dark:border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=3000&auto=format&fit=crop"
                    alt="Modern Smart Garage"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle overlay for contrast against the image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                </div>
              </FadeIn>

              {/* Overlapping Widget 1: Availability (Bottom Left overlap) */}
              <FadeIn delay={0.7} className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 lg:-bottom-12 lg:-left-12 z-20 w-full max-w-[280px] md:max-w-[320px]">
                <Card className="bg-card/95 backdrop-blur-2xl border border-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] p-5 md:p-6 dark:border-white/10 dark:bg-black/80">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-secondary dark:text-primary" />
                      </div>
                      <span className="font-bold text-foreground text-sm">Live Availability</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                          <Droplets className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Premium Oil</p>
                      </div>
                      <p className="text-sm font-bold text-secondary dark:text-primary">2:30 PM</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                          <Activity className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Diagnostic</p>
                      </div>
                      <p className="text-sm font-bold text-secondary dark:text-primary">4:00 PM</p>
                    </div>
                  </div>
                </Card>
              </FadeIn>

              {/* Overlapping Widget 2: Floating Stat (Top Right) */}
              <FadeIn delay={0.9} className="absolute top-4 -right-2 md:top-12 md:-right-6 lg:top-24 lg:-right-12 z-20">
                <Card className="bg-card border border-border shadow-xl rounded-[1.5rem] p-4 flex items-center gap-4 dark:border-white/10 dark:bg-black/90">
                   <div className="w-12 h-12 rounded-full bg-secondary text-primary-foreground flex items-center justify-center">
                     <ShieldCheck className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Certified</p>
                     <p className="text-base font-extrabold text-foreground">ASE Experts</p>
                   </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Structured "What We Do" Section - Mild Colorful Cards */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-[1400px]">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <p className="text-sm font-bold text-secondary dark:text-primary uppercase tracking-widest">Smart AI That Gets You!</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
              Effortless <span className="text-secondary dark:text-primary">Vehicle Tracking,</span> Tailored for You
            </h2>
            <p className="text-muted-foreground font-medium max-w-xl text-lg">
              Keep an eye on fluids, brake health, and engine diagnostics in a snap—no fuss, no guessing.
            </p>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Fluid Management", desc: "Plan and manage your vehicle fluids with real-time analytics.", icon: <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />, colorClass: "bg-blue-50/80 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-800" },
              { title: "Engine Intelligence", desc: "Smart diagnostic scheduling to save time and ensure health.", icon: <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />, colorClass: "bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-800" },
              { title: "Brake Health", desc: "Analyze wear, get recommendations and improve safety.", icon: <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />, colorClass: "bg-amber-50/80 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-800" },
              { title: "Market Insights", desc: "Real-time pricing data and forecasts to maintain smarter.", icon: <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />, colorClass: "bg-purple-50/80 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800" }
            ].map((item, i) => (
              <StaggerItem key={i}>
                <Card className={cn(
                  "border transition-all duration-300 rounded-[2rem] h-full p-8 flex flex-col group shadow-sm hover:shadow-md",
                  item.colorClass
                )}>
                  <div className="w-14 h-14 bg-white dark:bg-black/40 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>
                  <div className="w-10 h-10 rounded-full border-2 border-border bg-white dark:bg-black flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all mt-auto">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Services - Clean Cards */}
      <section className="py-24 px-4 bg-background border-t border-border">
        <div className="container mx-auto max-w-[1400px]">
           <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <p className="text-sm font-bold text-secondary dark:text-primary uppercase tracking-widest">Smarter AI AutoBot</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
              Not Harder, Your AI-Powered Auto Assistant
            </h2>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {topServices.map((service, index) => (
              <StaggerItem key={service.id}>
                <Card className={cn(
                  "flex flex-col border border-border bg-card hover:border-primary/50 hover:shadow-2xl transition-all duration-300 rounded-[2rem] h-full p-8 overflow-hidden relative dark:border-white/10",
                  index === 1 && "border-primary dark:border-secondary shadow-xl"
                )}>
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-primary dark:bg-secondary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-[1rem]">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-muted rounded-[1.25rem]">
                       <Wrench className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3">{service.name}</h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold text-foreground">${service.price.toFixed(0)}</span>
                    </div>
                    <Link 
                      href={`/book?serviceId=${service.id}`}
                      className={cn(
                        buttonVariants({ variant: index === 1 ? "default" : "outline" }), 
                        "w-full h-14 rounded-2xl font-bold text-base transition-all dark:border-white/20"
                      )}
                    >
                      Select Plan
                    </Link>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      {/* Testimonials Section (Requirement Gap Fill) */}
      <section className="py-24 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-[1400px]">
           <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <p className="text-sm font-bold text-secondary dark:text-primary uppercase tracking-widest">Real Stories</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
              Trusted by <span className="text-secondary dark:text-primary">Thousands</span>
            </h2>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Sarah Jenkins", role: "Daily Commuter", review: "Incredible service! I was in and out in less than 30 minutes, and the waiting area felt like a premium lounge. Highly recommended." },
              { name: "Michael Chang", role: "Uber Driver", review: "As someone who drives for a living, I need transparency. AutoCare showed me exactly what I needed without the usual upselling pressure." },
              { name: "Emily Rodriguez", role: "SUV Owner", review: "The digital booking system is flawless. I knew my exact price before I arrived, and the mechanics were extremely professional." }
            ].map((testimonial, i) => (
              <StaggerItem key={i}>
                <Card className="p-8 rounded-[2rem] border border-border bg-card dark:border-white/10 h-full flex flex-col hover:border-primary/50 transition-colors">
                  <div className="flex gap-1 mb-6 text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-muted-foreground font-medium italic mb-8 flex-1 leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary dark:text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Info Pre-Footer (Requirement Gap Fill) */}
      <section className="py-24 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-xl">
                Ready for a smoother ride?
              </h2>
              <p className="text-primary-foreground/80 font-medium text-lg max-w-md leading-relaxed">
                Visit our state-of-the-art facility today, or book online to secure your zero-wait appointment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/book" 
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }), 
                    "h-14 px-8 rounded-full shadow-xl font-bold text-base"
                  )}
                >
                  Book Appointment
                </Link>
                <Link 
                  href="/contact" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "h-14 px-8 rounded-full bg-white text-primary hover:bg-white/90 border-0 font-bold text-base"
                  )}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Navigation2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Location</h3>
                <p className="text-primary-foreground/70 text-sm font-medium">123 AutoCare Way<br/>Motor City, MI 48201</p>
              </div>
              
              <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Phone</h3>
                <p className="text-primary-foreground/70 text-sm font-medium">+1 (555) 123-4567<br/>Mon-Sat: 8am - 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Dummy lucide icons used for the new tech section
const Droplets = ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
const Activity = ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const TrendingUp = ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
