import { useEffect } from "react";
import { useTemp } from "./context/TempContext";
import SearchBar from "./components/SearchBar";
import Slider from "./components/Slider";
import Navbar from "./components/NavBar";

function App() {
	const { unit, convert, tempC, loading, error } = useTemp();

	return (
		<>
			<Navbar />
			{loading && <p>Loading...</p>}
			{error && <p>Error; {error}</p>}
			{tempC !== null && !loading && (
				<p>
					{convert(tempC)}° {unit}
				</p>
			)}
		</>
	);
}

export default App;
