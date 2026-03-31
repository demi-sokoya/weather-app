import { useEffect, useState } from "react";
import { useTemp } from "../context/TempContext";

const SearchBar = () => {
	const { setCoords } = useTemp();
	const [input, setInput] = useState("");
	const [results, setResults] = useState([]);
	const [searching, setSearching] = useState(false);

	useEffect(() => {
		if (input.length < 2) {
			setResults([]);
			return;
		}

		const timeout = setTimeout(() => {
			setSearching(true);
			fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${import.meta.env.VITE_WEATHER_KEY}`,
			)
				.then((res) => res.json())
				.then((data) => {
					const unique = data.filter(
						(result, index, self) =>
							index ===
							self.findIndex(
								(r) => r.lat === result.lat && r.lon === result.lon,
							),
					);
					setResults(unique);
				})
				.catch(() => setResults([]))
				.finally(() => setSearching(false));
		}, 300);

		return () => clearTimeout(timeout);
	}, [input]);

	const handleSelect = (result) => {
		setCoords({ lat: result.lat, lon: result.lon });
		setInput(result.name);
		setResults([]);
	};

	return (
		<div>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Search a location"
			/>
			{searching && <p>Searching...</p>}
			{results.length > 0 && (
				<ul>
					{results.map((result) => (
						<li
							key={`${result.lat}-${result.lon}`}
							onClick={() => handleSelect(result)}>
							{result.name}

							<span style={{ marginLeft: "6px" }}>
								{/* {result.state ? `${result.state}, ` : ""} */}
								{result.country}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
