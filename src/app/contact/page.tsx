"use client"

import { useActionState, useEffect } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, { 
    success: false, 
    message: "", 
    errors: {} 
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      // Reset form visually (in a real app, you might use a ref to reset the DOM form)
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information & Map */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have a question about our services or need to schedule a specific repair? Send us a message and our expert team will respond as soon as possible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-sm text-muted-foreground">123 Auto Care Blvd<br/>Metropolis, NY 10001</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground">(555) 123-4567<br/>Mon-Sat, 8am-6pm</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps Iframe Placeholder */}
          <div className="w-full h-[300px] bg-muted rounded-xl overflow-hidden border border-border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1689253304567!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact Form */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-2xl">Send a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  aria-describedby="name-error"
                />
                {state.errors?.name && (
                  <p id="name-error" className="text-sm text-destructive font-medium">{state.errors.name[0]}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  aria-describedby="email-error"
                />
                {state.errors?.email && (
                  <p id="email-error" className="text-sm text-destructive font-medium">{state.errors.email[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="How can we help you?" 
                  aria-describedby="subject-error"
                />
                {state.errors?.subject && (
                  <p id="subject-error" className="text-sm text-destructive font-medium">{state.errors.subject[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Please describe your inquiry in detail..." 
                  className="min-h-[150px]"
                  aria-describedby="message-error"
                />
                {state.errors?.message && (
                  <p id="message-error" className="text-sm text-destructive font-medium">{state.errors.message[0]}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
