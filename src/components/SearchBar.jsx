import { useEffect, useState } from "react";
import { useTemp } from "../context/TempContext";
import {
	HStack,
	Spinner,
	Input,
	InputGroup,
	VStack,
	Text,
} from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import WeatherIcon from "./WeatherIcon";

const SearchBar = () => {
	const { setLocation, convert } = useTemp();
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
					return Promise.all(
						unique.map((city) =>
							fetch(
								`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`,
							)
								.then((res) => res.json())
								.then((w) => ({
									name: city.name,
									state: city.state,
									country: city.country,
									lat: city.lat,
									lon: city.lon,
									temp: w.main.temp,
									tempMax: w.main.temp_max,
									tempMin: w.main.temp_min,
									icon: w.weather[0].icon,
									description: w.weather[0].description,
								})),
						),
					);
				})
				.then((enhanced) => setResults(enhanced))
				.catch(() => setResults([]))
				.finally(() => setSearching(false));
		}, 300);

		return () => clearTimeout(timeout);
	}, [input]);

	const handleSelect = (result) => {
		setLocation(() => ({
			countryName: result.country,
			cityName: result.name,
			coords: { lat: result.lat, lon: result.lon },
		}));
		setInput(result.name);
		setResults([]);
	};

	return (
		<div className="search-container">
			<Input
				className="weather-search"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Search for a location..."
			/>
			{searching && (
				<ul>
					<li>
						<Spinner></Spinner>
					</li>
				</ul>
			)}

			{!searching && results.length > 0 && (
				<ul className="search-results">
					{results.map((result) => (
						<li
							key={`${result.lat}-${result.lon}`}
							onClick={() => handleSelect(result)}>
							<HStack>
								{/* Left Side */}
								<HStack>
									<MdLocationPin />
									<VStack>
										<Text>
											{result.name}, {result.country}
										</Text>
										<Text>{result.description}</Text>
									</VStack>
								</HStack>

								{/* Right Side */}
								<HStack>
									<WeatherIcon code={result.icon} size={28} />
									<Text>{convert(result.temp)}°</Text>
									<VStack>
										<Text>{convert(result.tempMax)}°</Text>
										<Text>{convert(result.tempMin)}°</Text>
									</VStack>
								</HStack>
							</HStack>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
