import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import Navbar from "./components/NavBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";

function App() {
	const {
		unit,
		convert,
		weather,
		useCurrentLocation,
		location,
		loading,
		error,
	} = useTemp();

	useEffect(() => {
		useCurrentLocation();
	}, []);

	return (
		<>
			<Navbar />
			{loading && <p>Loading...</p>}
			{error && <p>Error; {error}</p>}
			<CurrentWeather />
			<HourlyForecast />
			<DailyForecast />
		</>
	);
}

export default App;
