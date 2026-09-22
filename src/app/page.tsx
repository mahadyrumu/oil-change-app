import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full bg-primary/5 py-24 lg:py-32 xl:py-48 flex items-center justify-center border-b">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 mx-auto">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-foreground">
              Expert Oil Changes, <br/>
              <span className="text-primary">Done Right.</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the fastest, most reliable oil change service. Book your appointment online today and keep your engine running smoothly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/book" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Book an Appointment
            </Link>
            <Link 
              href="/services" 
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-card px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Overview Placeholder */}
      <section className="w-full py-20 flex justify-center bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Our Core Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a range of premium motor oil options to suit your vehicle's specific needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
