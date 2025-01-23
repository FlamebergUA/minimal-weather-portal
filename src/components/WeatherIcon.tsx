import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react";

interface WeatherIconProps {
  icon: string;
  className?: string;
}

export const WeatherIcon = ({ icon, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    switch (icon) {
      case "01d":
      case "01n":
        return <Sun className={className} />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <Cloud className={className} />;
      case "09d":
      case "09n":
        return <CloudDrizzle className={className} />;
      case "10d":
      case "10n":
        return <CloudRain className={className} />;
      case "11d":
      case "11n":
        return <CloudLightning className={className} />;
      case "13d":
      case "13n":
        return <CloudSnow className={className} />;
      case "50d":
      case "50n":
        return <CloudFog className={className} />;
      default:
        return <Sun className={className} />;
    }
  };

  return getIcon();
};