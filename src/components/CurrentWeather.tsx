import { WeatherIcon } from "./WeatherIcon";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface CurrentWeatherProps {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  location: string;
}

export const CurrentWeather = ({
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
  pressure,
  location,
}: CurrentWeatherProps) => {
  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-0 animate-fade-in text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          <h2 className="text-2xl font-medium">{location}</h2>
        </div>
        <div className="flex items-center gap-4">
          <WeatherIcon icon={icon} className="w-12 h-12" />
          <div className="text-right">
            <p className="text-4xl font-semibold">{temperature}°C</p>
            <p className="text-sm capitalize">{description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <p className="opacity-80">Humidity</p>
          <p className="font-medium">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="opacity-80">Wind</p>
          <p className="font-medium">{windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <p className="opacity-80">Pressure</p>
          <p className="font-medium">{pressure} hPa</p>
        </div>
      </div>
    </Card>
  );
};