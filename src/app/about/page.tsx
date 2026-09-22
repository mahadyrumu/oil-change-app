import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Award, Users, ShieldCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const metadata = {
  title: "About Us | Oil Change Experts",
  description: "Learn about our mission to provide the best automotive service experience.",
};

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      desc: "We use only premium synthetic blends and OEM filters."
    },
    {
      icon: <Users className="w-8 h-8 text-[#10B981]" />,
      title: "Community",
      desc: "Family owned and operated, serving our local area since 1998."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#F59E0B]" />,
      title: "Integrity",
      desc: "Transparent pricing. No aggressive upselling. Ever."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] selection:bg-primary/30 selection:text-primary">
      
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10 blur-3xl" />
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
                Our Story
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1F2937] leading-[1.1]">
                Redefining the <br />
                <span className="text-primary">Auto Care</span> Experience.
              </h1>
              <p className="text-xl text-[#1F2937]/70 font-medium leading-relaxed">
                We believe that maintaining your vehicle shouldn't be a chore. It should be fast, transparent, and entirely stress-free. That's the standard we set every single day.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-tr from-primary to-secondary">
              {/* Fallback pattern since we don't have images yet */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/50 font-bold text-2xl tracking-widest uppercase">Premium Garage</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 bg-white relative z-10">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-[#1F2937]">Our Core Values</h2>
            <p className="text-[#1F2937]/60 text-lg max-w-2xl mx-auto font-medium">The principles that guide every wrench we turn and every customer we serve.</p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <StaggerItem key={i}>
                <Card className="border-none shadow-lg shadow-primary/5 bg-[#F3F4F6]/50 hover:bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-[2rem] h-full">
                  <CardContent className="p-10 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                      {v.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1F2937]">{v.title}</h3>
                    <p className="text-[#1F2937]/70 font-medium leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-4 bg-[#1E3A8A] text-white">
        <div className="container mx-auto max-w-6xl">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StaggerItem>
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <MapPin className="w-10 h-10 text-[#F59E0B]" />
                <h3 className="text-xl font-bold">Location</h3>
                <p className="text-white/70 font-medium">123 Auto Care Blvd<br />Motor City, MI 48201</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <Clock className="w-10 h-10 text-[#10B981]" />
                <h3 className="text-xl font-bold">Hours</h3>
                <p className="text-white/70 font-medium">Mon-Fri: 8AM - 6PM<br />Sat: 9AM - 4PM</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <Phone className="w-10 h-10 text-white" />
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="text-white/70 font-medium">(555) 123-4567<br />Emergency: (555) 999-0000</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <Mail className="w-10 h-10 text-white" />
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-white/70 font-medium">service@oilchange.com<br />support@oilchange.com</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
