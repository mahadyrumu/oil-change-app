"use client"

import { useActionState, useEffect } from "react";
import { registerAction } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerAction, { 
    success: false, 
    message: "", 
    errors: {} 
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      // Redirect to login after successful registration
      setTimeout(() => router.push("/login"), 1500);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="container mx-auto px-4 py-24 max-w-md min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Join to book appointments faster and track service history.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                aria-describedby="password-error"
              />
              {state.errors?.password && (
                <p id="password-error" className="text-sm text-destructive font-medium">{state.errors.password[0]}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground border-t pt-6">
          Already have an account? 
          <Link href="/login" className="text-primary hover:underline ml-1 font-medium">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
