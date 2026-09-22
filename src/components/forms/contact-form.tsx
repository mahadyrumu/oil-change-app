"use client";

import { useActionState, useEffect, useTransition } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send } from "lucide-react";

export function ContactForm() {
  const [state, formAction, isPendingServer] = useActionState(submitContactForm, {
    success: false, message: "", errors: {}
  });
  
  const [isPendingClient, startTransition] = useTransition();
  const isPending = isPendingServer || isPendingClient;

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-[#1F2937]">Full Name</label>
          <Input 
            id="name" 
            name="name" 
            placeholder="John Doe" 
            className="h-12 bg-white/50 border-gray-200 focus-visible:ring-primary/20 transition-all rounded-xl shadow-sm"
          />
          {state.errors?.name && <p className="text-sm text-destructive font-medium">{state.errors.name[0]}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-[#1F2937]">Email Address</label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="john@example.com" 
            className="h-12 bg-white/50 border-gray-200 focus-visible:ring-primary/20 transition-all rounded-xl shadow-sm"
          />
          {state.errors?.email && <p className="text-sm text-destructive font-medium">{state.errors.email[0]}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-semibold text-[#1F2937]">Subject</label>
        <Input 
          id="subject" 
          name="subject" 
          placeholder="How can we help?" 
          className="h-12 bg-white/50 border-gray-200 focus-visible:ring-primary/20 transition-all rounded-xl shadow-sm"
        />
        {state.errors?.subject && <p className="text-sm text-destructive font-medium">{state.errors.subject[0]}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-[#1F2937]">Message</label>
        <Textarea 
          id="message" 
          name="message" 
          placeholder="Please describe your inquiry in detail..." 
          className="min-h-[160px] resize-y bg-white/50 border-gray-200 focus-visible:ring-primary/20 transition-all rounded-xl shadow-sm p-4"
        />
        {state.errors?.message && <p className="text-sm text-destructive font-medium">{state.errors.message[0]}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={isPending} 
        className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-bold"
      >
        {isPending ? "Sending Message..." : "Send Message"} <Send className="ml-2 w-5 h-5" />
      </Button>
    </form>
  );
}
