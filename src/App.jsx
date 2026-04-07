import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import Navbar from "./components/NavBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { Spacer, VStack, Box } from "@chakra-ui/react";

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
			<Box h="2rem" />
			{loading && <p>Loading...</p>}
			{error && <p>Error; {error}</p>}
			<CurrentWeather />
			<Box h="2rem" />
			<HourlyForecast />
			<Box h="2rem" />
			<DailyForecast />
		</>
	);
}

export default App;
