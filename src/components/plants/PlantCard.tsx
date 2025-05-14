"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Droplet,
  Thermometer,
  Gauge,
  History,
  FlaskConical,
  Edit,
} from "lucide-react";

interface PlantMetrics {
  ph: number;
  ppm: number;
  temperature: number;
  humidity: number;
  lastUpdated: string;
}

interface PlantCardProps {
  id?: string;
  name?: string;
  strain?: string;
  stage?: string;
  imageUrl?: string;
  metrics?: PlantMetrics;
  onLogData?: (id: string) => void;
  onViewHistory?: (id: string) => void;
  onApplyRecipe?: (id: string) => void;
}

const PlantCard = ({
  id = "plant-1",
  name = "Northern Lights",
  strain = "Indica",
  stage = "Vegetative",
  imageUrl = "https://images.unsplash.com/photo-1620921568790-c1cf8984624c?w=400&q=80",
  metrics = {
    ph: 6.5,
    ppm: 850,
    temperature: 24,
    humidity: 65,
    lastUpdated: "2023-06-15T14:30:00Z",
  },
  onLogData = () => {},
  onViewHistory = () => {},
  onApplyRecipe = () => {},
}: PlantCardProps) => {
  // Format the last updated date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Determine badge color based on growth stage
  const getStageBadgeColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "seedling":
        return "bg-blue-500";
      case "vegetative":
        return "bg-green-500";
      case "flowering":
        return "bg-purple-500";
      case "harvest":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-[350px] h-[450px] overflow-hidden bg-background border-2 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden bg-muted/30 flex items-center justify-center">
        <div className="absolute top-2 right-2">
          <Badge className={`${getStageBadgeColor(stage)} text-white`}>
            {stage}
          </Badge>
        </div>
        <Leaf className="h-16 w-16 text-muted-foreground/40" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{strain}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <Droplet className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">pH</p>
                <p className="font-medium">{metrics.ph}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <Gauge className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">PPM</p>
                <p className="font-medium">{metrics.ppm}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <Thermometer className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Temp</p>
                <p className="font-medium">{metrics.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <Leaf className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-medium">{metrics.humidity}%</p>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Last updated</p>
            <p className="text-sm">{formatDate(metrics.lastUpdated)}</p>
          </div>

          {/* Mini metrics chart placeholder */}
          <div className="h-16 bg-muted/30 rounded-md flex items-center justify-center">
            <p className="text-xs text-muted-foreground">
              Metrics trend (7 days)
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLogData(id)}
          className="flex items-center gap-1"
        >
          <Droplet className="h-3.5 w-3.5" />
          Log Data
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewHistory(id)}
          className="flex items-center gap-1"
        >
          <History className="h-3.5 w-3.5" />
          History
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onApplyRecipe(id)}
          className="flex items-center gap-1"
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
