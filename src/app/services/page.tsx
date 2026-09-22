import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Clock, CheckCircle2 } from "lucide-react";

export const revalidate = 3600; // Cache and revalidate every hour for high performance (Lighthouse 90+)

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Our Premium Services</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Choose the right oil change package for your vehicle. All packages include a comprehensive 20-point inspection and fluid top-off.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No services currently available. Please check back later.
          </div>
        )}
        
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{service.name}</CardTitle>
              <CardDescription className="text-base mt-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="my-6">
                <span className="text-4xl font-bold">${service.price.toFixed(2)}</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4 text-primary" />
                  Estimated Time: {service.duration} mins
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-secondary" />
                  Up to 5 quarts of oil
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-secondary" />
                  Premium oil filter replacement
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link
                href={`/book?serviceId=${service.id}`}
                className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Book This Service
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
