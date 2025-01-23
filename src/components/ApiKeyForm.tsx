import { toast } from "@/components/ui/use-toast";

const setApiKey = (key: string) => localStorage.setItem("WEATHER_API_KEY", key);

export const ApiKeyForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("apiKey") as string;
    
    if (apiKey) {
      setApiKey(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your WeatherAPI key has been saved.",
      });
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">WeatherAPI Key Required</h2>
      <p className="text-sm text-gray-600 mb-4">
        To use this weather dashboard, you need a WeatherAPI key. You can get one for free at{" "}
        <a
          href="https://www.weatherapi.com/signup.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          WeatherAPI.com
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