import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import Navbar from "./components/NavBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";

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

	console.log(weather);

	return (
		<>
			<Navbar />
			<CurrentWeather />
			{loading && <p>Loading...</p>}
			{error && <p>Error; {error}</p>}
			{weather !== null && !loading && (
				<p>
					{convert(weather.current.temp)}° {unit}
				</p>
			)}
			<p>{location.cityName}</p>
			<p>{location.countryName}</p>
			<HourlyForecast />
		</>
	);
}

export default App;
