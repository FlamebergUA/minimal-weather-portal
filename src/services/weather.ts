import { useQuery } from "@tanstack/react-query";

const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
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

const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
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
    location: "Loading...", // This will be updated with reverse geocoding
  };
};

export const useWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};