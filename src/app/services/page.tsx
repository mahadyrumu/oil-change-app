import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, Droplets, Settings, Zap, ArrowRight, Activity, TrendingUp, Navigation2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const metadata = {
  title: "Services - AutoCare",
  description: "Smart AI vehicle tracking and auto care services.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-secondary/30 selection:text-secondary dark:text-primary">
      
      {/* Detailed Service Descriptions Section (Now First) */}
      <section className="pt-32 pb-24 px-4 bg-muted/30 border-b border-border">
        <div className="container mx-auto max-w-6xl">
           <FadeIn className="flex flex-col items-center text-center mb-16 space-y-4">
            <p className="text-sm font-bold text-secondary dark:text-primary uppercase tracking-widest">Our Process</p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight">
              More than just an <span className="text-secondary dark:text-primary">oil change.</span>
            </h1>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-12">
            <StaggerItem className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Synthetic vs Conventional</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Synthetic oil offers superior engine protection, better performance in extreme temperatures, and longer intervals between changes. While conventional oil is suitable for older, low-mileage engines, we highly recommend synthetic for all modern vehicles to maximize longevity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Settings className="w-6 h-6 text-secondary dark:text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Comprehensive Fluid Top-Off</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    During every service, we don't just change your oil. We check and top off your windshield washer fluid, power steering fluid, transmission fluid, and coolant to ensure your vehicle leaves in peak condition.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">24-Point Inspection</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Safety first. Our ASE-certified technicians perform a rigorous 24-point visual inspection of your vehicle's critical systems, including brake pads, belts, hoses, and tire tread depth. We catch small problems before they become big bills.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Eco-Friendly Disposal</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    We care about our environment. 100% of the used oil and filters we remove are safely captured, recycled, and repurposed through our certified environmental partners. Zero waste goes to landfills.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Smart AI Feature Cards (Now Second) */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-[1400px]">
          <FadeIn className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-secondary dark:text-primary uppercase tracking-widest mb-4">
              SMART AI THAT GETS YOU!
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              Effortless <span className="text-secondary dark:text-primary">Vehicle Tracking,</span><br/> Tailored for You
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Keep an eye on fluids, brake health, and engine diagnostics in a snap—no fuss, no guessing.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Fluid Management */}
            <StaggerItem className="h-full">
              <Card className="flex flex-col h-full border-none shadow-sm bg-blue-50/50 dark:bg-blue-950/20 hover:shadow-md transition-all duration-300 rounded-[2rem] p-8">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center mb-6 shadow-sm border border-border/50">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Fluid Management</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  Plan and manage your vehicle fluids with real-time analytics.
                </p>
                <div className="w-10 h-10 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-sm border border-border/50 mt-auto shrink-0 transition-transform hover:scale-110 cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </div>
              </Card>
            </StaggerItem>

            {/* Engine Intelligence */}
            <StaggerItem className="h-full">
              <Card className="flex flex-col h-full border-2 border-secondary/20 bg-secondary/5 hover:border-secondary shadow-md transition-all duration-300 rounded-[2rem] p-8">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center mb-6 shadow-sm border border-border/50">
                  <Activity className="w-5 h-5 text-secondary dark:text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Engine Intelligence</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  Smart diagnostic scheduling to save time and ensure health.
                </p>
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center shadow-sm mt-auto shrink-0 transition-transform hover:scale-110 cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Card>
            </StaggerItem>

            {/* Brake Health */}
            <StaggerItem className="h-full">
              <Card className="flex flex-col h-full border-none shadow-sm bg-amber-50/50 dark:bg-amber-950/20 hover:shadow-md transition-all duration-300 rounded-[2rem] p-8">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center mb-6 shadow-sm border border-border/50">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Brake Health</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  Analyze wear, get recommendations and improve safety.
                </p>
                <div className="w-10 h-10 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-sm border border-border/50 mt-auto shrink-0 transition-transform hover:scale-110 cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </div>
              </Card>
            </StaggerItem>

            {/* Market Insights */}
            <StaggerItem className="h-full">
              <Card className="flex flex-col h-full border-none shadow-sm bg-purple-50/50 dark:bg-purple-950/20 hover:shadow-md transition-all duration-300 rounded-[2rem] p-8">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center mb-6 shadow-sm border border-border/50">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Market Insights</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                  Real-time pricing data and forecasts to maintain smarter.
                </p>
                <div className="w-10 h-10 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-sm border border-border/50 mt-auto shrink-0 transition-transform hover:scale-110 cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </div>
              </Card>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* Deep Blue CTA Pre-Footer */}
      <section className="py-24 px-4 bg-[#233876] text-white relative overflow-hidden">
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-xl">
                Ready for a smoother ride?
              </h2>
              <p className="text-white/80 font-medium text-lg max-w-md leading-relaxed">
                Visit our state-of-the-art facility today, or book online to secure your zero-wait appointment.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link 
                  href="/book" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "h-14 px-8 rounded-full shadow-xl font-bold text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground border-0"
                  )}
                >
                  Book Appointment
                </Link>
                <Link 
                  href="/contact" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "h-14 px-8 rounded-full bg-white text-[#1e3066] hover:bg-white/90 border-0 font-bold text-base"
                  )}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#1e3066] p-8 rounded-[2rem] border border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Navigation2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">Location</h3>
                <p className="text-white/70 text-sm font-medium">123 AutoCare Way<br/>Motor City, MI 48201</p>
              </div>
              
              <div className="bg-[#1e3066] p-8 rounded-[2rem] border border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">Phone</h3>
                <p className="text-white/70 text-sm font-medium">+1 (555) 123-4567<br/>Mon-Sat: 8am - 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
