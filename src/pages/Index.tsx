import { useEffect, useState } from "react";
import { useWeather } from "@/services/weather";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastDay } from "@/components/ForecastDay";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({ lat: 51.5074, lon: -0.1278 });
  const { toast } = useToast();
  const { data: weather, isLoading, error } = useWeather(coordinates.lat, coordinates.lon);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Showing weather for default location",
          });
        }
      );
    }
  }, [toast]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <p className="text-red-500">Error loading weather data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {isLoading ? (
          <>
            <Skeleton className="h-48 w-full" />
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </>
        ) : (
          weather && (
            <>
              <CurrentWeather
                temperature={weather.current.temp}
                description={weather.current.description}
                icon={weather.current.icon}
                humidity={weather.current.humidity}
                windSpeed={weather.current.windSpeed}
                pressure={weather.current.pressure}
              />
              <div className="grid grid-cols-5 gap-4 animate-fade-in-delayed">
                {weather.daily.map((day, index) => (
                  <ForecastDay
                    key={index}
                    day={day.date}
                    min={day.temp.min}
                    max={day.temp.max}
                    icon={day.icon}
                    description={day.description}
                  />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Index;