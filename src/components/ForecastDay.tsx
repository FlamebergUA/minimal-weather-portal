import { WeatherIcon } from "./WeatherIcon";
import { Card } from "@/components/ui/card";

interface ForecastDayProps {
  day: string;
  min: number;
  max: number;
  icon: string;
  description: string;
}

export const ForecastDay = ({ day, min, max, icon, description }: ForecastDayProps) => {
  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
      <p className="text-sm font-medium text-gray-600 mb-2">{day}</p>
      <WeatherIcon icon={icon} className="w-8 h-8 mx-auto mb-2 text-weather-sunny" />
      <div className="text-center">
        <p className="text-sm font-medium">{max}°</p>
        <p className="text-sm text-gray-600">{min}°</p>
      </div>
    </Card>
  );
};