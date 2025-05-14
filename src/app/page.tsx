"use client";

import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight, Check, Calculator, BarChart } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Introducing Bora Grow
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Track Your Plants, Maximize Your Yields
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The complete plant tracking solution for cultivators. Monitor
                growth, manage recipes, and optimize your growing environment.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto"
                  >
                    Try Premium
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80"
                  alt="Plants growing in a greenhouse"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  width="550"
                  height="310"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Grow
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Bora Grow provides all the tools you need to track and optimize
                your plant growth.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            {[
              {
                title: "Plant Tracking",
                description:
                  "Monitor growth metrics and visualize progress over time.",
                icon: <Leaf className="h-10 w-10 text-primary" />,
              },
              {
                title: "Recipe Management",
                description:
                  "Create and save nutrient recipes for consistent results.",
                icon: <Check className="h-10 w-10 text-primary" />,
              },
              {
                title: "Advanced Calculator",
                description:
                  "Calculate precise nutrient formulas and apply recipes to your plants for better tracking and cultivation.",
                icon: <ArrowRight className="h-10 w-10 text-primary" />,
              },
              {
                title: "Growth Analytics",
                description:
                  "Analyze trends and optimize your growing conditions.",
                icon: <ArrowRight className="h-10 w-10 text-primary" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 rounded-lg border p-4 bg-background"
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Choose the Right Plan for Your Needs
          </h2>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
            From hobbyist growers to professional cultivators, we have a plan
            that fits your needs.
          </p>
          <Button size="lg" asChild>
            <Link href="/pricing">View Pricing Plans</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
