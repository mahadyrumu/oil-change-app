import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Check, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const metadata = {
  title: "Our Services | Oil Change Experts",
  description: "Explore our premium oil change packages and automotive services.",
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] selection:bg-primary/30 selection:text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-[#1E3A8A]/10 to-transparent -z-10" />
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1F2937]">
              Premium Services
            </h1>
            <p className="text-xl text-[#1F2937]/70 max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
              Transparent pricing, expert technicians, and our legendary 30-minute guarantee. Select the package that fits your vehicle's needs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <StaggerContainer className="grid lg:grid-cols-3 gap-8 items-start">
            {services.map((service, index) => {
              // Highlight the middle tier package usually
              const isPopular = index === 1;

              return (
                <StaggerItem key={service.id}>
                  <Card className={cn(
                    "relative flex flex-col border-none shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden",
                    isPopular ? "bg-[#1E3A8A] text-white scale-100 lg:scale-105 z-10 shadow-primary/30" : "bg-white text-[#1F2937] hover:-translate-y-2 hover:shadow-xl"
                  )}>
                    {isPopular && (
                      <div className="absolute top-0 inset-x-0 bg-[#F59E0B] text-white text-xs font-bold uppercase tracking-wider py-2 text-center">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className={cn("p-10 pb-6", isPopular && "pt-12")}>
                      <CardTitle className="text-3xl font-extrabold">{service.name}</CardTitle>
                      <CardDescription className={cn(
                        "mt-4 text-base font-medium leading-relaxed h-16",
                        isPopular ? "text-white/80" : "text-[#1F2937]/70"
                      )}>
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-10 pb-10 flex-1">
                      <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8">
                        <span className="text-6xl font-extrabold">${service.price.toFixed(0)}</span>
                        <span className={cn("text-lg font-semibold", isPopular ? "text-white/60" : "text-[#1F2937]/50")}>.00</span>
                      </div>
                      
                      <ul className="space-y-5">
                        <li className="flex items-start">
                          <Clock className={cn("w-6 h-6 mr-3 shrink-0", isPopular ? "text-[#10B981]" : "text-primary")} />
                          <span className="font-medium">{service.duration} Minute Guarantee</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={cn("w-6 h-6 mr-3 shrink-0", isPopular ? "text-[#10B981]" : "text-primary")} />
                          <span className="font-medium">Premium Synthetic Blend</span>
                        </li>
                        <li className="flex items-start">
                          <Check className={cn("w-6 h-6 mr-3 shrink-0", isPopular ? "text-[#10B981]" : "text-primary")} />
                          <span className="font-medium">Multi-Point Inspection</span>
                        </li>
                      </ul>
                    </CardContent>

                    <CardFooter className="p-10 pt-0 mt-auto">
                      <Link 
                        href={`/book?serviceId=${service.id}`}
                        className={cn(
                          buttonVariants({ size: "lg", variant: isPopular ? "default" : "outline" }), 
                          "w-full h-16 text-lg rounded-xl font-bold transition-all",
                          isPopular ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white border-none shadow-xl shadow-[#F59E0B]/30" : "border-2 border-[#1E3A8A]/20 text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                        )}
                      >
                        Book This Package <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </CardFooter>
                  </Card>
                </StaggerItem>
              );
            })}

            {services.length === 0 && (
              <div className="col-span-3 text-center py-20">
                <p className="text-xl text-[#1F2937]/50">Services are currently being updated.</p>
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
