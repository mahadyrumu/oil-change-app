import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Star, Clock, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const revalidate = 3600;

export default async function HomePage() {
  const topServices = await prisma.service.findMany({
    take: 3,
    orderBy: { price: 'asc' }
  });

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Hero Section */}
      <section className="relative bg-[#F3F4F6] py-32 md:py-48 px-4 overflow-hidden isolate">
        {/* Abstract Background Gradient Meshes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-1.5 text-sm font-semibold text-[#10B981] shadow-sm backdrop-blur-md">
                  <Clock className="mr-2 h-4 w-4" /> 30-Minute Guarantee
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1F2937] leading-[1.1]">
                  Premium Auto Care. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                    Zero Wait Time.
                  </span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <p className="text-xl text-[#1F2937]/70 max-w-xl leading-relaxed font-medium">
                  Experience the fastest, most transparent automotive service in the city. Book online, skip the line, and get back on the road safely.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                <Link 
                  href="/book" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "w-full sm:w-auto text-lg h-16 px-10 rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                  )}
                >
                  Book Appointment <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <Link 
                  href="/services" 
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }), 
                    "w-full sm:w-auto text-lg h-16 px-10 rounded-xl border-2 hover:bg-muted/50 hover:-translate-y-1 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  )}
                >
                  View Services
                </Link>
              </FadeIn>

              <FadeIn delay={0.5} className="flex items-center gap-6 pt-6 text-[#1F2937]/60 text-sm font-medium">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#10B981]" /> ASE Certified</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Premium Fluids</div>
              </FadeIn>
            </div>

            {/* Decorative Imagery / Tech UI Element */}
            <FadeIn delay={0.4} direction="left" className="hidden lg:block relative">
              <div className="relative w-full aspect-square rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-secondary/20 p-8 overflow-hidden shadow-2xl backdrop-blur-3xl border border-white/40">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[2.5rem]" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-12 w-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1F2937]">Vehicle Health Report</h3>
                    <p className="text-[#1F2937]/70 font-medium">Complimentary with every service.</p>
                  </div>
                  <div className="space-y-3">
                    {[100, 85, 92].map((width, i) => (
                      <div key={i} className="h-3 bg-white/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary" 
                          style={{ width: `${width}%` }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-4 bg-white relative z-20">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1F2937] tracking-tight">The New Standard in Auto Care</h2>
            <p className="text-[#1F2937]/60 text-xl max-w-2xl mx-auto font-medium">We've eliminated the worst parts of getting your oil changed.</p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <Card className="border-none shadow-xl shadow-primary/5 bg-[#F3F4F6]/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl h-full">
                <CardContent className="pt-10 px-8 space-y-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937]">Lightning Fast</h3>
                  <p className="text-[#1F2937]/70 font-medium leading-relaxed">In and out in under 30 minutes when you book ahead. We value your time immensely.</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-none shadow-xl shadow-primary/5 bg-[#F3F4F6]/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl h-full">
                <CardContent className="pt-10 px-8 space-y-6">
                  <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center shadow-lg shadow-[#10B981]/30">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937]">100% Transparent</h3>
                  <p className="text-[#1F2937]/70 font-medium leading-relaxed">No aggressive upselling. We only recommend exactly what your manufacturer requires.</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-none shadow-xl shadow-primary/5 bg-[#F3F4F6]/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl h-full">
                <CardContent className="pt-10 px-8 space-y-6">
                  <div className="w-16 h-16 bg-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg shadow-[#F59E0B]/30">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937]">Expert Technicians</h3>
                  <p className="text-[#1F2937]/70 font-medium leading-relaxed">Every vehicle is serviced by ASE-certified professionals using premium synthetic fluids.</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-32 px-4 bg-[#1E3A8A] text-white">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Featured Packages</h2>
              <p className="text-white/70 text-xl font-medium max-w-xl">Premium care for every vehicle type, priced transparently.</p>
            </div>
            <Link 
              href="/services" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/20 text-[#1F2937] hover:bg-white hover:text-primary rounded-xl h-14 px-8 font-bold transition-all")}
            >
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {topServices.map((service) => (
              <StaggerItem key={service.id}>
                <Card className="flex flex-col border-none bg-white/10 backdrop-blur-lg hover:bg-white hover:text-[#1F2937] transition-all duration-500 rounded-3xl h-full group">
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-[#1E3A8A] transition-colors">{service.name}</CardTitle>
                    <CardDescription className="line-clamp-3 text-white/70 group-hover:text-[#1F2937]/70 mt-4 leading-relaxed font-medium">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 px-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white group-hover:text-[#1E3A8A] transition-colors">
                        ${service.price.toFixed(0)}
                      </span>
                      <span className="text-white/60 group-hover:text-[#1F2937]/50 font-semibold">.00</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0 mt-auto">
                    <Link 
                      href={`/book?serviceId=${service.id}`}
                      className={cn(
                        buttonVariants({ variant: "default" }), 
                        "w-full h-14 text-lg rounded-xl shadow-lg bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-bold group-hover:shadow-[#F59E0B]/40 transition-all"
                      )}
                    >
                      Select Package
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
            {topServices.length === 0 && (
              <div className="col-span-3 text-center py-24 text-white/50 text-xl">
                Services are currently being updated.
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-[#F3F4F6] text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <FadeIn className="container mx-auto max-w-3xl space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1F2937]">
            Ready for a <span className="text-primary">better</span> experience?
          </h2>
          <p className="text-xl text-[#1F2937]/70 font-medium max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have made the switch. Book your appointment securely in under 60 seconds.
          </p>
          <div className="pt-4">
            <Link 
              href="/book"
              className={cn(
                buttonVariants({ size: "lg" }), 
                "h-16 px-12 text-xl rounded-2xl shadow-2xl shadow-primary/30 hover:-translate-y-2 hover:shadow-primary/50 transition-all duration-300 font-bold"
              )}
            >
              Schedule Now <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
