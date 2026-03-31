import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import SearchBar from "./components/SearchBar";
import Slider from "./components/Slider";

function App() {
	const {
		unit,
		toggleUnit,
		convert,
		tempC,
		loading,
		error,
		useCurrentLocation,
	} = useTemp();

	return (
		<>
			<SearchBar />
			<Slider />
			<button onClick={useCurrentLocation}>Use my Location</button>
			{loading && <p>Loading...</p>}
			{error && <p>Error; {error}</p>}
			{tempC !== null && !loading && (
				<p>
					{convert(tempC)}° {unit}
				</p>
			)}
			<button onClick={toggleUnit}>Toggle Unit</button>
		</>
	);
}

export default App;
