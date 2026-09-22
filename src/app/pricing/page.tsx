import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const packages = [
    {
      name: "Standard Oil Change",
      price: "40",
      description: "Conventional motor oil change, replace oil filter, and check fluid levels.",
      features: ["Premium Filter Replacement", "Multi-Point Inspection", "Fluid Level Top-Off", "Tire Pressure Check"],
      popular: false,
    },
    {
      name: "High Mileage",
      price: "60",
      description: "Specially formulated for vehicles over 75,000 miles. Helps prevent leaks.",
      features: ["Everything in Standard", "High Mileage Additives", "Seal Conditioners", "Battery Health Test"],
      popular: true,
    },
    {
      name: "Full Synthetic",
      price: "80",
      description: "Maximum protection for your engine. Includes comprehensive fluid check.",
      features: ["Everything in High Mileage", "100% Synthetic Fluid", "Extended Drain Interval", "Brake Pad Inspection"],
      popular: false,
    }
  ];

  return (
    <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
      {/* V5 Ultra-Compact Header */}
      <section className="pt-24 pb-2 px-4 border-b border-border bg-muted/30 shrink-0">
        <div className="container mx-auto max-w-[1400px] flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold text-secondary dark:text-primary uppercase tracking-wider mb-2">
              <Zap className="mr-2 h-3.5 w-3.5" /> Transparent Pricing
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-1">
              Plans & <span className="text-secondary dark:text-primary">Pricing.</span>
            </h1>
            <p className="text-xs text-muted-foreground font-medium max-w-lg mx-auto hidden sm:block">
              No hidden fees, no upselling. Just honest, premium service for every vehicle type.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="flex-1 px-4 py-4 md:py-8 overflow-y-auto">
        <div className="container mx-auto max-w-6xl h-full">
          <StaggerContainer className="grid md:grid-cols-3 gap-6 h-full items-center">
            {packages.map((pkg, index) => (
              <StaggerItem key={index} className="h-full max-h-[500px]">
                <Card className={cn(
                  "flex flex-col h-full rounded-[2rem] p-6 border transition-all duration-300 relative",
                  pkg.popular 
                    ? "border-primary dark:border-secondary shadow-xl bg-card scale-[1.02] z-10" 
                    : "border-border shadow-sm bg-card hover:border-primary/50"
                )}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-primary dark:bg-secondary text-primary-foreground text-[10px] font-bold px-4 py-1.5 rounded-bl-[1rem] rounded-tr-[2rem] z-20">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-foreground mb-1 shrink-0">{pkg.name}</h3>
                  <p className="text-muted-foreground text-xs font-medium mb-4 min-h-[32px] shrink-0">{pkg.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-4 border-b border-border pb-4 shrink-0">
                    <span className="text-4xl font-extrabold text-foreground">${pkg.price}</span>
                    <span className="text-muted-foreground text-xs font-medium">/service</span>
                  </div>

                  <ul className="space-y-3 mb-4 flex-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-secondary dark:text-primary shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-foreground leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/book"
                    className={cn(
                      buttonVariants({ variant: pkg.popular ? "default" : "outline", size: "sm" }),
                      "w-full rounded-xl h-10 font-bold text-sm shrink-0 mt-auto",
                      pkg.popular ? "shadow-lg shadow-primary/20 dark:shadow-secondary/20" : ""
                    )}
                  >
                    Choose Plan
                  </Link>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
