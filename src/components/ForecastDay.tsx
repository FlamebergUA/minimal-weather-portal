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
    <Card className="p-4 bg-black/20 backdrop-blur-sm border-0 text-white hover:bg-black/30 transition-all duration-300">
      <p className="text-sm font-medium mb-2">{day}</p>
      <WeatherIcon icon={icon} className="w-8 h-8 mx-auto mb-2" />
      <div className="text-center">
        <p className="text-sm font-medium">{max}°</p>
        <p className="text-xs opacity-80">{min}°</p>
      </div>
    </Card>
  );
};