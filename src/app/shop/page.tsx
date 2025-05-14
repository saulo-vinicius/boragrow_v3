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
import { ShoppingBag, Package } from "lucide-react";

export default function ShopPage() {
  const products = [
    {
      id: "prod_1",
      name: "Premium Nutrient Kit",
      description: "Complete nutrient kit for all growth stages",
      price: "$49.99",
      image:
        "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=300&q=80",
    },
    {
      id: "prod_2",
      name: "pH Testing Kit",
      description: "Professional pH testing kit with digital reader",
      price: "$29.99",
      image:
        "https://images.unsplash.com/photo-1603899968034-12aadcdbfdc0?w=300&q=80",
    },
    {
      id: "prod_3",
      name: "Grow Lights - LED Panel",
      description: "Full spectrum LED grow lights for indoor cultivation",
      price: "$89.99",
      image:
        "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?w=300&q=80",
    },
    {
      id: "prod_4",
      name: "Organic Soil Mix",
      description: "Premium organic soil mix for optimal plant growth",
      price: "$19.99",
      image:
        "https://images.unsplash.com/photo-1628196237219-9d0ab2abeee1?w=300&q=80",
    },
    {
      id: "prod_5",
      name: "Humidity Controller",
      description: "Digital humidity controller with automatic settings",
      price: "$39.99",
      image:
        "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=300&q=80",
    },
    {
      id: "prod_6",
      name: "Grow Tent - Medium",
      description: "Reflective interior grow tent for indoor cultivation",
      price: "$129.99",
      image:
        "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?w=300&q=80",
    },
  ];

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shop</h1>
        <Button variant="outline" size="sm">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Cart (0)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{product.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Package className="h-4 w-4 mr-2" />
                Details
              </Button>
              <Button>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-muted-foreground">
        <p>
          This is a demo shop page. In a real application, this would connect to
          an e-commerce backend.
        </p>
      </div>
    </div>
  );
}
