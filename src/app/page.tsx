import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";
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
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      
      {/* Command Center Hero */}
      <section className="relative w-full min-h-[90vh] md:min-h-[85vh] flex flex-col justify-center overflow-hidden">
        {/* Deep Dark Overlay for Image */}
        <div className="absolute inset-0 bg-[#0A1128]/70 dark:bg-[#0A1128]/85 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-20" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=3000&auto=format&fit=crop"
            alt="Premium Auto Service Garage"
            fill
            className="object-cover object-center scale-105"
            priority
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-30 pt-32 pb-48">
          <div className="max-w-3xl space-y-8">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-bold text-secondary backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Clock className="mr-2 h-4 w-4" /> 30-Minute Guarantee
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[1.05]">
                Precision. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Performance.
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed font-medium">
                The modern standard in luxury auto care. Book your service instantly and experience zero wait time.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <Link 
                href="/book" 
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "w-full sm:w-auto text-lg h-16 px-10 rounded-2xl shadow-[0_10px_40px_-10px_var(--color-primary)] hover:shadow-[0_10px_50px_-5px_var(--color-primary)] hover:-translate-y-1 transition-all duration-300 border-t border-white/20 font-bold"
                )}
              >
                Book Appointment <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
              <Link 
                href="/services" 
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }), 
                  "w-full sm:w-auto text-lg h-16 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300 bg-white/5 backdrop-blur-md font-bold"
                )}
              >
                View Services
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Floating Booking Widget (Desktop Overlaps, Mobile Stacks) */}
        <div className="absolute bottom-0 inset-x-0 z-40 translate-y-1/2 hidden lg:block">
          <div className="container mx-auto max-w-5xl px-4">
            <FadeIn delay={0.6}>
              <Card className="bg-background/80 dark:bg-card/80 backdrop-blur-2xl border-border shadow-2xl rounded-3xl p-2 flex items-center justify-between">
                <div className="flex items-center space-x-12 px-10 py-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Service Type</p>
                    <p className="text-lg font-bold">Full Synthetic Oil</p>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Availability</p>
                    <p className="text-lg font-bold text-secondary">Today, 2:30 PM</p>
                  </div>
                </div>
                <Link 
                  href="/book"
                  className={cn(buttonVariants({ size: "lg" }), "h-16 px-10 rounded-2xl text-lg font-bold mr-2 shadow-lg shadow-primary/20")}
                >
                  Quick Book
                </Link>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mobile Floating Widget Replacement */}
      <section className="lg:hidden relative z-40 -mt-8 px-4">
        <FadeIn delay={0.5}>
          <Card className="bg-background/90 dark:bg-card/90 backdrop-blur-2xl border-border shadow-2xl rounded-3xl p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Next Available</p>
              <p className="text-xl font-bold text-secondary">Today, 2:30 PM</p>
            </div>
            <Link 
              href="/book"
              className={cn(buttonVariants({ size: "lg" }), "w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20")}
            >
              Quick Book
            </Link>
          </Card>
        </FadeIn>
      </section>

      {/* The Standard Section */}
      <section className="py-32 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Engineering Trust</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
              We eliminated the worst parts of auto care to deliver a seamless, high-performance experience.
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <Card className="border-border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] h-full bg-card dark:bg-card">
                <CardContent className="pt-12 px-8 space-y-6">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center shadow-inner">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Lightning Fast</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">In and out in under 30 minutes. We value your time immensely.</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] h-full bg-card dark:bg-card">
                <CardContent className="pt-12 px-8 space-y-6">
                  <div className="w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-2xl flex items-center justify-center shadow-inner">
                    <ShieldCheck className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">100% Transparent</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">No aggressive upselling. We only recommend exactly what your manufacturer requires.</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] h-full bg-card dark:bg-card">
                <CardContent className="pt-12 px-8 space-y-6">
                  <div className="w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-2xl flex items-center justify-center shadow-inner">
                    <Wrench className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Master Technicians</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">Every vehicle is serviced by ASE-certified professionals using premium synthetic fluids.</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Signature Packages</h2>
              <p className="text-muted-foreground text-xl font-medium max-w-xl">Premium care for every vehicle type.</p>
            </div>
            <Link 
              href="/services" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl h-14 px-8 font-bold border-2 bg-background hover:bg-muted transition-all")}
            >
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {topServices.map((service) => (
              <StaggerItem key={service.id}>
                <Card className="flex flex-col border-border bg-card hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] h-full group">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{service.name}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-4 leading-relaxed font-medium">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 px-8">
                    <div className="flex items-baseline gap-2 pt-4">
                      <span className="text-5xl font-extrabold group-hover:text-primary transition-colors">
                        ${service.price.toFixed(0)}
                      </span>
                      <span className="text-muted-foreground font-semibold">.00</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0 mt-auto">
                    <Link 
                      href={`/book?serviceId=${service.id}`}
                      className={cn(
                        buttonVariants({ variant: "default" }), 
                        "w-full h-14 text-lg rounded-xl shadow-lg hover:shadow-primary/40 hover:-translate-y-1 border-t border-white/20 transition-all font-bold"
                      )}
                    >
                      Select Package
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
