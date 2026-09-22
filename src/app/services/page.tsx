import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Check, Info, ShieldCheck, Wrench, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Image from "next/image";

export const revalidate = 3600; 

export const metadata = {
  title: "Services - AutoCare",
  description: "View our signature oil change packages and auto care services.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Mini Hero */}
      <section className="relative w-full py-32 flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[#0A1128]/80 dark:bg-[#0A1128]/95 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1635787616118-8f8303e23293?q=80&w=3000&auto=format&fit=crop"
            alt="Synthetic Oil Pour"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-30 text-center">
          <FadeIn>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary-foreground mb-6 shadow-lg backdrop-blur-md">
              <ShieldCheck className="mr-2 h-4 w-4" /> ASE Certified
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Packages.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              We only use the highest grade synthetic fluids and OEM filters to ensure peak performance.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={service.id}>
                <Card className={cn(
                  "flex flex-col border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] h-full group relative overflow-hidden",
                  index === 1 ? "border-primary/50 shadow-primary/10 scale-105 z-10" : "hover:border-primary/30"
                )}>
                  {/* Popular Badge for middle item */}
                  {index === 1 && (
                    <div className="absolute top-0 right-8 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-b-lg shadow-md">
                      Most Popular
                    </div>
                  )}

                  <CardHeader className="p-8 pb-4">
                    <div className="w-14 h-14 bg-muted/50 rounded-2xl flex items-center justify-center mb-6 text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                       <Droplets className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{service.name}</CardTitle>
                    <CardDescription className="mt-4 leading-relaxed font-medium">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 px-8">
                    <div className="flex items-baseline gap-2 py-4 border-b border-border/50">
                      <span className="text-5xl font-extrabold group-hover:text-primary transition-colors">
                        ${service.price.toFixed(0)}
                      </span>
                      <span className="text-muted-foreground font-semibold text-lg">.00</span>
                    </div>
                    
                    <ul className="space-y-4 mt-8">
                      <li className="flex items-start">
                         <div className="bg-secondary/10 p-1 rounded-full mr-3 mt-0.5">
                           <Check className="h-4 w-4 text-secondary" />
                         </div>
                         <span className="text-sm font-medium">Premium Filter Replacement</span>
                      </li>
                      <li className="flex items-start">
                         <div className="bg-secondary/10 p-1 rounded-full mr-3 mt-0.5">
                           <Check className="h-4 w-4 text-secondary" />
                         </div>
                         <span className="text-sm font-medium">Multi-Point Inspection</span>
                      </li>
                      <li className="flex items-start">
                         <div className="bg-secondary/10 p-1 rounded-full mr-3 mt-0.5">
                           <Check className="h-4 w-4 text-secondary" />
                         </div>
                         <span className="text-sm font-medium">Fluid Top-Offs</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 pt-6 mt-auto">
                    <Link 
                      href={`/book?serviceId=${service.id}`}
                      className={cn(
                        buttonVariants({ variant: index === 1 ? "default" : "outline" }), 
                        "w-full h-14 text-lg rounded-xl transition-all font-bold",
                        index === 1 && "shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 border-t border-white/20"
                      )}
                    >
                      Book Now
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {services.length === 0 && (
            <div className="text-center py-20 bg-card rounded-[2rem] border border-border shadow-sm">
              <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h2 className="text-2xl font-bold mb-2">No Services Found</h2>
              <p className="text-muted-foreground">Check back later or contact us for details.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
