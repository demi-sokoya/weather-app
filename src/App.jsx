import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import SearchBar from "./components/SearchBar";

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
			<button onClick={useCurrentLocation}>Use my Location</button>
			<p>Hello</p>
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
