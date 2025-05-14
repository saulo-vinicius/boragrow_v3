"use client";

import React from "react";
import BoraGrowCalculator from "@/components/calculator/BoraGrowCalculator";

export default function CalculatorPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Nutrient Calculator</h1>
      <BoraGrowCalculator />
    </div>
  );
}
