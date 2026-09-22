import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Star, Clock, ShieldCheck, Wrench } from "lucide-react";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const topServices = await prisma.service.findMany({
    take: 3,
    orderBy: { price: 'asc' }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-24 md:py-32 px-4 overflow-hidden">
        <div className="container mx-auto max-w-5xl text-center space-y-8 relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <Clock className="mr-2 h-4 w-4" /> 30-Minute Guarantee
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
            Premium Oil Changes, <br className="hidden md:block"/> Zero Wait Time.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the fastest, most transparent automotive service in the city. Book online, skip the line, and get back on the road safely.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              href="/book" 
              className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8" })}
            >
              Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/services" 
              className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8" })}
            >
              View Services
            </Link>
          </div>
        </div>
        {/* Abstract Background Design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The New Standard in Auto Care</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We've eliminated the worst parts of getting your oil changed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-none bg-muted/50 text-center">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-muted-foreground">In and out in under 30 minutes when you book ahead. We value your time.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/50 text-center">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">100% Transparent</h3>
                <p className="text-muted-foreground">No aggressive upselling. We only recommend exactly what your manufacturer requires.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/50 text-center">
              <CardContent className="pt-8 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Expert Technicians</h3>
                <p className="text-muted-foreground">Every vehicle is serviced by ASE-certified professionals using premium synthetic fluids.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 px-4 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Packages</h2>
              <p className="text-muted-foreground">Premium care for every vehicle type.</p>
            </div>
            <Link 
              href="/services" 
              className={buttonVariants({ variant: "ghost", className: "hidden md:flex" })}
            >
              See All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {topServices.map((service) => (
              <Card key={service.id} className="flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-3xl font-bold text-primary">${service.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Link 
                    href={`/book?serviceId=${service.id}`}
                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                  >
                    Select Package
                  </Link>
                </CardFooter>
              </Card>
            ))}
            {topServices.length === 0 && (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                Services are currently being updated.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-16">Loved by local drivers</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Michael R.", text: "Easiest oil change of my life. I booked online, showed up, and they took my car back immediately. The transparency was refreshing." },
              { name: "Sarah J.", text: "Finally, a shop that doesn't try to sell me 15 different flushes I don't need. Honest mechanics and a pristine waiting room." },
              { name: "David L.", text: "The 30-minute guarantee is real. I got an oil change on my lunch break with time to spare. Will never go anywhere else." }
            ].map((review, i) => (
              <Card key={i} className="bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <div className="flex text-amber-500 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="italic text-muted-foreground mb-4">"{review.text}"</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto max-w-3xl space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready for a better experience?</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto">
            Join thousands of satisfied customers who have made the switch. Book your appointment in under 60 seconds.
          </p>
          <Link 
            href="/book"
            className={buttonVariants({ variant: "secondary", size: "lg", className: "h-14 px-10 text-lg rounded-full" })}
          >
            Schedule Now
          </Link>
        </div>
      </section>
    </div>
  );
}
