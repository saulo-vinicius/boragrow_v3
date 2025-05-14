"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Leaf, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "Basic features for hobbyist growers",
      price: "$0",
      period: "forever",
      features: [
        "Up to 2 plants",
        "Basic growth tracking",
        "Standard nutrient calculator",
        "Community support",
      ],
      limitations: [
        "Limited recipe storage",
        "No advanced analytics",
        "No premium nutrient formulas",
      ],
      icon: <Leaf className="h-5 w-5" />,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      description: "Advanced features for serious cultivators",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited plants",
        "Advanced growth tracking",
        "Premium nutrient calculator",
        "Recipe sharing",
        "Advanced analytics",
        "Premium nutrient formulas",
        "Priority support",
      ],
      limitations: [],
      icon: <Crown className="h-5 w-5" />,
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Annual",
      description: "Save 20% with annual billing",
      price: "$95.88",
      period: "per year",
      features: [
        "All Premium features",
        "2 months free",
        "Early access to new features",
        "API access",
        "Dedicated support",
      ],
      limitations: [],
      icon: <Zap className="h-5 w-5" />,
      buttonText: "Subscribe",
      buttonVariant: "default" as const,
      popular: false,
    },
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your growing needs. Upgrade or downgrade
          anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-full bg-primary/10">
                  {plan.icon}
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              <CardTitle className="text-xl mt-4">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li
                    key={i}
                    className="flex items-center text-muted-foreground"
                  >
                    <span className="h-4 w-4 mr-2 flex items-center justify-center">
                      -
                    </span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={plan.buttonVariant} className="w-full" asChild>
                <Link
                  href={plan.name === "Free" ? "/login" : "/login?plan=premium"}
                >
                  {plan.buttonText}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-medium mb-2">Need a custom plan?</h3>
        <p className="text-muted-foreground mb-4">
          Contact us for enterprise pricing and custom solutions.
        </p>
        <Button variant="outline" asChild>
          <Link href="#">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}
