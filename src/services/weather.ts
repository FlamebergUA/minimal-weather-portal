import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.weatherapi.com/v1";

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

const getApiKey = () => localStorage.getItem("WEATHER_API_KEY");

const mapWeatherIcon = (code: number, is_day: number): string => {
  // Map WeatherAPI codes to our existing icon system
  if (is_day) {
    if (code === 1000) return "01d"; // Clear
    if (code === 1003) return "02d"; // Partly cloudy
    if ([1006, 1009].includes(code)) return "03d"; // Cloudy
    if ([1063, 1150, 1153, 1168, 1171].includes(code)) return "09d"; // Light rain
    if ([1180, 1183, 1186, 1189, 1192, 1195].includes(code)) return "10d"; // Rain
    if ([1273, 1276, 1279, 1282].includes(code)) return "11d"; // Thunder
    if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225].includes(code)) return "13d"; // Snow
    if ([1135, 1147].includes(code)) return "50d"; // Mist
  } else {
    if (code === 1000) return "01n";
    if (code === 1003) return "02n";
    if ([1006, 1009].includes(code)) return "03n";
    if ([1063, 1150, 1153, 1168, 1171].includes(code)) return "09n";
    if ([1180, 1183, 1186, 1189, 1192, 1195].includes(code)) return "10n";
    if ([1273, 1276, 1279, 1282].includes(code)) return "11n";
    if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225].includes(code)) return "13n";
    if ([1135, 1147].includes(code)) return "50n";
  }
  return "01d"; // Default to clear day
};

const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${apiKey}&q=${lat},${lon}&days=6&aqi=no`
  );
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("WEATHER_API_KEY");
      throw new Error("INVALID_API_KEY");
    }
    throw new Error("Weather data fetch failed");
  }

  const data = await response.json();
  
  return {
    current: {
      temp: Math.round(data.current.temp_c),
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_kph),
      pressure: data.current.pressure_mb,
      description: data.current.condition.text.toLowerCase(),
      icon: mapWeatherIcon(data.current.condition.code, data.current.is_day),
    },
    daily: data.forecast.forecastday.slice(1).map((day: any) => ({
      date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: {
        min: Math.round(day.day.mintemp_c),
        max: Math.round(day.day.maxtemp_c),
      },
      icon: mapWeatherIcon(day.day.condition.code, 1), // Assume day time for forecast
      description: day.day.condition.text.toLowerCase(),
    })),
    location: data.location.name,
  };
};

export const useWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: (failureCount, error) => {
      if (error.message === "INVALID_API_KEY" || error.message === "API_KEY_REQUIRED") {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export { ApiKeyForm } from "@/components/ApiKeyForm";