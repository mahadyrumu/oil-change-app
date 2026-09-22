"use server"

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

export async function submitContactForm(prevState: any, formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please fix the errors in the form.",
    };
  }

  // In a real application, you would send an email (e.g., using Resend or SendGrid) 
  // or save this to the database here.
  console.log("Contact form submitted successfully:", parsed.data);

  return {
    success: true,
    message: "Thank you for reaching out! We will get back to you shortly.",
    errors: {}
  };
}
