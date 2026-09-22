import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const metadata = {
  title: "Contact Us | Oil Change Experts",
  description: "Get in touch with our team for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] selection:bg-primary/30 selection:text-primary pt-24">
      {/* Abstract Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        <FadeIn className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1F2937]">Let's Connect</h1>
          <p className="text-xl text-[#1F2937]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            Have a question about our services? Need technical support? Our team is standing by to help.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <h2 className="text-3xl font-extrabold text-[#1F2937]">Contact Information</h2>
              <p className="text-[#1F2937]/70 font-medium mt-2">Reach out directly using the info below or fill out the form.</p>
            </StaggerItem>

            <StaggerItem>
              <Card className="border-none shadow-xl shadow-primary/5 bg-white/60 backdrop-blur-xl rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-6 shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1F2937]">Our Garage</h3>
                      <p className="text-[#1F2937]/70 font-medium mt-1 leading-relaxed">
                        123 Auto Care Blvd<br />
                        Motor City, MI 48201
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mr-6 shrink-0">
                      <Phone className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1F2937]">Phone</h3>
                      <p className="text-[#1F2937]/70 font-medium mt-1 leading-relaxed">
                        (555) 123-4567<br />
                        <span className="text-xs uppercase font-bold text-[#10B981]">24/7 Emergency Line</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mr-6 shrink-0">
                      <Clock className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1F2937]">Business Hours</h3>
                      <p className="text-[#1F2937]/70 font-medium mt-1 leading-relaxed">
                        Mon - Fri: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn direction="left" delay={0.2} className="relative h-full">
            <Card className="border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-extrabold text-[#1F2937] mb-8">Send a Message</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
