"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { format } from "date-fns";

interface MetricsChartProps {
  plantId?: string;
  data?: {
    date: Date;
    ph: number;
    ppm: number;
    temperature: number;
    humidity: number;
    recipeApplied?: string;
  }[];
}

const MetricsChart = ({
  plantId = "1",
  data = defaultData,
}: MetricsChartProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  });

  const [visibleMetrics, setVisibleMetrics] = useState({
    ph: true,
    ppm: true,
    temperature: true,
    humidity: true,
  });

  const [zoomLevel, setZoomLevel] = useState(1);

  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const zoomIn = () => {
    if (zoomLevel < 3) setZoomLevel(zoomLevel + 0.5);
  };

  const zoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.5);
  };

  const filteredData = data.filter(
    (item) => item.date >= dateRange.from && item.date <= dateRange.to,
  );

  // Calculate chart dimensions and scales based on data
  const chartWidth = 1000 * zoomLevel;
  const chartHeight = 300;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };

  // Find min/max values for each metric to scale the chart
  const maxPh = Math.max(...filteredData.map((d) => d.ph), 7.5);
  const minPh = Math.min(...filteredData.map((d) => d.ph), 5.5);
  const maxPpm = Math.max(...filteredData.map((d) => d.ppm), 1500);
  const minPpm = Math.min(...filteredData.map((d) => d.ppm), 0);
  const maxTemp = Math.max(...filteredData.map((d) => d.temperature), 30);
  const minTemp = Math.min(...filteredData.map((d) => d.temperature), 15);
  const maxHumidity = Math.max(...filteredData.map((d) => d.humidity), 80);
  const minHumidity = Math.min(...filteredData.map((d) => d.humidity), 40);

  // Calculate x and y positions for data points
  const getX = (index: number) => {
    const innerWidth = chartWidth - padding.left - padding.right;
    return padding.left + (index / (filteredData.length - 1)) * innerWidth;
  };

  const getY = (value: number, min: number, max: number) => {
    const innerHeight = chartHeight - padding.top - padding.bottom;
    return (
      chartHeight - padding.bottom - ((value - min) / (max - min)) * innerHeight
    );
  };

  // Generate SVG paths for each metric
  const generatePath = (metric: "ph" | "ppm" | "temperature" | "humidity") => {
    let min, max;
    switch (metric) {
      case "ph":
        min = minPh;
        max = maxPh;
        break;
      case "ppm":
        min = minPpm;
        max = maxPpm;
        break;
      case "temperature":
        min = minTemp;
        max = maxTemp;
        break;
      case "humidity":
        min = minHumidity;
        max = maxHumidity;
        break;
    }

    return filteredData
      .map((d, i) => {
        const x = getX(i);
        const y = getY(d[metric], min, max);
        return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
      })
      .join(" ");
  };

  // Generate optimal range zones
  const optimalRanges = {
    ph: { min: 5.8, max: 6.5 },
    ppm: { min: 500, max: 1200 },
    temperature: { min: 20, max: 26 },
    humidity: { min: 50, max: 70 },
  };

  const generateOptimalZone = (
    metric: "ph" | "ppm" | "temperature" | "humidity",
  ) => {
    let min, max, optMin, optMax;
    switch (metric) {
      case "ph":
        min = minPh;
        max = maxPh;
        optMin = optimalRanges.ph.min;
        optMax = optimalRanges.ph.max;
        break;
      case "ppm":
        min = minPpm;
        max = maxPpm;
        optMin = optimalRanges.ppm.min;
        optMax = optimalRanges.ppm.max;
        break;
      case "temperature":
        min = minTemp;
        max = maxTemp;
        optMin = optimalRanges.temperature.min;
        optMax = optimalRanges.temperature.max;
        break;
      case "humidity":
        min = minHumidity;
        max = maxHumidity;
        optMin = optimalRanges.humidity.min;
        optMax = optimalRanges.humidity.max;
        break;
    }

    const y1 = getY(optMax, min, max);
    const y2 = getY(optMin, min, max);
    const x1 = padding.left;
    const x2 = chartWidth - padding.right;

    return `M ${x1},${y1} L ${x2},${y1} L ${x2},${y2} L ${x1},${y2} Z`;
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Plant Metrics</CardTitle>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from ? (
                  <>
                    {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                    {format(dateRange.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({
                      from: range.from,
                      to: range.to,
                    });
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={visibleMetrics.ph ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMetric("ph")}
                className="flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                pH
              </Button>
              <Button
                variant={visibleMetrics.ppm ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMetric("ppm")}
                className="flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-green-500" />
                PPM
              </Button>
              <Button
                variant={visibleMetrics.temperature ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMetric("temperature")}
                className="flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Temperature
              </Button>
              <Button
                variant={visibleMetrics.humidity ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMetric("humidity")}
                className="flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                Humidity
              </Button>
            </div>

            <div className="relative overflow-x-auto">
              <svg
                width={chartWidth}
                height={chartHeight}
                className="border border-border rounded-md"
              >
                {/* Optimal zones */}
                {visibleMetrics.ph && (
                  <path
                    d={generateOptimalZone("ph")}
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="none"
                  />
                )}
                {visibleMetrics.ppm && (
                  <path
                    d={generateOptimalZone("ppm")}
                    fill="rgba(34, 197, 94, 0.1)"
                    stroke="none"
                  />
                )}
                {visibleMetrics.temperature && (
                  <path
                    d={generateOptimalZone("temperature")}
                    fill="rgba(239, 68, 68, 0.1)"
                    stroke="none"
                  />
                )}
                {visibleMetrics.humidity && (
                  <path
                    d={generateOptimalZone("humidity")}
                    fill="rgba(168, 85, 247, 0.1)"
                    stroke="none"
                  />
                )}

                {/* Grid lines */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const y =
                    padding.top +
                    (i * (chartHeight - padding.top - padding.bottom)) / 4;
                  return (
                    <line
                      key={`grid-h-${i}`}
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#e5e7eb"
                      strokeDasharray="4"
                    />
                  );
                })}

                {filteredData.map((_, i) => {
                  if (i % Math.ceil(filteredData.length / 10) !== 0)
                    return null;
                  const x = getX(i);
                  return (
                    <line
                      key={`grid-v-${i}`}
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={chartHeight - padding.bottom}
                      stroke="#e5e7eb"
                      strokeDasharray="4"
                    />
                  );
                })}

                {/* X and Y axis */}
                <line
                  x1={padding.left}
                  y1={chartHeight - padding.bottom}
                  x2={chartWidth - padding.right}
                  y2={chartHeight - padding.bottom}
                  stroke="#9ca3af"
                />
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={chartHeight - padding.bottom}
                  stroke="#9ca3af"
                />

                {/* Data lines */}
                {visibleMetrics.ph && (
                  <path
                    d={generatePath("ph")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                )}
                {visibleMetrics.ppm && (
                  <path
                    d={generatePath("ppm")}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                )}
                {visibleMetrics.temperature && (
                  <path
                    d={generatePath("temperature")}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                )}
                {visibleMetrics.humidity && (
                  <path
                    d={generatePath("humidity")}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  />
                )}

                {/* Data points */}
                {filteredData.map((d, i) => {
                  const x = getX(i);
                  return (
                    <React.Fragment key={`points-${i}`}>
                      {visibleMetrics.ph && (
                        <circle
                          cx={x}
                          cy={getY(d.ph, minPh, maxPh)}
                          r="3"
                          fill="#3b82f6"
                        />
                      )}
                      {visibleMetrics.ppm && (
                        <circle
                          cx={x}
                          cy={getY(d.ppm, minPpm, maxPpm)}
                          r="3"
                          fill="#22c55e"
                        />
                      )}
                      {visibleMetrics.temperature && (
                        <circle
                          cx={x}
                          cy={getY(d.temperature, minTemp, maxTemp)}
                          r="3"
                          fill="#ef4444"
                        />
                      )}
                      {visibleMetrics.humidity && (
                        <circle
                          cx={x}
                          cy={getY(d.humidity, minHumidity, maxHumidity)}
                          r="3"
                          fill="#a855f7"
                        />
                      )}

                      {/* Recipe application markers */}
                      {d.recipeApplied && (
                        <g>
                          <line
                            x1={x}
                            y1={padding.top}
                            x2={x}
                            y2={chartHeight - padding.bottom}
                            stroke="#f59e0b"
                            strokeWidth="1"
                            strokeDasharray="4"
                          />
                          <circle
                            cx={x}
                            cy={padding.top}
                            r="4"
                            fill="#f59e0b"
                          />
                        </g>
                      )}

                      {/* X-axis labels (dates) */}
                      {i % Math.ceil(filteredData.length / 5) === 0 && (
                        <text
                          x={x}
                          y={chartHeight - padding.bottom + 15}
                          textAnchor="middle"
                          fontSize="10"
                          fill="currentColor"
                        >
                          {format(d.date, "MMM dd")}
                        </text>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Y-axis labels */}
                <text
                  x={padding.left - 35}
                  y={padding.top + 10}
                  textAnchor="start"
                  fontSize="10"
                  fill="currentColor"
                >
                  Max
                </text>
                <text
                  x={padding.left - 35}
                  y={chartHeight - padding.bottom}
                  textAnchor="start"
                  fontSize="10"
                  fill="currentColor"
                >
                  Min
                </text>

                {/* Legend for recipe markers */}
                <g
                  transform={`translate(${chartWidth - padding.right - 120}, ${padding.top + 10})`}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="15"
                    y2="0"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <circle cx="7" cy="0" r="4" fill="#f59e0b" />
                  <text x="20" y="4" fontSize="10" fill="currentColor">
                    Recipe Applied
                  </text>
                </g>
              </svg>
            </div>
          </TabsContent>
          <TabsContent value="table">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Time</th>
                    <th className="p-2 text-left">pH</th>
                    <th className="p-2 text-left">PPM</th>
                    <th className="p-2 text-left">Temp (°C)</th>
                    <th className="p-2 text-left">Humidity (%)</th>
                    <th className="p-2 text-left">Recipe</th>
                    <th className="p-2 text-left">Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((d, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{format(d.date, "MMM dd, yyyy")}</td>
                      <td className="p-2">{format(d.date, "HH:mm")}</td>
                      <td className="p-2">{d.ph.toFixed(1)}</td>
                      <td className="p-2">{d.ppm}</td>
                      <td className="p-2">{d.temperature}°C</td>
                      <td className="p-2">{d.humidity}%</td>
                      <td className="p-2">{d.recipeApplied || "-"}</td>
                      <td className="p-2">
                        {format(d.date, "MMM dd, yyyy HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Sample data for demonstration
const defaultData = [
  {
    date: new Date(2023, 4, 1),
    ph: 6.2,
    ppm: 650,
    temperature: 23,
    humidity: 65,
  },
  {
    date: new Date(2023, 4, 2),
    ph: 6.3,
    ppm: 680,
    temperature: 24,
    humidity: 63,
    recipeApplied: "Veg Boost",
  },
  {
    date: new Date(2023, 4, 3),
    ph: 6.1,
    ppm: 720,
    temperature: 23.5,
    humidity: 62,
  },
  {
    date: new Date(2023, 4, 4),
    ph: 6.0,
    ppm: 750,
    temperature: 22,
    humidity: 64,
  },
  {
    date: new Date(2023, 4, 5),
    ph: 5.9,
    ppm: 800,
    temperature: 22.5,
    humidity: 66,
  },
  {
    date: new Date(2023, 4, 6),
    ph: 6.0,
    ppm: 830,
    temperature: 23,
    humidity: 65,
  },
  {
    date: new Date(2023, 4, 7),
    ph: 6.1,
    ppm: 850,
    temperature: 24,
    humidity: 63,
    recipeApplied: "Micro Nutrients",
  },
  {
    date: new Date(2023, 4, 8),
    ph: 6.2,
    ppm: 900,
    temperature: 25,
    humidity: 60,
  },
  {
    date: new Date(2023, 4, 9),
    ph: 6.3,
    ppm: 950,
    temperature: 24.5,
    humidity: 62,
  },
  {
    date: new Date(2023, 4, 10),
    ph: 6.2,
    ppm: 980,
    temperature: 23,
    humidity: 64,
  },
  {
    date: new Date(2023, 4, 11),
    ph: 6.1,
    ppm: 1000,
    temperature: 22,
    humidity: 66,
  },
  {
    date: new Date(2023, 4, 12),
    ph: 6.0,
    ppm: 1050,
    temperature: 21.5,
    humidity: 68,
    recipeApplied: "Bloom Starter",
  },
  {
    date: new Date(2023, 4, 13),
    ph: 5.9,
    ppm: 1100,
    temperature: 22,
    humidity: 67,
  },
  {
    date: new Date(2023, 4, 14),
    ph: 5.8,
    ppm: 1150,
    temperature: 23,
    humidity: 65,
  },
];

export default MetricsChart;
