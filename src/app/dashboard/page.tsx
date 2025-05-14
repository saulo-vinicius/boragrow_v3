"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Plus, Settings, User } from "lucide-react";
import PlantCard from "@/components/plants/PlantCard";
import MetricsChart from "@/components/plants/MetricsChart";
import BoraGrowCalculator from "@/components/calculator/BoraGrowCalculator";
import RecipeManager from "@/components/recipes/RecipeManager";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCancel,
  DialogAction,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  // Mock data for demonstration
  const user = {
    name: "John Doe",
    email: "john@example.com",
    subscription: "free", // 'free' or 'premium'
    plantsCount: 2,
    plantsLimit: 2,
  };

  const plants = [
    {
      id: "1",
      name: "Northern Lights",
      strain: "Indica",
      stage: "Vegetative",
      age: "4 weeks",
      image:
        "https://images.unsplash.com/photo-1620463594504-5dc0c5f4e03a?w=300&q=80",
      metrics: {
        ph: 6.2,
        ppm: 650,
        temperature: 24,
        humidity: 65,
      },
    },
    {
      id: "2",
      name: "Sour Diesel",
      strain: "Sativa",
      stage: "Flowering",
      age: "8 weeks",
      image:
        "https://images.unsplash.com/photo-1603909223429-69bb7101f94e?w=300&q=80",
      metrics: {
        ph: 5.8,
        ppm: 850,
        temperature: 26,
        humidity: 55,
      },
    },
  ];

  const [isLogMetricsDialogOpen, setIsLogMetricsDialogOpen] = useState(false);
  const [selectedPlantForMetrics, setSelectedPlantForMetrics] =
    useState<any>(null);
  const [metricsForm, setMetricsForm] = useState({
    ph: "6.0",
    ppm: "500",
    temperature: "24",
    humidity: "60",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(" ")[0].slice(0, 5),
    notes: "",
  });

  const [plantForm, setPlantForm] = useState({
    name: "",
    strain: "",
    stage: "seedling",
    soilType: "coco_coir", // Default values since these are new fields
    potSize: "",
    seedType: "",
    environment: "indoor",
    lightType: "",
    ph: "6.0",
    ppm: "500",
    temperature: "24",
    humidity: "60",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setPlantForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlant = () => {
    // Here you would add the plant to your database
    console.log("Adding plant:", plantForm);
    setIsAddPlantDialogOpen(false);
    // In a real app, you would refresh the plants data after adding
  };

  const handleEditPlant = () => {
    // Here you would update the plant in your database
    console.log("Editing plant:", selectedPlant?.id, plantForm);
    setIsEditPlantDialogOpen(false);
    // In a real app, you would refresh the plants data after editing
  };

  const handleDeletePlant = () => {
    // Here you would delete the plant from your database
    console.log("Deleting plant:", selectedPlant?.id);
    setIsDeleteDialogOpen(false);
    // In a real app, you would refresh the plants data after deleting
  };

  const handleLogMetrics = (plantId: string) => {
    const plant = plants.find((p) => p.id === plantId);
    if (plant) {
      setSelectedPlantForMetrics(plant);
      setMetricsForm({
        ph: plant.metrics?.ph?.toString() || "6.0",
        ppm: plant.metrics?.ppm?.toString() || "500",
        temperature: plant.metrics?.temperature?.toString() || "24",
        humidity: plant.metrics?.humidity?.toString() || "60",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().split(" ")[0].slice(0, 5),
        notes: "",
      });
      setIsLogMetricsDialogOpen(true);
    }
  };

  const handleMetricsInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMetricsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveMetrics = () => {
    // Here you would save the metrics to your database
    console.log(
      "Saving metrics for plant:",
      selectedPlantForMetrics?.id,
      metricsForm,
    );
    setIsLogMetricsDialogOpen(false);
    // In a real app, you would refresh the metrics data after saving
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container py-6">
        {/* Subscription Status */}
        {user.subscription === "free" && (
          <Card className="mb-6 bg-muted/50">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">
                  Free Plan: {user.plantsCount}/{user.plantsLimit} plants
                </p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Premium for unlimited plants and more features
                </p>
              </div>
              <Button>Upgrade Now</Button>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Tabs */}
        <Tabs defaultValue="plants" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="plants">My Plants</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              {user.subscription === "premium" ||
              user.plantsCount < user.plantsLimit ? (
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Plant
                </Button>
              ) : null}
            </div>
          </div>

          {/* My Plants Tab */}
          <TabsContent value="plants" className="space-y-6">
            {/* Overview Card with Metrics Chart - Moved to top */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Plants Overview</CardTitle>
                    <CardDescription>
                      Track and monitor your plants' growth and health
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      user.subscription === "premium" ? "default" : "outline"
                    }
                  >
                    {user.subscription === "premium" ? "Premium" : "Free"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Metrics Chart */}
                <div className="h-[400px] w-full">
                  <MetricsChart />
                </div>
              </CardContent>
            </Card>

            {/* Plant Cards - Moved below chart */}
            <h3 className="text-xl font-semibold mt-8 mb-4">My Plants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  id={plant.id}
                  name={plant.name}
                  strain={plant.strain}
                  stage={plant.stage.toLowerCase()}
                  soilType="coco_coir" // Default values since these are new fields
                  potSize=""
                  seedType=""
                  environment="indoor"
                  lightType=""
                  ph="6.0"
                  ppm="500"
                  temperature="24"
                  humidity="60"
                  notes=""
                  onLogData={(id) => handleLogMetrics(id)}
                  onViewHistory={(id) => console.log("View history for", id)}
                  onApplyRecipe={(id) => console.log("Apply recipe for", id)}
                  onEdit={() => {
                    setSelectedPlant(plant);
                    setPlantForm({
                      name: plant.name,
                      strain: plant.strain,
                      stage: plant.stage.toLowerCase(),
                      soilType: "coco_coir",
                      potSize: "",
                      seedType: "",
                      environment: "indoor",
                      lightType: "",
                      ph: "6.0",
                      ppm: "500",
                      temperature: "24",
                      humidity: "60",
                      notes: "",
                    });
                    setIsEditPlantDialogOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedPlant(plant);
                    setIsDeleteDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </TabsContent>

          {/* Recipes Tab */}
          <TabsContent value="recipes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Nutrient Recipes</CardTitle>
                    <CardDescription>
                      Create and manage your nutrient recipes
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/calculator")}
                  >
                    Create New Recipe
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <RecipeManager />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator">
            <BoraGrowCalculator />
          </TabsContent>

          {/* Suggested Items Tab */}
          <TabsContent value="suggested">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Items</CardTitle>
                <CardDescription>
                  Recommended products for your growing needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Suggested items will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Plant Dialog */}
      <Dialog
        open={isAddPlantDialogOpen}
        onOpenChange={setIsAddPlantDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Plant</DialogTitle>
            <DialogDescription>
              Enter the details of your new plant
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plant Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={plantForm.name}
                  onChange={handleInputChange}
                  placeholder="Northern Lights"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="strain">Strain</Label>
                <Input
                  id="strain"
                  name="strain"
                  value={plantForm.strain}
                  onChange={handleInputChange}
                  placeholder="Indica, Sativa, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Growth Stage</Label>
                <select
                  id="stage"
                  name="stage"
                  value={plantForm.stage}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="seedling">Seedling</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="harvest">Harvest</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="soilType">Growing Medium</Label>
                <select
                  id="soilType"
                  name="soilType"
                  value={plantForm.soilType}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="coco_coir">Coco Coir</option>
                  <option value="soil">Soil</option>
                  <option value="hydro">Hydroponics</option>
                  <option value="perlite">Perlite</option>
                  <option value="rockwool">Rockwool</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="potSize">Pot Size</Label>
                <Input
                  id="potSize"
                  name="potSize"
                  value={plantForm.potSize}
                  onChange={handleInputChange}
                  placeholder="5 gallons"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seedType">Seed Type</Label>
                <Input
                  id="seedType"
                  name="seedType"
                  value={plantForm.seedType}
                  onChange={handleInputChange}
                  placeholder="Auto, Photo, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <select
                  id="environment"
                  name="environment"
                  value={plantForm.environment}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="greenhouse">Greenhouse</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lightType">Light Type</Label>
                <Input
                  id="lightType"
                  name="lightType"
                  value={plantForm.lightType}
                  onChange={handleInputChange}
                  placeholder="LED, HPS, etc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={plantForm.notes}
                onChange={handleInputChange}
                placeholder="Any additional information about your plant..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddPlantDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddPlant}>Add Plant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plant Dialog */}
      <Dialog
        open={isEditPlantDialogOpen}
        onOpenChange={setIsEditPlantDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Plant</DialogTitle>
            <DialogDescription>
              Update the details of your plant
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Plant Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={plantForm.name}
                  onChange={handleInputChange}
                  placeholder="Northern Lights"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-strain">Strain</Label>
                <Input
                  id="edit-strain"
                  name="strain"
                  value={plantForm.strain}
                  onChange={handleInputChange}
                  placeholder="Indica, Sativa, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-stage">Growth Stage</Label>
                <select
                  id="edit-stage"
                  name="stage"
                  value={plantForm.stage}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="seedling">Seedling</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="harvest">Harvest</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-soilType">Growing Medium</Label>
                <select
                  id="edit-soilType"
                  name="soilType"
                  value={plantForm.soilType}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="coco_coir">Coco Coir</option>
                  <option value="soil">Soil</option>
                  <option value="hydro">Hydroponics</option>
                  <option value="perlite">Perlite</option>
                  <option value="rockwool">Rockwool</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-potSize">Pot Size</Label>
                <Input
                  id="edit-potSize"
                  name="potSize"
                  value={plantForm.potSize}
                  onChange={handleInputChange}
                  placeholder="5 gallons"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-seedType">Seed Type</Label>
                <Input
                  id="edit-seedType"
                  name="seedType"
                  value={plantForm.seedType}
                  onChange={handleInputChange}
                  placeholder="Auto, Photo, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-environment">Environment</Label>
                <select
                  id="edit-environment"
                  name="environment"
                  value={plantForm.environment}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="greenhouse">Greenhouse</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lightType">Light Type</Label>
                <Input
                  id="edit-lightType"
                  name="lightType"
                  value={plantForm.lightType}
                  onChange={handleInputChange}
                  placeholder="LED, HPS, etc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                name="notes"
                value={plantForm.notes}
                onChange={handleInputChange}
                placeholder="Any additional information about your plant..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditPlantDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditPlant}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Plant Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              plant and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePlant}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Log Metrics Dialog */}
      <Dialog
        open={isLogMetricsDialogOpen}
        onOpenChange={setIsLogMetricsDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log Plant Metrics</DialogTitle>
            <DialogDescription>
              Record daily metrics for {selectedPlantForMetrics?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metrics-date">Date</Label>
                <Input
                  id="metrics-date"
                  name="date"
                  type="date"
                  value={metricsForm.date}
                  onChange={handleMetricsInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrics-time">Time</Label>
                <Input
                  id="metrics-time"
                  name="time"
                  type="time"
                  value={metricsForm.time}
                  onChange={handleMetricsInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metrics-ph">pH</Label>
                <Input
                  id="metrics-ph"
                  name="ph"
                  type="number"
                  step="0.1"
                  value={metricsForm.ph}
                  onChange={handleMetricsInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrics-ppm">PPM</Label>
                <Input
                  id="metrics-ppm"
                  name="ppm"
                  type="number"
                  value={metricsForm.ppm}
                  onChange={handleMetricsInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metrics-temperature">Temperature (°C)</Label>
                <Input
                  id="metrics-temperature"
                  name="temperature"
                  type="number"
                  value={metricsForm.temperature}
                  onChange={handleMetricsInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrics-humidity">Humidity (%)</Label>
                <Input
                  id="metrics-humidity"
                  name="humidity"
                  type="number"
                  value={metricsForm.humidity}
                  onChange={handleMetricsInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="metrics-notes">Notes</Label>
              <Textarea
                id="metrics-notes"
                name="notes"
                value={metricsForm.notes}
                onChange={handleMetricsInputChange}
                placeholder="Any observations about your plant..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLogMetricsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveMetrics}>Save Metrics</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
