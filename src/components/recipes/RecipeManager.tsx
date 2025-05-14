"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  ChevronDown,
  Search,
  Calendar,
} from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  createdAt: string;
  lastUsed?: string;
}

interface Plant {
  id: string;
  name: string;
  strain: string;
  stage: string;
  imageUrl: string;
}

interface RecipeManagerProps {
  recipes?: Recipe[];
  plants?: Plant[];
  onSaveRecipe?: (recipe: Recipe) => void;
  onDeleteRecipe?: (recipeId: string) => void;
  onApplyRecipe?: (recipeId: string, plantId: string, date: string) => void;
}

export default function RecipeManager({
  recipes = [
    {
      id: "1",
      name: "Vegetative Growth Formula",
      description:
        "Balanced formula for vegetative growth phase with higher nitrogen content.",
      ingredients: [
        { id: "1", name: "Nitrogen Solution", amount: 5, unit: "ml" },
        { id: "2", name: "Phosphorus Solution", amount: 3, unit: "ml" },
        { id: "3", name: "Potassium Solution", amount: 3, unit: "ml" },
        { id: "4", name: "CalMag", amount: 2, unit: "ml" },
      ],
      createdAt: "2023-10-15",
      lastUsed: "2023-11-01",
    },
    {
      id: "2",
      name: "Flowering Boost",
      description: "Higher phosphorus and potassium for flowering stage.",
      ingredients: [
        { id: "1", name: "Nitrogen Solution", amount: 2, unit: "ml" },
        { id: "2", name: "Phosphorus Solution", amount: 6, unit: "ml" },
        { id: "3", name: "Potassium Solution", amount: 5, unit: "ml" },
        { id: "4", name: "Bloom Enhancer", amount: 3, unit: "ml" },
      ],
      createdAt: "2023-09-20",
    },
  ],
  plants = [
    {
      id: "1",
      name: "Northern Lights",
      strain: "Indica",
      stage: "Vegetative",
      imageUrl:
        "https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=300&q=80",
    },
    {
      id: "2",
      name: "Haze",
      strain: "Sativa",
      stage: "Flowering",
      imageUrl:
        "https://images.unsplash.com/photo-1620463594504-5bd9505f35d4?w=300&q=80",
    },
  ],
  onSaveRecipe = () => {},
  onDeleteRecipe = () => {},
  onApplyRecipe = () => {},
}: RecipeManagerProps) {
  const [activeTab, setActiveTab] = useState("saved");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<string>("");
  const [applicationDate, setApplicationDate] = useState<string>("");

  // New recipe state
  const [newRecipe, setNewRecipe] = useState<{
    name: string;
    description: string;
    ingredients: Ingredient[];
  }>({
    name: "",
    description: "",
    ingredients: [{ id: "1", name: "", amount: 0, unit: "ml" }],
  });

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [
        ...newRecipe.ingredients,
        { id: Date.now().toString(), name: "", amount: 0, unit: "ml" },
      ],
    });
  };

  const handleRemoveIngredient = (id: string) => {
    setNewRecipe({
      ...newRecipe,
      ingredients: newRecipe.ingredients.filter((ing) => ing.id !== id),
    });
  };

  const handleIngredientChange = (
    id: string,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    setNewRecipe({
      ...newRecipe,
      ingredients: newRecipe.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing,
      ),
    });
  };

  const handleSaveRecipe = () => {
    const recipe: Recipe = {
      id: Date.now().toString(),
      name: newRecipe.name,
      description: newRecipe.description,
      ingredients: newRecipe.ingredients,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onSaveRecipe(recipe);

    // Reset form
    setNewRecipe({
      name: "",
      description: "",
      ingredients: [{ id: "1", name: "", amount: 0, unit: "ml" }],
    });

    // Switch to saved recipes tab
    setActiveTab("saved");
  };

  const handleApplyRecipe = () => {
    if (selectedRecipe && selectedPlant && applicationDate) {
      onApplyRecipe(selectedRecipe.id, selectedPlant, applicationDate);
      setIsApplyDialogOpen(false);
      setSelectedRecipe(null);
      setSelectedPlant("");
      setApplicationDate("");
    }
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold mb-6">Recipe Manager</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
          <TabsTrigger value="create">Create New Recipe</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{recipe.name}</CardTitle>
                      <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">Ingredients:</h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ingredient) => (
                          <li key={ingredient.id} className="text-sm">
                            {ingredient.name}: {ingredient.amount}{" "}
                            {ingredient.unit}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Created: {recipe.createdAt}</p>
                        {recipe.lastUsed && <p>Last used: {recipe.lastUsed}</p>}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRecipe(recipe);
                          setIsApplyDialogOpen(true);
                        }}
                      >
                        Apply to Plant
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onDeleteRecipe(recipe.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recipes found. Create your first recipe!
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Recipe</CardTitle>
              <CardDescription>
                Create a custom nutrient recipe for your plants.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipe-name">Recipe Name</Label>
                <Input
                  id="recipe-name"
                  placeholder="e.g., Vegetative Growth Formula"
                  value={newRecipe.name}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipe-description">Description</Label>
                <Textarea
                  id="recipe-description"
                  placeholder="Describe your recipe and its purpose"
                  value={newRecipe.description}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Ingredients</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddIngredient}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Ingredient
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newRecipe.ingredients.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell>
                          <Input
                            placeholder="Ingredient name"
                            value={ingredient.name}
                            onChange={(e) =>
                              handleIngredientChange(
                                ingredient.id,
                                "name",
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={ingredient.amount}
                            onChange={(e) =>
                              handleIngredientChange(
                                ingredient.id,
                                "amount",
                                parseFloat(e.target.value),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={ingredient.unit}
                            onValueChange={(value) =>
                              handleIngredientChange(
                                ingredient.id,
                                "unit",
                                value,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="tsp">tsp</SelectItem>
                              <SelectItem value="tbsp">tbsp</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveIngredient(ingredient.id)
                            }
                            disabled={newRecipe.ingredients.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  handleSaveRecipe();
                }}
                disabled={
                  !newRecipe.name ||
                  newRecipe.ingredients.some((ing) => !ing.name)
                }
              >
                <Save className="h-4 w-4 mr-2" /> Save Recipe
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply Recipe to Plant</DialogTitle>
            <DialogDescription>
              Select a plant and date to apply the recipe "
              {selectedRecipe?.name}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plant-select">Select Plant</Label>
              <Select value={selectedPlant} onValueChange={setSelectedPlant}>
                <SelectTrigger id="plant-select">
                  <SelectValue placeholder="Select a plant" />
                </SelectTrigger>
                <SelectContent>
                  {plants.map((plant) => (
                    <SelectItem key={plant.id} value={plant.id}>
                      {plant.name} ({plant.strain}) - {plant.stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="application-date">Application Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="application-date"
                  type="date"
                  className="pl-10"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsApplyDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleApplyRecipe();
              }}
              disabled={!selectedPlant || !applicationDate}
            >
              Apply Recipe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
