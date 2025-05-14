"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Clock, Trash2 } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  description?: string;
  substances: any[];
  elements: any[];
  solution_volume: number;
  volume_unit: string;
  ec_value?: string;
  created_at: string;
}

export default function RecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved recipes from localStorage
    const loadRecipes = () => {
      try {
        const storedRecipes = localStorage.getItem("boraGrowRecipes");
        if (storedRecipes) {
          setSavedRecipes(JSON.parse(storedRecipes));
        }
      } catch (error) {
        console.error("Error loading recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();

    // Set up event listener for recipe changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "boraGrowRecipes") {
        loadRecipes();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDeleteRecipe = (recipeId: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      const updatedRecipes = savedRecipes.filter(
        (recipe) => recipe.id !== recipeId,
      );
      setSavedRecipes(updatedRecipes);
      localStorage.setItem("boraGrowRecipes", JSON.stringify(updatedRecipes));
    }
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Nutrient Recipes</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </div>
                </div>
                {recipe.description && (
                  <p className="text-sm text-muted-foreground">
                    {recipe.description}
                  </p>
                )}
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-sm">
                    <span className="font-medium">Volume:</span>{" "}
                    {recipe.solution_volume} {recipe.volume_unit}
                  </div>
                  {recipe.ec_value && (
                    <div className="text-sm">
                      <span className="font-medium">EC Value:</span>{" "}
                      {recipe.ec_value} mS/cm
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.substances
                    .slice(0, 3)
                    .map((substance: any, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-muted px-1.5 py-0.5 rounded-sm"
                      >
                        {substance.name}
                      </span>
                    ))}
                  {recipe.substances.length > 3 && (
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded-sm">
                      +{recipe.substances.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      // Navigate to calculator with this recipe
                      window.location.href = "/calculator";
                    }}
                  >
                    <Bookmark className="h-4 w-4 mr-1" />
                    Use Recipe
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDeleteRecipe(recipe.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No Saved Recipes</h3>
          <p className="text-muted-foreground mb-4">
            You haven't saved any nutrient recipes yet. Create your first recipe
            in the calculator.
          </p>
          <Button asChild>
            <a href="/calculator">Go to Calculator</a>
          </Button>
        </div>
      )}
    </div>
  );
}
