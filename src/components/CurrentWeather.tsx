import { WeatherIcon } from "./WeatherIcon";
import { Card } from "@/components/ui/card";

interface CurrentWeatherProps {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export const CurrentWeather = ({
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
  pressure,
}: CurrentWeatherProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <WeatherIcon icon={icon} className="w-16 h-16 text-weather-sunny" />
          <div>
            <h2 className="text-4xl font-semibold">{temperature}°C</h2>
            <p className="text-gray-600 capitalize">{description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-medium">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Wind</p>
          <p className="text-xl font-medium">{windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Pressure</p>
          <p className="text-xl font-medium">{pressure} hPa</p>
        </div>
      </div>
    </Card>
  );
};