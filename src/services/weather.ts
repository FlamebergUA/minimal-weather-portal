import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    description: string;
    icon: string;
  };
  daily: Array<{
    date: string;
    temp: {
      min: number;
      max: number;
    };
    icon: string;
    description: string;
  }>;
  location: string;
}

const getApiKey = () => localStorage.getItem("OPENWEATHER_API_KEY");

const setApiKey = (key: string) => localStorage.setItem("OPENWEATHER_API_KEY", key);

const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("OPENWEATHER_API_KEY");
      throw new Error("INVALID_API_KEY");
    }
    throw new Error("Weather data fetch failed");
  }

  const data = await response.json();
  
  return {
    current: {
      temp: Math.round(data.current.temp),
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_speed),
      pressure: data.current.pressure,
      description: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
    },
    daily: data.daily.slice(1, 6).map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: {
        min: Math.round(day.temp.min),
        max: Math.round(day.temp.max),
      },
      icon: day.weather[0].icon,
      description: day.weather[0].description,
    })),
    location: "Loading...",
  };
};

export const useWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: (failureCount, error) => {
      // Don't retry for invalid API key errors
      if (error.message === "INVALID_API_KEY" || error.message === "API_KEY_REQUIRED") {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const ApiKeyForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("apiKey") as string;
    
    if (apiKey) {
      setApiKey(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your OpenWeather API key has been saved.",
      });
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">OpenWeather API Key Required</h2>
      <p className="text-sm text-gray-600 mb-4">
        To use this weather dashboard, you need an OpenWeather API key. You can get one for free at{" "}
        <a
          href="https://home.openweathermap.org/api_keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          OpenWeatherMap
        </a>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="apiKey"
          placeholder="Enter your API key"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save API Key
        </button>
      </form>
    </div>
  );
};