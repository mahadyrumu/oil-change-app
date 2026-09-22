import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "About Us | Oil Change Experts",
  description: "Learn about our history, meet our expert mechanics, and find our location and hours.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About Our Shop</h1>
          <p className="text-xl text-muted-foreground">
            Providing premium automotive care and oil change services with integrity and speed since 2010.
          </p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-20 px-4 container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our History</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Started in a small two-bay garage over a decade ago, our mission was simple: provide honest, high-quality, and fast oil changes without the aggressive upselling found at chain stores.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we have grown into a state-of-the-art facility, but our core values remain the same. We treat every vehicle as if it were our own, using only premium synthetic blends and top-tier filters.
            </p>
          </div>
          <div className="bg-primary/10 p-8 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span><strong>Transparency:</strong> You only pay for what your car actually needs.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span><strong>Speed:</strong> Get back on the road in under 30 minutes.</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span><strong>Quality:</strong> Premium fluids and filters for every single service.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Experts</h2>
            <p className="text-muted-foreground">Our ASE-certified technicians have decades of combined experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Davis", role: "Master Mechanic", exp: "15 Years Experience" },
              { name: "Sarah Miller", role: "Service Manager", exp: "8 Years Experience" },
              { name: "Mike Chen", role: "Lube Technician", exp: "5 Years Experience" }
            ].map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.exp}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 px-4 container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Location & Hours</h2>
            <p className="text-muted-foreground mb-8">
              Conveniently located in the heart of downtown. Walk-ins are welcome, but appointments are highly recommended to ensure zero wait time.
            </p>
            <div className="space-y-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-6 h-6 text-primary mr-4" />
                <span>123 Auto Care Blvd<br/>Metropolis, NY 10001</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-6 h-6 text-primary mr-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="w-6 h-6 text-primary mr-4" />
                <span>service@oilchangeexperts.com</span>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-destructive">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
