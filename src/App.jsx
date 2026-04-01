import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import Navbar from "./components/NavBar";

function App() {
	const { unit, convert, weather, location, loading, error } = useTemp();

	// useEffect(() => {
	// 	useCurrentLocation();
	// }, []);

	console.log(weather);

	return (
		<>
			<Navbar />
			{loading && <p>Loading...</p>}
			{error && <p>Error; {error}</p>}
			{weather !== null && !loading && (
				<p>
					{convert(weather.current.temp)}° {unit}
				</p>
			)}
			<p>{location.cityName}</p>
			<p>{location.countryName}</p>
		</>
	);
}

export default App;
